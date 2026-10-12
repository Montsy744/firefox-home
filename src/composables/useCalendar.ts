import { ref, onMounted } from "vue";

export interface CalEvent {
  id: string;
  summary: string;
  start: string;
  end: string;
  allDay: boolean;
  link?: string;
}

const CLIENT_ID = "904210480370-8382qin7i4h0r4ue120tsfp59vf5ip6t.apps.googleusercontent.com";
const SCOPE = "https://www.googleapis.com/auth/calendar.readonly";
const STORAGE_KEY = "gcal_token";

const isExtension = typeof browser !== "undefined" && !!browser.identity;

interface StoredToken {
  value: string;
  expiresAt: number;
}

const tokenStore = {
  async get(): Promise<StoredToken | undefined> {
    if (isExtension) {
      const res = await browser.storage.local.get(STORAGE_KEY);
      return res[STORAGE_KEY] as StoredToken | undefined;
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : undefined;
  },
  async set(t: StoredToken) {
    if (isExtension) await browser.storage.local.set({ [STORAGE_KEY]: t });
    else localStorage.setItem(STORAGE_KEY, JSON.stringify(t));
  },
  async remove() {
    if (isExtension) await browser.storage.local.remove(STORAGE_KEY);
    else localStorage.removeItem(STORAGE_KEY);
  },
};

async function readCachedToken(): Promise<string | null> {
  const t = await tokenStore.get();
  return t && t.expiresAt - 60_000 > Date.now() ? t.value : null;
}

function redirectUri() {
  return isExtension
    ? browser.identity.getRedirectURL()
    : `${window.location.origin}/`;
}

function buildAuthUrl() {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "token",
    redirect_uri: redirectUri(),
    scope: SCOPE,
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

async function saveTokenFromHash(hash: string): Promise<string | null> {
  const p = new URLSearchParams(hash.replace(/^#/, ""));
  const token = p.get("access_token");
  if (!token) return null;
  const expiresIn = Number(p.get("expires_in") ?? 3600);
  await tokenStore.set({ value: token, expiresAt: Date.now() + expiresIn * 1000 });
  return token;
}

async function tokenFromRedirect(): Promise<string | null> {
  if (isExtension || !window.location.hash.includes("access_token")) return null;
  const token = await saveTokenFromHash(window.location.hash);
  history.replaceState(null, "", window.location.pathname + window.location.search);
  return token;
}

async function authFlow(interactive: boolean): Promise<string> {
  if (isExtension) {
    const url = await browser.identity.launchWebAuthFlow({
      url: buildAuthUrl(),
      interactive,
    });
    const token = await saveTokenFromHash(new URL(url).hash);
    if (!token) throw new Error("no token");
    return token;
  }

  if (!interactive) throw new Error("login required");
  window.location.href = buildAuthUrl();
  return new Promise<string>(() => {});
}

async function fetchTodayEvents(token: string): Promise<CalEvent[]> {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const qs = new URLSearchParams({
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
    singleEvents: "true",
    orderBy: "startTime",
  });

  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events?${qs}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (res.status === 401) {
    await tokenStore.remove();
    throw new Error("expired");
  }
  if (!res.ok) throw new Error("api");

  const data = await res.json();
  return (data.items ?? []).map((e: any) => ({
    id: e.id,
    summary: e.summary ?? "(sans titre)",
    start: e.start.dateTime ?? e.start.date,
    end: e.end.dateTime ?? e.end.date,
    allDay: !e.start.dateTime,
    link: e.htmlLink,
  }));
}

export function useCalendar() {
  const events = ref<CalEvent[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const needsLogin = ref(false);

  async function connect() {
    try {
      loading.value = true;
      error.value = null;
      needsLogin.value = false;
      events.value = await fetchTodayEvents(await authFlow(true));
    } catch {
      error.value = "Connexion à Google Agenda impossible";
    } finally {
      loading.value = false;
    }
  }

  onMounted(async () => {
    try {
      let token = (await tokenFromRedirect()) ?? (await readCachedToken());
      if (!token) {
        try {
          token = await authFlow(false);
        } catch {
          needsLogin.value = true;
          return;
        }
      }
      events.value = await fetchTodayEvents(token);
    } catch {
      error.value = "Impossible de charger l'agenda";
    } finally {
      loading.value = false;
    }
  });

  return { events, loading, error, needsLogin, connect };
}