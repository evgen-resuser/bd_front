<script setup>
import TabButton from "@/components/TabButton.vue"
import SportsmanComponent from "@/components/SportsmanComponent.vue";
import HomeComponent from "@/components/HomeComponent.vue";
import CoachComponent from "@/components/CoachComponent.vue";
import PlacesComponent from "@/components/PlacesComponent.vue";
import CompetitionsComponent from "@/components/CompetitionsComponent.vue";

const server_url = 'localhost:8080'

</script>

<script>
export default {
  methods: {
    goToSection(section) {
      window.location.hash = section;
    },
    isSectionVisible(section) {
      return window.location.hash === `#${section}`;
    }
  },
  mounted() {
    this.goToSection('home')
  }
}
</script>

<template>
  <header>
    <div class="header">
      <div class="home_button"
           @click="goToSection('home')"
      >
        <img :src="'icons/home_icon.svg'" alt="home" style="filter: invert()"/>
      </div>
      <TabButton :name="'Спортсмены'"
                 :link="'/#sportsman'"
                 :icon_path="'icons/sportsman_icon.svg'"
      />
      <TabButton :name="'Тренеры'"
                 :link="'/#coach'"
                 :icon_path="'icons/coach_icon.svg'"/>
      <TabButton :name="'Места'"
                 :link="'/#place'"
                 :icon_path="'icons/place_icon.svg'"/>
      <TabButton :name="'Соревнования'"
                 :link="'/#competition'"
                 :icon_path="'icons/trophy_icon.svg'"/>
    </div>
  </header>

  <main>

    <HomeComponent/>
    <SportsmanComponent :server="server_url"/>
    <CoachComponent :server="server_url"/>
    <PlacesComponent :server="server_url"/>
    <CompetitionsComponent :server="server_url"/>

  </main>
</template>

<style>
  @import "./style/header.css";

  body {
    margin: 0;
    padding: 0;
    background: aliceblue;
  }

  .home_button {
    margin: 5px 12px 5px 5px;
    padding: 10px;
    background: rgb(255, 90, 53);
    border-radius: 10px;
    cursor: pointer;
    width: 30px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .home_button:hover {
    background: #f7c59f;
  }

</style>
