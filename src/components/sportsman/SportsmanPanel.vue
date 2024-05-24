<script>
import axios from "axios";
import {
  addSportsman,
  addSportToSportsman, competitions, deleteSportsman, getClubs,
  getFormattedCoaches,
  getSportsOfSportsman, nonParticipating,
  showSportsmenBySport,
  showSportsmenBySportDisch, twoOrMore
} from "./SportsmanUtils.js";
import {getCoachesList, addCoachTo} from "@/components/coach/CoachUtils.js";
import {getSports} from "@/components/ExtraUtils.js";
import {callWithAsyncErrorHandling} from "vue";

export default {
  props: ['server'],
  data() {
    return {
      resultList: [],
      selectedEntry: null,
      coaches: [],
      showSportsButton: true,
      clubs: [],

      showAddCoach: false,
      allCoaches: [],
      selectedCoachToAdd: null,

      sportCheck: false,
      sports: [],
      selectedSport: null,
      discharge: 0,

      sportsmanSports: [],
      showSportAdd: false,
      selectedSportA: null,

      showSportsmanAdd: false,
      nameA : null,
      clubA: null,

      competitions: [],
      date1: null,
      date2: null,
      dateCheck: false,

      nonParticipatingS: null,
      nonParticipatingE: null,

    }
  },
  methods: {
    refreshList() {
      let url = this.server.concat("/data/sportsman")
      axios.get(url)
          .then(response => {
            this.resultList = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    },
    isInfoNull(info) {
      return info === null || info === undefined || info.length === 0 ? "нет данных" : info
    },
    async getCoaches(id) {
      if (this.selectedEntry === null) return;
      try {
        const response = await fetch(this.server.concat('/find/sportsman/coaches?id=', id));
        this.coaches.slice(0, this.coaches.length);
        this.coaches = (getFormattedCoaches(await response.json()));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    selectNew(entry) {
      this.selectedEntry = entry;
      this.showSportsButton = true;
      this.coaches = [];
      this.getCoaches(entry.id);
      this.getSportsOf()
      this.getCompetitions()
    },
    async loadCoachesList() {
      this.showAddCoach = true;
      this.allCoaches = await getCoachesList(this.server);
    },
    async addCoachTo(){
      if (this.selectedCoachToAdd === null) {
        return
      }
      const coachId = this.selectedCoachToAdd.id;
      await addCoachTo(this.selectedEntry.id, coachId, this.server)
      this.showAddCoach = false
      await this.getCoaches(this.selectedEntry.id)
    },
    async showBySport(){
      if (this.selectedSport === null) return
      if (!this.sportCheck)
        this.resultList = await showSportsmenBySport(this.server, this.selectedSport.id)
      else {
        this.resultList = await showSportsmenBySportDisch(this.server, this.selectedSport.id, this.discharge)
      }
    },
    async getSportsList() {
      this.sports = await getSports(this.server)
    },
    async getSportsOf() {
      this.sportsmanSports = await getSportsOfSportsman(this.server, this.selectedEntry.id)
    },
    addSportToSelected() {
      addSportToSportsman(this.server, this.selectedSportA.id ,this.selectedEntry.id)
      this.showSportAdd = false
    },
    async loadClubs() {
      this.clubs = await getClubs(this.server)
    },
    async createSportsman() {
      if (this.nameA === null || this.nameA === undefined || this.nameA === "") {
        this.showSportsmanAdd = false
        return
      }
      let data = {
        "name": this.nameA,
        "clubId": (this.clubA !== null) ? this.clubA.id : null
      }
      await addSportsman(this.server, data)
      this.showSportsmanAdd = false
    },
    async deleteSportsmanId() {
      await deleteSportsman(this.server, this.selectedEntry.id)
    },
    async getTwoOrMore() {
      this.resultList = await twoOrMore(this.server)
    },
    async getCompetitions(){
      let tmp = await competitions(this.server, this.selectedEntry.id)
      this.competitions = []
      tmp.forEach( (elem) => {
            let data = {
              "sport": elem.sport.name,
              "date": elem.date,
            }
          this.competitions.push(data)
          }
      )
    },
    async filterCompsByDate() {
      if (!this.dateCheck || (this.date1 === null || this.date2 === null)) {
        await this.getCompetitions()
        return
      }
      let tmp = await competitions(this.server, this.selectedEntry.id)
      this.competitions = []
      tmp.forEach( (elem) => {
        let jsonDate = new Date(elem.date)
        if (jsonDate >= new Date(this.date1) && jsonDate <= new Date(this.date2)) {
          let data = {
            "sport": elem.sport.name,
            "date": elem.date
          }
          this.competitions.push(data)
        }
      }
      )
      console.log(this.competitions)
    },
    async showByPeriod(){
      this.resultList = await nonParticipating(this.server, this.nonParticipatingS, this.nonParticipatingE)
    },
    refreshAll() {
      this.refreshList();
      this.getSportsList()
      this.loadClubs()
    }

  },
  mounted() {
    this.refreshAll()
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="side_panel">
      <div class="list">
        <div class="sportsman_entry"
             v-if="resultList.length > 0"
             v-for="entry in resultList"
             @click="selectNew(entry)"
        >{{entry.id}}: {{entry.name}}</div>
        <div class="no_selected" v-else>
          Не найдено.
        </div>
      </div>
    </div>
    <div class="main_panel">
      <div class="sportsmen_by_sport">
        <div class="search_block">
          <h3>Показать спортсменов по спорту</h3>
          <label for="sport_select">Спорт:  </label>
          <select id="sport_select" class="sport_select" v-model="selectedSport">
            <option v-for="s in sports" :value="s">{{s.name}}</option>
          </select ><br>
          <input id="dischargeCheckBox" v-model="sportCheck" type="checkbox">
          <label for="dischargeCheckBox">Не ниже разряда: </label>
          <input :disabled="!sportCheck" type="number" style="width: 50px" min="1" max="10" v-model="discharge">
          <button class="param_button" @click="this.showBySport()">Показать</button>
          <button class="param_button" @click="this.getTwoOrMore()"> >=2 видов </button>
        </div>
        <div class="search_block" style="border-left: #aaaaaa 1px dashed; padding-left: 10px">
          <h3>Показать неучаствовавших в период</h3>
          <label for="orgPeriodS">c </label>
          <input type="date" id="orgPeriodS" v-model="nonParticipatingS">
          <label for="orgPeriodE"> по </label>
          <input type="date" id="orgPeriodE" v-model="nonParticipatingE">
          <button class="param_button" @click="this.showByPeriod()">Показать</button>
        </div>
      </div>
      <div class="subpanel3">
        <div class="about2">
          <strong style="font-weight: 600; margin: 10px" >О спортсмене:</strong>
          <div class="no_selected"
               v-if="selectedEntry === null"
          >Выберете кого-нибудь в списке слева</div>
          <ul v-else>
            <li>Имя: {{selectedEntry.name}};</li>
            <li>Клуб: {{(selectedEntry.club !== null) ? isInfoNull(selectedEntry.club.name) : 'нет данных'}};</li>
          </ul>
        </div>
        <div class="about2">
          <strong style="font-weight: 600; margin: 10px" >Его тренеры:</strong>
          <div class="viewport">
            <ul>
              <li v-for="c in this.coaches">{{c}}</li>
            </ul>
          </div>
          <div class="params">
            <button class="param_button" @click="(selectedEntry !== null) ? loadCoachesList() : null">Добавить</button>
          </div>
        </div>
      </div>
      <div class="subpanel3">
        <div class="about2">
          <strong style="font-weight: 600; margin: 10px" >Его виды спорта:</strong>
          <div class="viewport">
            <ul>
              <li v-for="s in sportsmanSports"> {{s.name}} </li>
            </ul>
          </div>
          <div class="params">
            <button class="param_button" @click="showSportAdd = true">Добавить</button>
          </div>
        </div>
        <div class="about2">
          <strong style="font-weight: 600; margin: 10px" >Участвовал в:</strong>
          <div class="viewport">
            <ul>
              <li v-for="c in competitions">{{c.sport}} ({{c.date}})</li>
            </ul>
          </div>
          <div class="params">
            <button class="param_button" @click="filterCompsByDate">Применить</button>
            <input type="checkbox" id="date_range" v-model="dateCheck">
            <label for="date_range">Между:</label>
            <input type="date" :disabled="!dateCheck" v-model="date1" >
            <input type="date" :disabled="!dateCheck" v-model="date2">
          </div>
        </div>
      </div>
      <button class="param_button" @click="this.refreshList">Сброс</button>
      <button class="param_button" @click="showSportsmanAdd = true">Добавить</button>
      <button class="param_button" @click="deleteSportsmanId">Удалить</button>
      <button class="param_button" @click="refreshAll">&#8635;</button>
    </div>
  </div>

  <div v-if="showAddCoach" class="add">
    <div class="modal_content">
      <span class="close" @click="showAddCoach = false">&times;</span>
      <h3>Добавить тренера</h3>
       <select id="coaches_select" class="coaches" v-model="selectedCoachToAdd">
         <option v-for="c in this.allCoaches" :value="c">
           {{c.id}} : {{c.name}}
         </option>
       </select>
      <button class="param_button"
              @click="addCoachTo"
      >Добавить</button>
    </div>
  </div>

  <div v-if="showSportAdd" class="add">
    <div class="modal_content">
      <span class="close" @click="showSportAdd = false">&times;</span>
      <h3>Добавить вид спорта</h3>
      <label for="sport_select_add">Спорт:  </label>
      <select id="sport_select_add" class="sport_select" v-model="selectedSportA">
        <option v-for="s in sports" :value="s">{{s.name}}</option>
      </select ><br>
      <button class="param_button"
              @click="addSportToSelected()"
      >Добавить</button>
    </div>
  </div>

  <div v-if="showSportsmanAdd" class="add">
    <div class="modal_content">
      <span class="close" @click="showSportsmanAdd = false">&times;</span>
      <h3>Добавить спортсмена</h3>
      <label for="name_add">ФИО:  </label>
      <input id="name_add" type="text" class="text_input" v-model="nameA"><br>
      <label for="club_add">Клуб:  </label>
      <select id="club_add" class="sport_select" v-model="clubA">
        <option v-for="c in clubs" :value="c">{{c.name}}</option>
        <option :value="null">нет</option>
      </select ><br>
      <button class="param_button"
              @click="createSportsman()"
      >Добавить</button>
    </div>
  </div>

</template>

<style>
@import "/public/styles/sider.css";
@import "/public/styles/page.css";

.add {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  backdrop-filter: blur(5px);
}

.modal_content {
  background-color: #fff;
  margin: 15% auto;
  padding: 20px;
  border: 2px solid #ff5a35;
  width: 300px;
  border-radius: 10px;
}

.no_selected {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
}

ul {
  list-style-type: none;
}

.sportsmen_by_sport {
  margin: 10px;
  padding: 0 15px 10px 15px;
  background-color: white;
  border-radius: 10px;
  cursor: default;
  border: 1px solid rgb(147, 147, 147);
  display: flex;
  flex-direction: row;
}

.subpanel3 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 35%;
}

.text_input {
  background-color: white;
  border-radius: 10px;
  border: 2px solid #ff5a35;
  margin: 10px;
  height: 25px;
}

.search_block {
  margin: 5px 10px 0 10px;
}
</style>