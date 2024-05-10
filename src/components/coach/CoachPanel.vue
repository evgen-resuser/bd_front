<script>
import {getCoachesList, getCoachesListBySport, getSportsmenOfCoach} from "@/components/coach/CoachUtils.js";
import {getSports} from "@/components/ExtraUtils.js";

export default {
  props: ['server'],
  data() {
    return {
      coachesList: [],
      sportsList: [],

      selectedCoach: null,
      selectedSport: null,

      sportsmen: [],

      dischargeCheck: false,
      discharge: 0,


    }
  },
  methods: {
    async getAllCoaches() {
      this.coachesList = await getCoachesList(this.server)
    },
    selectNew(entry) {
      this.selectedCoach = entry;
      this.showSportsmen()
    },
    async loadSports() {
      this.sportsList = await getSports(this.server)
    },
    async showBySport(id) {
      if (this.selectedSport === null) return;
      console.log(this.coachesList);
      this.coachesList = [];
      let result = await getCoachesListBySport(this.server, id);
      console.log(result);
      this.coachesList = [...result];
      console.log(this.coachesList);
    },
    async showSportsmen() {
      if (!this.dischargeCheck)
        this.sportsmen = await getSportsmenOfCoach(this.server, this.selectedCoach.id, null)
      else {
        this.sportsmen = await getSportsmenOfCoach(this.server, this.selectedCoach.id, this.discharge)
      }
      console.log(this.sportsmen);
    }
  },
  mounted() {
    this.getAllCoaches();
    this.loadSports();
  }

}
</script>

<template>
<div class="wrapper">
  <div class="side_panel">
    <div class="list">
      <div class="sportsman_entry"
           v-if="coachesList.length > 0"
           v-for="entry in coachesList"
           @click="selectNew(entry)"
      >{{entry.id}}: {{entry.name}}</div>
    </div>
  </div>
  <div class="main_panel">
    <div class="coaches_by_sport">
      <h3>Показать тренеров по спорту</h3>
      <label for="sport_select">Спорт </label>
      <select id="sport_select" class="sport_select" v-model="selectedSport">
        <option v-for="s in sportsList" :value="s">{{s.name}}</option>
      </select >
      <button class="param_button" @click="this.showBySport(selectedSport.id)">Показать</button>
    </div>
    <div class="subpanel">
      <div class="about2">
        <div  class="viewport">
          <h3>Спортсмены тренера</h3>
          <ul>
            <li v-for="s in this.sportsmen" >{{s.id}}: {{s.name}} <span v-if="isFinite(s.discharge)">- {{s.discharge}} разряд</span></li>
          </ul>
        </div>
        <div class="params">
          <button class="param_button" @click="showSportsmen()">Применить</button>
          <input id="dischargeCheckBox" type="checkbox" v-model="dischargeCheck">
          <label for="dischargeCheckBox">Не ниже разряда: </label>
          <input type="number" v-model="discharge" :disabled="!dischargeCheck" style="width: 50px" min="1" max="10">
        </div>
      </div>
      <div class="about2">
        <div class="viewport">

        </div>
        <div class="params">

        </div>
      </div>
    </div>
    <button class="param_button" @click="this.getAllCoaches">Сброс</button>
    <button class="param_button" @click="">Изменить</button>
    <button class="param_button" @click="">Добавить</button>
  </div>
</div>
</template>

<style>
@import "public/styles/sider.css";

.coaches_by_sport {
  margin: 10px;
  padding: 0 15px 10px 15px;
  background-color: white;
  border-radius: 10px;
  cursor: default;
  border: 1px solid rgb(147, 147, 147);
}

.param_button {
  background: linear-gradient(158deg, rgb(255, 53, 19) 0%, rgb(255, 198, 53) 100%);
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
  color: white;
  width: 100px;
  font-weight: 300;
  border-color: #ff5a35;
}

.param_button:hover {
  background: #ff5a35;
}

.sport_select {
  background-color: white;
  border-radius: 10px;
  border-color: #ff5a35;
  height: 30px;
}

.about2 {
  margin: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  cursor: default;
  border: 1px solid rgb(147, 147, 147);
}

.about2 {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
}

.params {
  width: 100%;
  flex: 1;
  border-top: 1px solid rgb(147, 147, 147);
  display: flex;
  align-items: center;
}

.viewport {
  width: 100%;
  flex: 4;
  overflow: auto;
}

.subpanel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 40%;
}

</style>