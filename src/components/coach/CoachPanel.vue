<script>
import {getCoachesList, getCoachesListBySport, getSportsmenOfCoach, postCoach, deleteSportsman,
update, getSportsByCoach, deleteSport, addSport, addSportsman} from "@/components/coach/CoachUtils.js";
import {getSports} from "@/components/ExtraUtils.js";
import {getAllSportsmen} from "@/components/sportsman/SportsmanUtils.js";

export default {
  props: ['server'],
  data() {
    return {
      coachesList: [],
      sportsList: [],
      sportsmenList: [],

      selectedCoach: null,
      selectedSport: null,
      sportsman: null,

      sportsmen: [],
      sports: [],

      dischargeCheck: false,
      discharge: 0,

      createWindowShow: false,
      editWindowShow: false,
      addSportsmenShow: false,
      addSportShow: false,
    }
  },
  methods: {
    async getAllCoaches() {
      this.coachesList = await getCoachesList(this.server)
    },
    selectNew(entry) {
      this.selectedCoach = entry;
      this.showSportsmen()
      this.getSportsByCoach()
    },
    async loadSports() {
      this.sportsList = await getSports(this.server)
    },
    async showBySport(id) {
      if (this.selectedSport === null) return;
      this.coachesList = [];
      let result = await getCoachesListBySport(this.server, id);
      this.coachesList = [...result];
    },
    async showSportsmen() {
      if (!this.dischargeCheck)
        this.sportsmen = await getSportsmenOfCoach(this.server, this.selectedCoach.id, null)
      else {
        this.sportsmen = await getSportsmenOfCoach(this.server, this.selectedCoach.id, this.discharge)
      }
    },
    async postCoach() {
      let formData = {
        "name": document.getElementById('nameUpd').value,
      };
      await postCoach(this.server, formData)
      this.createWindowShow = false;
      await this.getAllCoaches()
    },
    async deleteSportsman(id) {
      await deleteSportsman(this.server, this.selectedCoach.id, id)
      this.sportsmen.slice(0, this.sportsmen.length)
      await this.showSportsmen()
    },
    async updateCoach(){
      let newName = document.getElementById('nameUpd').value;
      if (name === newName) return
      let data = {
          "name": newName,
          "id":this.selectedCoach.id
      }
      await update(this.server, this.selectedCoach.id, data)
      await this.getAllCoaches(); //todo не обновляет а сохраняет по-новой почему
    },
    async getSportsByCoach() {
    this.sports = await getSportsByCoach(this.server, this.selectedCoach.id)
    },
    async deleteSportFromCoach(id) {
      await deleteSport(this.server, this.selectedCoach.id, id)
    },
    async getAllSportsmen() {
      this.sportsmenList = await getAllSportsmen(this.server)
    },
    async addSportsman() {
      let id = this.sportsman.id
      await addSportsman(this.server, this.selectedCoach.id, id)
      this.addSportsmenShow = false;
    },
    async addSportToCoach() {
      await addSport(this.server, this.selectedCoach.id, this.selectedSport.id)
      this.addSportShow = false;
    },
    refreshAll() {
      this.getAllCoaches()
      this.loadSports()
      this.getAllSportsmen()
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
           v-if="coachesList.length > 0"
           v-for="entry in coachesList"
           @click="selectNew(entry)"
      >{{entry.id}}: {{entry.name}}</div>
    </div>
  </div>
  <div class="main_panel">
    <div class="coaches_by_sport">
      <h3>Показать тренеров по спорту</h3>
      <label for="sport_select">Спорт:  </label>
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
            <li v-for="s in this.sportsmen" >
              {{s.id}}: {{s.name}} <span v-if="isFinite(s.discharge)">- {{s.discharge}} разряд</span><span class="delete" @click="deleteSportsman(s.id)">&times;</span>
            </li>
          </ul>
        </div>
        <div class="params">
          <button class="param_button" @click="showSportsmen()">Применить</button>
          <button class="param_button" @click="this.addSportsmenShow = true">Добавить</button>
          <input id="dischargeCheckBox" type="checkbox" v-model="dischargeCheck">
          <label for="dischargeCheckBox">Не ниже разряда: </label>
          <input type="number" v-model="discharge" :disabled="!dischargeCheck" style="width: 50px" min="1" max="10">
        </div>
      </div>
      <div class="about2">
        <div  class="viewport">
          <h3>Ведет виды спорта</h3>
          <ul>
            <li v-for="s in this.sports" >
              {{s.name}}<span class="delete" @click="deleteSportFromCoach(s.id)">  &times;</span>
            </li>
          </ul>
        </div>
        <div class="params">
          <button class="param_button" @click="addSportShow = true">Добавить</button>
        </div>
      </div>

    </div>
    <div style="margin-left: 10px">
      <button class="param_button" @click="this.getAllCoaches">Сброс фильтров</button>
<!--      <button class="param_button" @click="editWindowShow = true">Изменить данные</button>-->
      <button class="param_button" @click="createWindowShow = true">Добавить тренера</button>
      <button class="param_button" @click="refreshAll">&#8635;</button>
    </div>
  </div>
</div>

  <div v-if="editWindowShow" class="add">
    <div class="modal_content">
      <span class="close" @click="editWindowShow = false">&times;</span>
      <h3>Изменить тренера</h3>
      <label>ФИО: </label>
      <input type="text" id="name" name="name" class="text_input" required v-model="this.selectedCoach.name">
      <button @click="this.postCoach()">Изменить</button>
    </div>
  </div>

  <div v-if="createWindowShow" class="add">
    <div class="modal_content">
      <span class="close" @click="createWindowShow = false">&times;</span>
      <h3>Добавить тренера</h3>
      <label>ФИО: </label>
      <input type="text" id="nameUpd" name="nameUpd" class="text_input" required>
      <button @click="this.postCoach()">Добавить</button>
    </div>
  </div>

  <div v-if="addSportsmenShow" class="add">
    <div class="modal_content">
      <span class="close" @click="addSportsmenShow = false">&times;</span>
      <h3>Добавить спортсмена</h3>
      <select id="sportsmen_select" class="sportsmen_select" v-model="this.sportsman">
        <option v-for="s in sportsmenList" :value="s">{{s.name}}</option>
      </select >
      <button @click="this.addSportsman()">Добавить</button>
    </div>
  </div>

  <div v-if="addSportShow" class="add">
    <div class="modal_content">
      <span class="close" @click="addSportShow = false">&times;</span>
      <h3>Добавить спортсмена</h3>
      <select id="sport_select" class="sport_select" v-model="selectedSport">
        <option v-for="s in sportsList" :value="s">{{s.name}}</option>
      </select >
      <button @click="this.addSportToCoach()">Добавить</button>
    </div>
  </div>

</template>

<style>
@import "/public/styles/sider.css";
@import "/public/styles/page.css";

.coaches_by_sport {
  margin: 10px;
  padding: 0 15px 10px 15px;
  background-color: white;
  border-radius: 10px;
  cursor: default;
  border: 1px solid rgb(147, 147, 147);
}

.sport_select {
  background-color: white;
  border-radius: 10px;
  border-color: #ff5a35;
  height: 30px;
}

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
  width: 400px;
  border-radius: 10px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover, .close:focus {
  color: #ff5a35;
  text-decoration: none;
  cursor: pointer;
}
</style>