<template>
   <ApodSkeleton v-if="isLoading" />

  <div v-else-if="isError" class="glass apod_card">
    <p class="apod_state">{{ error }}</p>
  </div>

  <article v-else class="glass apod_card">

    <h1 class="apod_title">{{ apod?.title }}</h1>

    <div class="apod_img">
      <img :src="apod?.hdurl" :alt="apod?.title" loading="lazy" />
    </div>

    <div class="apod_desc">
      <p v-html="apod?.explanation"></p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Apod } from "../../Types/nasa/apod";
import { get_picture_of_the_day } from "../../services/nasa/apodService";
import ApodSkeleton from "./ApodSkeleton.vue";

const isLoading = ref(true);
const isError = ref(false);
const error = "Erreur de chargement de l'API APOD";

const apod = ref<Apod | null>(null);

onMounted(async () => {
  try {
    const data = await get_picture_of_the_day();
    apod.value = data[0];
  } catch {
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.apod_card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  padding: 16px 18px;
  border-radius: 16px;
  color: #e8e8f5;
}
.apod_img {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;

}

.apod_img img {
  width: 100%;
  height: auto;
  max-height: 220px;
  object-fit: contain;
  display: block;
  background: rgba(0, 0, 0, 0.25);
}

.apod_title {
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
  font-family: var(--font-ui);
}

.apod_desc {
  max-height: 90px;
  overflow-y: auto;
  padding-right: 8px;
  font-size: 0.8rem;
  line-height: 1.5;
  opacity: 0.85;

  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.apod_desc p {
  margin: 0;
  font-family: var(--font-mono);
  text-align: justify;
}

.apod_desc :deep(a) {
  text-decoration: none;
  color: var(--color-accent);
}
.apod_desc::-webkit-scrollbar {
  width: 4px;
}
.apod_desc::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}
.apod_desc::-webkit-scrollbar-track {
  background: transparent;
}

.apod_state {
  margin: 0;
  text-align: center;
  font-size: 0.9rem;
}
</style>