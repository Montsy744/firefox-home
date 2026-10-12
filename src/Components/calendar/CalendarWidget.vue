<script setup lang="ts">
import { useCalendar, type CalEvent } from "../../composables/useCalendar";
import CalendarSkeleton from "../skeleton/CalendarSkeleton.vue";

const { events, loading, error, needsLogin, connect } = useCalendar();

const fmt = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" });

function timeLabel(e: CalEvent) {
  return e.allDay ? "Toute la journée" : fmt.format(new Date(e.start));
}

function isPast(e: CalEvent) {
  return !e.allDay && new Date(e.end).getTime() < Date.now();
}
</script>

<template>
  <CalendarSkeleton v-if="loading" />

  <section v-else class="glass cal" aria-label="Agenda du jour">
    <header class="cal__header">
      <i class="ti ti-calendar-event" aria-hidden="true" />
      <span class="categorie">Aujourd'hui</span>
    </header>

    <button v-if="needsLogin" class="cal__btn" @click="connect">
      Connecter Google Agenda
    </button>

    <p v-else-if="error" class="cal__status">{{ error }}</p>

    <p v-else-if="!events.length" class="cal__status">Rien de prévu aujourd'hui.</p>

    <ul v-else class="cal__list">
      <li
        v-for="e in events"
        :key="e.id"
        class="cal__item"
        :class="{ 'cal__item--past': isPast(e) }"
      >
        <span class="cal__time">{{ timeLabel(e) }}</span>
        <a class="cal__title" :href="e.link" target="_blank" rel="noopener noreferrer">
          {{ e.summary }}
        </a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.cal {
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  width: 100%;
  padding: 16px 18px;
  border-radius: 16px;
  color: var(--color-text);
}

.cal__header {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-muted);
}

.categorie {
  font-family: var(--font-ui);
  font-size: 0.95rem;
}

.cal__list {
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

.cal__item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-left: 10px;
  border-left: 2px solid var(--color-accent);
}

.cal__item--past {
  opacity: 0.45;
}

.cal__time {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-muted);
}

.cal__title {
  font-size: 0.9rem;
  color: var(--color-text);
  text-decoration: none;
}

.cal__title:hover {
  color: var(--color-accent);
}

.cal__status {
  font-size: 0.85rem;
  color: var(--color-muted);
}

.cal__btn {
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

.cal__btn:hover {
  background: color-mix(in srgb, var(--color-accent) 25%, transparent);
}
</style>