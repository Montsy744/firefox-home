<script setup lang="ts">
import { useWeather } from "../composables/useWeather";

const { weather, error, loading } = useWeather();
</script>

<template>
  <section class="weather" aria-label="Météo" aria-live="polite">
    <p v-if="loading" class="weather__status">Chargement de la météo…</p>
    <p v-else-if="error || !weather" class="weather__status">
      {{ error ?? "Météo indisponible." }}
    </p>

    <template v-else>
      <i :class="['ti', weather.icon, 'weather__icon']" aria-hidden="true" />
      <div class="weather__body">
        <div>
          <p class="weather__temp">{{ weather.temp }}°</p>
        </div>
        <div>
          <p class="weather__label">{{ weather.label }}</p>
          <p class="weather__meta">
            {{ weather.min }}° / {{ weather.max }}° · vent
            {{ weather.wind }} km/h
          </p>
        </div>
      </div>
      <p v-if="weather.city" class="weather__place">
        <i class="ti ti-map-pin" aria-hidden="true" /> {{ weather.city }}
      </p>
      <p v-else-if="!weather.located" class="weather__place">
        Position par défaut
      </p>
    </template>
  </section>
</template>

<style scoped>
.weather {
  display: flex;
  align-items: baseline;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  padding: 16px 20px;
  border-radius: 20px;
  background: var(--surface, rgba(243, 230, 211, 0.08));
  border: 1px solid var(--border, rgba(243, 230, 211, 0.16));
  color: var(--text, #f3e6d3);
}

.weather__icon {
  font-size: 40px;
  color: var(--accent, #f4b26a);
}

.weather__body {
  display: flex;
  justify-content: center;
  align-items: center;
}

.weather__body div p {
  margin: 0;
}

.weather__body div {
  margin: 0 10px;
}

.weather__temp {
  font: 400 34px/1 var(--font-mono, ui-monospace, monospace);
  letter-spacing: -0.03em;
}

.weather__label {
  margin-top: 4px !important;
  font-size: 15px;
  font-weight: 500;
}

.weather__meta,
.weather__status {
  font-size: 12.5px;
  color: var(--muted, #b9a9c9);
}

.weather__meta {
  margin-top: 2px !important;
}

.weather__place {
  font-size: 16px;
  color: var(--muted, #b9a9c9);
  margin-top: 6px !important;
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
