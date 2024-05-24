<script>
import {
  getAllCompetitions,
  getAllOrgs, getCompByOrg,
  getCompByPeriodOrg, getOrgsPeriod, getWinners, postCompetition
} from "@/components/competition/CompetitionUtils.js";
import {getSports} from "@/components/ExtraUtils.js";
import {getAllSportsmen} from "@/components/sportsman/SportsmanUtils.js";
import {addParticipation, getPlacesList} from "@/components/places/PlacesUtils.js";
export default {
  props: ['server', 'sports'],
  data() {
    return {
      competitions: [],
      orgs: [],
      selected: null,

      dateOS: null,
      dateOE: null,
      orgsCheck: false,
      selectedOrg: null,

      winners: [],

      createWindowShow: false,
      sportsList: [],
      placeList: [],
      selectedSport: null,
      sportsmenList: [],
      selected1: null,
      selected2: null,
      selected3: null,
      dateCr: null,
      selectedPlace: null,
      selectedOrgCr: null,

      orgPeriodS: null,
      orgPeriodE: null,
      orgsResult: [],

      selectParticipation: null,
      showParticipationWindow: false,
    }
  },
  methods: {
    async getCompetitions() {
      this.competitions = await getAllCompetitions(this.server)
    },
    async getOrgs() {
      this.orgs = await getAllOrgs(this.server);
    },
    async getCompByOrgPeriod() {
      if (this.selectedOrg === null) return
      if (!this.orgsCheck) {
        this.competitions = await getCompByOrg(this.server, this.selectedOrg.id)
      } else {
        if (this.dateOS === null || this.dateOE === null) return
        this.competitions = await getCompByPeriodOrg(this.server, this.dateOS, this.dateOE, this.selectedOrg.id)
      }
    },
    selectCompetition(entry) {
      this.selected = entry;
      this.getWinners();
    },
    async getWinners() {
      if (this.selected === null) return
      this.winners = await getWinners(this.server, this.selected.id)
    },
    async loadSports() {
      this.sportsList = await getSports(this.server)
    },
    async getAllSportsmen() {
      this.sportsmenList = await getAllSportsmen(this.server)
    },
    async postCompetition() {
      this.createWindowShow = false;
      if (this.dateCr === null || this.selectedSport === null ||
          this.selectedPlace === null || this.selectedOrgCr === null ) return
      let data = {
        "date": this.dateCr,
        "sportId": this.selectedSport.id,
        "placeId": this.selectedPlace.id.id,
        "placeTypeId": this.selectedPlace.id.typeId,
        "orgId": this.selectedOrgCr.id,
        "firstId": (this.selected1 !== null) ? this.selected1.id : null,
        "secondId": (this.selected2 !== null) ? this.selected2.id : null,
        "thirdId": (this.selected3 !== null) ? this.selected3.id : null
      }
      console.log(data)
      await postCompetition(this.server, data)
    },
    async getPlacesList() {
      this.placeList = await getPlacesList(this.server)
    },
    async getOrgsCount(){
      if (this.orgPeriodS === null || this.orgPeriodE === null) return
      this.orgsResult = await getOrgsPeriod(this.server, this.orgPeriodS, this.orgPeriodE)
    },
    refreshAll() {
      this.getCompetitions()
      this.getOrgs()
      this.getAllSportsmen()
      this.loadSports()
      this.getPlacesList()
    },
    addParticipation() {
      if (this.selectParticipation === null) return

      let data = {
        "sportsmanId": this.selectParticipation.id,
        "competitionId": this.selected.id
      }
      addParticipation(this.server, data)

      this.showParticipationWindow = false
    }
  },
  mounted() {
    this.getCompetitions()
    this.getOrgs()
    this.getAllSportsmen()
    this.loadSports()
    this.getPlacesList()
  }
}
</script>

