<template>
  <section class="glass cal" aria-busy="true" aria-label="Chargement de l'agenda">
    <div class="sk sk_head"></div>
    <div v-for="i in 3" :key="i" class="sk_item">
      <div class="sk sk_time"></div>
      <div class="sk sk_title"></div>
    </div>
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
  background: linear-gradient(90deg, transparent, rgba(243, 230, 211, 0.14), transparent);
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  100% { transform: translateX(100%); }
}

.sk_head { width: 90px; height: 1rem; }
.sk_item { display: flex; flex-direction: column; gap: 6px; padding-left: 10px; }
.sk_time { width: 60px; height: 0.75rem; }
.sk_title { width: 75%; height: 0.9rem; }

@media (prefers-reduced-motion: reduce) {
  .sk::after { animation: none; }
}
</style>