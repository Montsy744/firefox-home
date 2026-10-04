<script setup lang="ts">
const bg = new URL('./../public/asset/background-natural.jpg', import.meta.url).href
</script>

<template>
  <div class="bg" :style="{ backgroundImage: `url(${bg})` }" />
  <main class="hud"></main>
</template>

<style scoped>

.bg {
  position: fixed;
  inset: -40px;              
  z-index: -1;
  background-size: cover;
  background-position: center;
  /*filter: blur(6px) brightness(0.7);*/
}

</style>
