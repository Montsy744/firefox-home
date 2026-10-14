import { ref } from "vue";

const CLIENT_ID = "904210480370-8382qin7i4h0r4ue120tsfp59vf5ip6t.apps.googleusercontent.com";
const SCOPES = [
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/gmail.readonly"
].join(" ");

const STORAGE_KEY = "google_oauth_token";
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
    scope: SCOPES,
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

export function useGoogleAuth() {
  const token = ref<string | null>(null);
  const needsLogin = ref(false);

  async function getValidToken(): Promise<string | null> {
    if (!isExtension && window.location.hash.includes("access_token")) {
      const t = await saveTokenFromHash(window.location.hash);
      history.replaceState(null, "", window.location.pathname + window.location.search);
      if (t) return t;
    }

    const stored = await tokenStore.get();
    if (stored && stored.expiresAt - 60_000 > Date.now()) {
      return stored.value;
    }

    return null;
  }

  async function connect(): Promise<string> {
    if (isExtension) {
      const url = await browser.identity.launchWebAuthFlow({
        url: buildAuthUrl(),
        interactive: true,
      });
      const t = await saveTokenFromHash(new URL(url).hash);
      if (!t) throw new Error("no_token");
      token.value = t;
      needsLogin.value = false;
      return t;
    }

    window.location.href = buildAuthUrl();
    return new Promise<string>(() => {});
  }

  async function clearToken() {
    token.value = null;
    needsLogin.value = true;
    await tokenStore.remove();
  }

  async function logout() {
    await clearToken();

  }

  return {
    token,
    needsLogin,
    getValidToken,
    connect,
    clearToken,
    logout
  };
}