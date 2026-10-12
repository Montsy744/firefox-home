<template>
  <section class="weather" aria-busy="true" aria-label="Chargement de la météo">
    <div class="sk sk_icon"></div>

    <div class="weather__body">
      <div class="sk sk_temp"></div>
      <div class="sk_text">
        <div class="sk sk_label"></div>
        <div class="sk sk_meta"></div>
      </div>
    </div>

    <div class="sk sk_place"></div>
  </section>
</template>

<style scoped>
.weather {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  padding: 16px 20px;
  border-radius: 20px;
  background: var(--surface, rgba(243, 230, 211, 0.08));
  border: 1px solid var(--border, rgba(243, 230, 211, 0.16));
}

.weather__body {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px; 
  margin: 0 10px;
}

.sk {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: rgba(243, 230, 211, 0.1);
}

.sk::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(243, 230, 211, 0.14),
    transparent
  );
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.sk_icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.sk_temp {
  width: 64px;
  height: 34px;
}

.sk_text {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sk_label {
  width: 90px;
  height: 15px;
}

.sk_meta {
  width: 140px;
  height: 12px;
}

.sk_place {
  width: 100px;
  height: 16px;
  margin-top: 6px;
}

@media (prefers-reduced-motion: reduce) {
  .sk::after {
    animation: none;
  }
}
</style>