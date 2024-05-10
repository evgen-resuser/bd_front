<script>
import axios from "axios";
import { getFormattedCoaches } from "./SportsmanUtils.js";
import {getCoachesList, addCoachTo} from "@/components/coach/CoachUtils.js";

export default {
  props: ['server'],
  data() {
    return {
      resultList: [],
      selectedEntry: null,
      coaches: [],
      showSportsButton: true,
      sports: [],
      showAddCoach: false,
      allCoaches: [],
      selectedCoachToAdd: null,
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
    async getSports(id){
      try {
        const response = await fetch(this.server.concat('/find/sportsman/coaches?id=', id));
        this.coaches = getFormattedCoaches(await response.json());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    selectNew(entry) {
      this.selectedEntry = entry;
      this.showSportsButton = true;
      this.coaches = [];
      this.sports = [];
      this.getCoaches(entry.id);
    },
    async loadCoachesList() {
      this.showAddCoach = true;
      this.allCoaches = await getCoachesList(this.server);
    },
    async addCoachTo(){
      if (this.selectedCoachToAdd === null) {
        console.log("NO SELECTED!")
        return
      }
      const coachId = this.selectedCoachToAdd.id;
      await addCoachTo(this.selectedEntry.id, coachId, this.server)
      this.showAddCoach = false
      await this.getCoaches(this.selectedEntry.id)
    }

  },
  mounted() {
    this.refreshList();
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
      <div class="subpanel2">
        <div class="about2">
          <strong style="font-weight: 600; margin: 10px" >О спортсмене:</strong>
          <div class="no_selected"
               v-if="selectedEntry === null"
          >Выберете кого-нибудь в списке слева</div>
          <ul v-else>
            <li>Имя: {{selectedEntry.name}};</li>
            <li>Клуб: {{isInfoNull(selectedEntry.clubName)}};</li>
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
      <div class="subpanel2">
        <div class="about2">
          <strong style="font-weight: 600; margin: 10px" >Его виды спорта:</strong>
          <div class="viewport">

          </div>
          <div class="params">
            <button class="param_button">Применить</button>
            <input id="dischargeCheckBox" type="checkbox">
            <label for="dischargeCheckBox">Не ниже разряда: </label>
            <input type="number" style="width: 50px" min="1" max="10">
          </div>
        </div>
        <div class="about2">
          <strong style="font-weight: 600; margin: 10px" >Участвовал в:</strong>
          <div class="viewport">

          </div>
          <div class="params">
            <button class="param_button">Применить</button>
          </div>
        </div>
      </div>

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
              @click="addCoachTo()"
      >Добавить</button>
    </div>
  </div>

</template>

<style>
@import "public/styles/sider.css";

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

.main_panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 75%;
  height: 100%;
  padding: 20px 0;
  overflow: auto;
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

.subpanel2 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 40%;
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

</style>