<template>
<div class="wrapper">
  <div class="side_panel">
    <div class="list">
      <div class="sportsman_entry" v-for="c in competitions" @click="selectCompetition(c)">
        {{c.sport.name}} - {{c.date}}
      </div>
    </div>
  </div>
  <div class="main_panel">
    <div class="subpanel">
      <div class="about2">
        <h3>Информация</h3>
        <div v-if="this.selected !== null">
          Дата: {{selected.date}}<br>
          Организатор: {{selected.organize.name}}<br>
          Место проведения: {{selected.place}}<br>
          Спорт: {{selected.sport.name}}<br>
        </div>
        <div v-else class="no_selected">
          Выберете что-нибудь в списке слева
        </div>
      </div>
      <div class="about2">
        <h3>Призеры этого соревновния</h3>
        <div class="viewport">
          <ul>
            <li v-for="w in winners"> {{w.place}} - {{ w.name }} ({{w.id}})</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="subpanel">
      <div class="about2">
        <h3>Показать организаторов мероприятий в период</h3>
        <div class="viewport">
          <ul>
            <li v-for="o in orgsResult">{{o.organize.name}}, провел соревнований: {{o.count}}</li>
          </ul>
        </div>
        <div class="params">
          <label for="orgPeriodS">c </label>
          <input type="date" id="orgPeriodS" v-model="orgPeriodS">
          <label for="orgPeriodE"> по </label>
          <input type="date" id="orgPeriodE" v-model="orgPeriodE">
          <button class="param_button" @click="this.getOrgsCount()">Показать</button>
        </div>
      </div>
      <div class="about2">
        <h3>Найти по организатору и/или периоду</h3>
        <div class="viewport">
          <label for="orgSelect">По организатору</label>
          <select id="orgSelect" v-model="selectedOrg">
            <option :value="o" v-for="o in orgs">{{ o.name }}</option>
          </select>
          <br>
          <input type="checkbox" id="orgPeriod" v-model="orgsCheck">
          <label for="orgPeriod">С учетом периода</label>
          <label for="orgPeriodS">c </label>
          <input type="date" id="orgPeriodS" v-model="dateOS" :disabled="!orgsCheck">
          <label for="orgPeriodE"> по </label>
          <input type="date" id="orgPeriodE" v-model="dateOE" :disabled="!orgsCheck"><br>
          <button class="param_button" @click="getCompByOrgPeriod">Искать</button>
        </div>
      </div>
    </div>

    <button class="param_button" @click="getCompetitions">Сброс</button>
    <button class="param_button" @click="createWindowShow = true">Добавить</button>
    <button class="param_button" @click="showParticipationWindow = true">Добавить учатсника</button>
    <button class="param_button">Удалить</button>
    <button class="param_button" @click="refreshAll">&#8635;</button>
  </div>

  <div v-if="showParticipationWindow" class="add">
    <div class="modal_content">
      <span class="close" @click="showParticipationWindow = false">&times;</span>
      <h3>Добавить участника</h3>
      <select v-model="selectParticipation">
        <option v-for="s in sportsmenList" :value="s">{{s.name}}</option>
      </select><br>
      <button class="param_button" @click="addParticipation">Добавить</button>
    </div>
  </div>

  <div v-if="createWindowShow" class="add">
    <div class="modal_content">
      <span class="close" @click="createWindowShow = false">&times;</span>
      <h3>Добавить соревнование</h3>
      <label>Дата: </label>
      <input type="date" id="dateCr" name="dateCr" required v-model="dateCr"><br>
      <label>Спорт: </label>
      <select v-model="selectedSport">
        <option v-for="s in sportsList" :value="s">{{s.name}}</option>
      </select><br>
      <label>Организатор: </label>
      <select v-model="selectedOrgCr">
        <option v-for="s in orgs" :value="s">{{s.name}}</option>
        <option :value="null" selected>нет</option>
      </select><br>
      <label>Место проведения: </label>
      <select v-model="selectedPlace">
        <option v-for="s in placeList" :value="s">{{s.name}}</option>
        <option :value="null" selected>нет</option>
      </select><br>
      <label>Первое место: </label>
      <select v-model="selected1">
        <option v-for="s in sportsmenList" :value="s">{{s.name}}</option>
        <option :value="null" selected>нет</option>
      </select><br>
      <label>Второе место: </label>
      <select v-model="selected2">
        <option v-for="s in sportsmenList" :value="s">{{s.name}}</option>
        <option :value="null" selected>нет</option>
      </select><br>
      <label>Третье место: </label>
      <select v-model="selected3">
        <option v-for="s in sportsmenList" :value="s">{{s.name}}</option>
        <option :value="null" selected>нет</option>
      </select><br>

      <button @click="this.postCompetition()">Добавить</button>
    </div>
  </div>

</div>
</template>

<style>
@import "/public/styles/sider.css";
@import "/public/styles/page.css";

.no_selected {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
}

</style>