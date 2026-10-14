import { ref, onMounted } from "vue";
import { useGoogleAuth } from "./useGoogleAuth";

export interface GmailMessage {
  id: string;
  snippet: string;
  subject: string;
  from: string;
  date: string;
}

export function useGmail() {
  const messages = ref<GmailMessage[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const { needsLogin, getValidToken, connect: authConnect, clearToken } = useGoogleAuth();

  async function fetchUnreadMails(authToken: string) {
    const listRes = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages?q=is:unread&maxResults=5",
      { headers: { Authorization: `Bearer ${authToken}` } }
    );

    if (listRes.status === 401) {
      await clearToken();
      throw new Error("expired");
    }
    if (!listRes.ok) throw new Error("api");

    const listData = await listRes.json();
    if (!listData.messages || listData.messages.length === 0) {
      return [];
    }

    const details = await Promise.all(
      listData.messages.map(async (item: { id: string }) => {
        const msgRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${item.id}?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        return msgRes.json();
      })
    );

    return details.map((m: any) => {
      const headers = m.payload?.headers ?? [];
      const subjectHeader = headers.find((h: any) => h.name === "Subject");
      const fromHeader = headers.find((h: any) => h.name === "From");
      const dateHeader = headers.find((h: any) => h.name === "Date");
      const rawFrom = fromHeader ? fromHeader.value : "Inconnu";
      const cleanFrom = rawFrom.replace(/<.*>/, "").replace(/"/g, "").trim() || rawFrom;

      return {
        id: m.id,
        snippet: m.snippet ?? "",
        subject: subjectHeader ? subjectHeader.value : "(sans sujet)",
        from: cleanFrom,
        date: dateHeader ? dateHeader.value : "",
      };
    });
  }

  async function init() {
    loading.value = true;
    error.value = null;
    try {
      const authToken = await getValidToken();
      if (!authToken) {
        needsLogin.value = true;
        return;
      }
      messages.value = await fetchUnreadMails(authToken);
    } catch {
      error.value = "Impossible de charger les e-mails";
    } finally {
      loading.value = false;
    }
  }

  async function connect() {
    try {
      loading.value = true;
      const authToken = await authConnect();
      if (authToken) {
        messages.value = await fetchUnreadMails(authToken);
      }
    } catch {
      error.value = "Connexion à Gmail impossible";
    } finally {
      loading.value = false;
    }
  }

  onMounted(init);

  return { messages, loading, error, needsLogin, connect, refresh: init };
}