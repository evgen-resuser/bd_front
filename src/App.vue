<script setup>
import TabButton from "@/components/TabButton.vue"
import SportsmanComponent from "@/components/sportsman/SportsmanComponent.vue";
import HomeComponent from "@/components/HomeComponent.vue";
import CoachComponent from "@/components/coach/CoachComponent.vue";
import PlacesComponent from "@/components/places/PlacesComponent.vue";
import CompetitionsComponent from "@/components/competition/CompetitionsComponent.vue";
import ExtraComponent from "@/components/extra/ExtraComponent.vue";

const server_url = 'http://localhost:8080'

</script>

<script>
// import {getSports} from "@/components/ExtraUtils.js";

export default {
  methods: {
    goToSection(section) {
      window.location.hash = section;
    },
    // async loadSports() {
    //   this.sportsList = await getSports(this.server)
    // },
  },
  mounted() {
    this.goToSection('home')
  },
  data() {
    return {
      sportsList: []
    }
  }
}
</script>

<template>
  <header>
    <div class="header" id="header">
      <div class="home_button"
           @click="goToSection('home')"
      >
        <img :src="'icons/home_icon.svg'" alt="home" style="filter: invert()"/>
      </div>
      <TabButton :name="'Спортсмены'"
                 :link="'/#sportsman'"
                 :icon_path="'icons/sportsman_icon.svg'"/>
      <TabButton :name="'Тренеры'"
                 :link="'/#coach'"
                 :icon_path="'icons/coach_icon.svg'"/>
      <TabButton :name="'Места'"
                 :link="'/#place'"
                 :icon_path="'icons/place_icon.svg'"/>
      <TabButton :name="'Соревнования'"
                 :link="'/#competition'"
                 :icon_path="'icons/trophy_icon.svg'"/>
      <TabButton :name="'Прочее'"
                 :link="'/#extra'"
                 :icon_path="'icons/more_icon.svg'"/>
    </div>
  </header>

  <main>

    <HomeComponent/>
    <SportsmanComponent :server="server_url"/>
    <CoachComponent :server="server_url"/>
    <PlacesComponent :server="server_url"/>
    <CompetitionsComponent :server="server_url"/>
    <ExtraComponent :server="server_url"/>

  </main>
</template>

<style>
  @import "./style/header.css";

  body {
    margin: 0;
    padding: 0;
    background: #8ecae6 url('/background.png') repeat;


    font-family: "Jost", sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
  }

  .home_button {
    margin: 5px 12px 5px 5px;
    padding: 10px;
    background: linear-gradient(158deg, rgb(255, 53, 19) 0%, rgb(255, 198, 53) 100%);
    border-radius: 10px;
    cursor: pointer;
    width: 30px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .home_button:hover {
    background: #ff5a35;
  }



</style>
