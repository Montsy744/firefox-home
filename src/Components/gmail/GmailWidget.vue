<script setup lang="ts">
import { useGmail } from "../../composables/useGmail";
import { useGoogleAuth } from "../../composables/useGoogleAuth";

const { messages, loading, error, needsLogin, connect } = useGmail();
const { logout } = useGoogleAuth();
</script>

<template>
  <div v-if="loading" class="glass mail-skeleton">Chargement...</div>

  <section v-else class="glass mail" aria-label="Mails non lus">
    <header class="mail__header">
      <div class="mail__header_title">
        <i class="ti ti-mail" aria-hidden="true" />
        <span class="categorie">Mails non lus</span>
      </div>

      <button
        v-if="!needsLogin"
        class="logout_btn"
        title="Déconnecter Google"
        @click="logout"
      >
        <i class="ti ti-logout" aria-hidden="true" />
      </button>
    </header>

    <button v-if="needsLogin" class="mail__btn" @click="connect">
      Connecter Gmail
    </button>

    <p v-else-if="error" class="mail__status">{{ error }}</p>

    <p v-else-if="!messages.length" class="mail__status">Tous vos mails sont lus !</p>

    <ul v-else class="mail__list">
      <li v-for="m in messages" :key="m.id" class="mail__item">
        <span class="mail__from">{{ m.from }}</span>
        <a
          class="mail__title"
          :href="`https://mail.google.com/mail/u/0/#inbox/${m.id}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ m.subject }}
        </a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.mail {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  width: 100%;
  padding: 16px 18px;
  border-radius: 16px;
  color: var(--color-text);
  box-sizing: border-box;
}

.mail__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-muted);
}

.mail__header_title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logout_btn {
  background: transparent;
  border: none;
  color: var(--color-muted);
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: color 0.2s, background 0.2s;
}

.logout_btn:hover {
  color: #ff5555;
  background: rgba(255, 85, 85, 0.1);
}

.categorie {
  font-family: var(--font-ui);
  font-size: 0.95rem;
}

.mail__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 180px;
  overflow-y: auto;
  padding-right: 8px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.mail__item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-left: 10px;
  border-left: 2px solid var(--color-accent);
  min-width: 0;
}

.mail__from {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-muted);
  overflow-wrap: anywhere;
}

.mail__title {
  font-size: 0.85rem;
  font-family: var(--font-mono);
  color: var(--color-text);
  text-decoration: none;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
  line-height: 1.25;
}

.mail__title:hover {
  color: var(--color-accent);
}

.mail__status {
  font-size: 0.85rem;
  color: var(--color-muted);
}

.mail__btn {
  align-self: flex-start;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--color-accent);
  background: transparent;
  color: var(--color-text);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.15s;
}

.mail__btn:hover {
  background: color-mix(in srgb, var(--color-accent) 25%, transparent);
}

.mail-skeleton {
  padding: 16px 18px;
  border-radius: 16px;
  font-size: 0.85rem;
  color: var(--color-muted);
}
</style>