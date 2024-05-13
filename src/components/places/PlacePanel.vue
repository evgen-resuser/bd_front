<script>
import {getPlacesList, getCompetitionsList, getPlacesBySport} from "@/components/places/PlacesUtils.js";
import {getSports} from "@/components/ExtraUtils.js";

export default {
  props: ['server'],
  data() {
    return {
      placeList: [],
      competitionsList: [],
      sportsList: [],

      selectedPlace: null,

      selectedSport: null,
      sportCheck: null,
    }
  },
  methods: {
    async getPlacesList() {
      this.placeList = await getPlacesList(this.server)
    },
    async getCompetitions(entry) {
      this.competitionsList = await getCompetitionsList(this.server, entry.id.id, entry.id.typeId)
    },
    selectPlace(entry){
      this.selectedPlace = entry;
      this.getCompetitions(entry);
    },
    async getSportList(){
      this.sportsList = await getSports(this.server)
    },
    async getPlaceBySport(id, type, sId) {
      this.competitionsList = await getPlacesBySport(this.server ,id, type, sId);
      console.log(this.competitionsList)
    },
    async loadCompetitions() {
      if (!this.sportCheck) {
        await this.getCompetitions(this.selectedPlace)
      } else {
        await this.getPlaceBySport(this.selectedPlace.id.id, this.selectedPlace.id.typeId, this.selectedSport.id)
      }
    }
  },
  mounted() {
    this.getPlacesList()
    this.getSportList()
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="side_panel">
      <div class="list">
        <div v-for="p in placeList" class="sportsman_entry" @click="selectPlace(p)">{{p.name}}</div>
      </div>
    </div>
    <div class="main_panel">
      <div class="subpanel">
        <div class="about2">
          <div class="viewport">
            <h3>Cоревнования в этом месте</h3>
            <div v-if="competitionsList.length < 1">нет данных</div>
            <ul>
              <li v-for="c in this.competitionsList">{{c.id}}: {{c.sport.name}} - {{c.date}}</li>
            </ul>
          </div>
          <div class="params">
            <input type="checkbox" id="sport_check" v-model="sportCheck">
            <label for="sport_check">С выбранным спортом: </label>
            <select class="sport_select" v-model="this.selectedSport" :disabled="!sportCheck">
              <option v-for="s in this.sportsList" :value="s">{{s.name}}</option>
            </select>
            <button class="param_button" @click="this.loadCompetitions()">Применить</button>
          </div>
        </div>
      </div>
      <button class="param_button">Сброс</button>
      <button class="param_button">Добавить</button>
      <button class="param_button">Изменить</button>
    </div>
  </div>
</template>

<style>
.sport_select {
  background-color: white;
  border-color: #ff5a35;
}

.sport_select:disabled {
  border-color: #aaaaaa;
}


</style>