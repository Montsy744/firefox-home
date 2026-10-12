<template>
  <div class="glass apod_card" aria-busy="true" aria-label="Chargement de la photo du jour">
    <div class="sk sk_title"></div>
    <div class="sk sk_img"></div>
    <div class="sk_desc">
      <div class="sk sk_line"></div>
      <div class="sk sk_line"></div>
      <div class="sk sk_line sk_line_short"></div>
    </div>
  </div>
</template>

<style scoped>
.apod_card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  padding: 16px 18px;
  border-radius: 16px;
}

.sk {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
}

.sk::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.12),
    transparent
  );
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.sk_title {
  height: 2rem;
  width: 65%;
}

.sk_img {
  width: 100%;
  height: 180px;
  border-radius: 10px;
}

.sk_desc {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 90px;
}

.sk_line {
  height: 0.8rem;
}

.sk_line_short {
  width: 55%;
}

@media (prefers-reduced-motion: reduce) {
  .sk::after {
    animation: none;
  }
}
</style>