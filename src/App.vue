<script setup lang="ts">
import BookMarksCard from "./Components/BookMarksCard.vue";
import SearchBar from "./Components/SearchBar.vue";
import { BOOKMARKS_PRO } from "./utils/BookMarks.js";
import { bg_url } from "./utils/Constant.js";

const bg = new URL(bg_url, import.meta.url).href;
</script>

<template>
  <div class="bg" :style="{ backgroundImage: `url(${bg})` }" />
  <main class="hud">
    <div class="hud_header_container">
      <BookMarksCard
        v-for="(item, index) in BOOKMARKS_PRO"
        :key="index"
        :bookmark="item"
      />
    </div>
    <div>
      <SearchBar />
    </div>
  </main>
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

.hud_header_container {
  width: 100%;
  min-height: 20vh;

  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
}
</style>
