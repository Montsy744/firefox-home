import { ref, onMounted } from "vue";
import { useGoogleAuth } from "./useGoogleAuth";

export interface CalEvent {
  id: string;
  summary: string;
  start: string;
  end: string;
  allDay: boolean;
  link?: string;
}

export function useCalendar() {
  const events = ref<CalEvent[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const { needsLogin, getValidToken, connect: authConnect, clearToken } = useGoogleAuth();

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
      await clearToken();
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

  async function init() {
    loading.value = true;
    error.value = null;
    try {
      const token = await getValidToken();
      if (!token) {
        needsLogin.value = true;
        return;
      }
      events.value = await fetchTodayEvents(token);
    } catch {
      error.value = "Impossible de charger l'agenda";
    } finally {
      loading.value = false;
    }
  }

  async function connect() {
    try {
      loading.value = true;
      const token = await authConnect();
      if (token) {
        events.value = await fetchTodayEvents(token);
      }
    } catch {
      error.value = "Connexion à Google Agenda impossible";
    } finally {
      loading.value = false;
    }
  }

  onMounted(init);

  return { events, loading, error, needsLogin, connect, refresh: init };
}