<template>
  <div class="bookmarks_perso_card glass" v-on:click="redirectURL()">
    <div class="bookmark_perso_card_container_img">
      <img :src="bookmark.url_img" :alt="bookmark.label" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bookmarks } from "../../utils/BookMarks";

const prop = defineProps<{
  bookmark: Bookmarks;
}>();

const redirectURL = () => {
  window.location.href = prop.bookmark.url_redirection;
};
</script>

<style scoped>
.bookmarks_perso_card {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 60px;
  width: 60px;


  border-radius: 100%;
  padding: 15px;
  margin: 10px;

  cursor: pointer;
  transition: 0.3s;
}

.bookmark_perso_card_container_img img {
  width: 40px;
  filter: drop-shadow(0 4px 12px var(--color-text));
}
</style>
