<script setup lang="ts">
import StarField from "./Components/background/StarField.vue";
import SearchBar from "./Components/home/SearchBar.vue";
import BookMarksCard from "./Components/home/BookMarksCard.vue";
import WeatherCard from "./Components/weather/WeatherCard.vue";
import OneImgPerDayCard from "./Components/nasa/OneImgPerDayCard.vue";
import { BOOKMARKS_PRO } from "./utils/BookMarks.js";
</script>

<template>
  <StarField />
  <main class="hud">
    <div class="hud_header_container">
      <h2 class="categorie">Raccourcis Pro</h2>

      <div class="hud_header_container_bokk_marks">
        <BookMarksCard
          v-for="(item, index) in BOOKMARKS_PRO"
          :key="index"
          :bookmark="item"
        /> 
      </div>
    </div>
    <div class="hud_main_container">
      <div class="hud_main_container_left">
        <div class="weather">
          <WeatherCard />
        </div>

        <SearchBar class="SearchBar" />
      </div>
      <div class="hud_main_container_rigth">
        <div class="nasa_picture">
          <OneImgPerDayCard />
        </div>
      </div>
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
}

.hud_header_container {
  width: 100%;
  max-width: 100vw;
  min-height: 20vh;

  display: flex;
  justify-content: center;
  flex-direction: column;

  padding: 0 5rem;
}



.hud_header_container_bokk_marks {
  display: flex;
  justify-content: center;
  align-items: center;
}


.hud_main_container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 80vh;
}

.hud_main_container_left {
  margin: 0 20px 0 100px;
}
.hud_main_container_rigth {
  padding: 20px;
}

.weather {
  margin: 50px 0 20px 0;
  display: flex;
}

.categorie {
  color: var(--color-muted);
  font-family: var(--font-ui);
  font-size: 0.95rem;
}
.categorie::before {
  content: "";
  display: block;
  width: 20px;
  height: 1px;
  margin-bottom: 6px;
  background: currentColor;
}
</style>
