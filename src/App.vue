<script setup lang="ts">
import StarField from "./Components/background/StarField.vue";
import SearchBar from "./Components/home/SearchBar.vue";
import BookMarksCard from "./Components/home/BookMarksCard.vue";
import WeatherCard from "./Components/weather/WeatherCard.vue";
import OneImgPerDayCard from "./Components/nasa/OneImgPerDayCard.vue";
import BookMarksPersoCard from "./Components/home/BookMarksPersoCard.vue";
import { BOOKMARKS_PERSO, BOOKMARKS_PRO } from "./utils/BookMarks.js";
import CalendarWidget from "./Components/calendar/CalendarWidget.vue";
import GmailWidget from "./Components/gmail/GmailWidget.vue";
</script>

<template>
  <StarField />
  <main class="hud">
    <div class="hud_header_container">
      <h2 class="categorie">Raccourcis Pro</h2>

      <div class="hud_header_container_book_marks">
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

        <div class="hud_main_container_left_bookMarks_perso">
          <h2 class="categorie">Raccourcis Perso</h2>
          <div class="hud_header_container_book_marks_perso">
            <BookMarksPersoCard
              v-for="(item, index) in BOOKMARKS_PERSO"
              :key="index"
              :bookmark="item"
            />
          </div>
        </div>
      </div>
      <div class="hud_main_container_rigth">
        <div class="nasa_picture">
          <OneImgPerDayCard />
        </div>
        <div class="calendar_container">
          <div class="today_calendar">
            <CalendarWidget />
          </div>
          <div class="unread_mails">
            <GmailWidget />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

.hud {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

.bg {
  position: fixed;
  inset: -40px;
  z-index: -1;
  background-size: cover;
  background-position: center;
}

.hud_header_container {
  width: 100%;
  min-height: 20vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-left: 5rem;
  box-sizing: border-box;
}

.hud_header_container_book_marks {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hud_main_container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 80vh;
  max-height: 80vh;
  padding-left: 5rem;
  box-sizing: border-box;
}

.hud_main_container_left {
  margin: 0 20px 0 0;
  min-width: 0;
}

.hud_main_container_rigth {
  padding: 20px;
  min-width: 0;
}

.weather {
  margin: 10px 0 20px 0;
  display: flex;
}

.hud_main_container_left_bookMarks_perso {
  margin-top: 20px;
}

.hud_header_container_book_marks_perso {
  display: flex;
  flex-wrap: wrap;
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

.calendar_container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 2rem;
}
</style>
