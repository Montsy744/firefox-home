<template>
  <div class="bookmarks_card glass" v-on:click="redirectURL()">
    <div class="bookmark_card_container_img">
      <img :src="bookmark.url_img" :alt="bookmark.label" />
    </div>
    <div class="bookmark_card_container_label">
      <h1>{{ bookmark.label }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bookmarks } from "../utils/BookMarks";

const prop = defineProps<{
  bookmark: Bookmarks;
}>();

const redirectURL = () => {
  window.location.href = prop.bookmark.url_redirection;
};
</script>

<style scoped>
.bookmarks_card {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 50px;

  border-radius: 80px;
  padding: 15px;
  margin: 10px;

  cursor: pointer;
  transition: 0.5s;
}

.bookmarks_card:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    transform: scale(1.2);
    margin: 20px;
}

.bookmark_card_container_img img {
  width: 40px;
  filter: drop-shadow(0 4px 12px var(--color-text));
}

.bookmark_card_container_label h1 {
    color: var(--color-text);
    font-family: var(--font-mono);
}
</style>
