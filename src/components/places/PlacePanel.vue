<script>
import {
  getPlacesList,
  getCompetitionsList,
  getPlacesBySport,
  getStadiumsByParams,
  getPoolsByParams, getGymsByParams, addPlace, deletePlace, getPlaceCompPeriod
} from "@/components/places/PlacesUtils.js";
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

      selectedType: 1,

      stdSq: 0,
      stdPl: 0,
      stdIsCov: false,
      poolLan: 0,
      poolLen: 0,
      poolDep: 0,
      gymSq: 0,

      showAdd: false,
      selectedTypeAdd: 1,
      nameA: "",
      addressA: "",
      stdSqA: 0,
      stdPlA: 0,
      stdIsCovA: false,
      poolLanA: 0,
      poolLenA: 0,
      poolDepA: 0,
      gymSqA: 0,

      startD: null,
      endD: null,
      comps: [],
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
    },
    async loadCompetitions() {
      if (this.selectedPlace === null) return
      if (!this.sportCheck) {
        await this.getCompetitions(this.selectedPlace)
      } else {
        if (this.selectedSport === null) return
        await this.getPlaceBySport(this.selectedPlace.id.id, this.selectedPlace.id.typeId, this.selectedSport.id)
      }
    },
    async searchPlace() {
      switch (this.selectedType){
        case 1: {
          this.placeList = await getPoolsByParams(this.server, this.poolLan, this.poolDep, this.poolLen)
          return
        }
        case 2: {
          this.placeList = await getGymsByParams(this.server, this.gymSq)
          return
        }
        case 3: {
          this.placeList = await getStadiumsByParams(this.server, this.stdSq, this.stdPl, this.stdIsCov)
          return
        }
        default: return
      }
    },
    async createPlace() {
      if (this.nameA === null || this.addressA === null) return;
        switch (this.selectedTypeAdd) {
        case 1: {
          if (this.poolLanA === 0 || this.poolLenA === 0 || this.poolDepA === 0) return
          let data = {
            "name":this.nameA,
            "address":this.addressA,
            "lanesCount":this.poolLanA,
            "length":this.poolLenA,
            "depth":this.poolDepA
          }
          await addPlace(this.server, data, "pool")
          break
        }
        case 2: {
          if (this.gymSqA === 0) return
          let data = {
            "name":this.nameA,
            "address":this.addressA,
            "square":this.gymSqA
          }
          await addPlace(this.server, data, "gym")
          break
        }
        case 3: {
          if (this.stdSqA === 0 || this.stdPlA === 0 || this.stdIsCovA === 0) return
          let data = {
            "name":this.nameA,
            "address":this.addressA,
            "square":this.stdSqA,
            "placesCount": this.stdPlA,
            "isCovered": this.stdIsCovA
          }
          await addPlace(this.server, data, "stadium")
          break
        }
      }
      this.showAdd = false
      await this.getPlacesList()
    },
    async deletePl() {
      switch (this.selectedPlace.id.typeId) {
        case 1: {
          await deletePlace(this.server, this.selectedPlace.id.id, "pool")
          break
        }
        case 2: {
          await deletePlace(this.server, this.selectedPlace.id.id, "gym")
          break
        }
        case 3: {
          await deletePlace(this.server, this.selectedPlace.id.id, "stadium")
          break
        }
      }
    },
    async findPlacesCompetitions() {
      if (this.startD === null || this.endD === null) return
      this.comps = await getPlaceCompPeriod(this.server, this.startD, this.endD)
    },
    refreshAll() {
      this.getPlacesList()
      this.getSportList()
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
        <div class="about2">
          <h3>Информация о месте</h3>
          <div class="viewport" v-if="selectedPlace !== null">
            <ul>
              <li>Название: {{selectedPlace.name}}</li>
              <li>Адрес: {{selectedPlace.address}}</li>
              <li v-if="selectedPlace.stadiumIsCovered !== null && selectedPlace.stadiumIsCovered !== undefined">
                Крытый: {{selectedPlace.stadiumIsCovered === true ? "Да" : "Нет"}}
              </li>
              <li v-if="selectedPlace.stadiumPlacesCount !== null && selectedPlace.stadiumPlacesCount !== undefined">
                Количество мест: {{selectedPlace.stadiumPlacesCount}}
              </li>
              <li v-if="selectedPlace.stadiumSquare !== null && selectedPlace.stadiumSquare !== undefined">
                Площадь: {{selectedPlace.stadiumSquare}}
              </li>

              <li v-if="selectedPlace.gymSquare !== null && selectedPlace.gymSquare !== undefined">
                Площадь: {{selectedPlace.gymSquare}}
              </li>

              <li v-if="selectedPlace.poolDepth !== null && selectedPlace.poolDepth !== undefined">
                Глубина бассейна: {{selectedPlace.poolDepth}}
              </li>
              <li v-if="selectedPlace.poolLanesCount !== null && selectedPlace.poolLanesCount !== undefined">
                Количество полос: {{selectedPlace.poolLanesCount}}
              </li>
              <li v-if="selectedPlace.poolLength !== null && selectedPlace.poolLength !== undefined">
                Длина бассейна: {{selectedPlace.poolLength}}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="subpanel2">
        <div class="about2">
          <h3>Искать места по параметрам</h3>
          <div class="tabs_container">
            <button class="tab_button" @click="selectedType = 3">Стадионы</button>
            <button class="tab_button" @click="selectedType = 1">Бассейны</button>
            <button class="tab_button" @click="selectedType = 2">Спортзалы</button>
          </div>
          <div class="place_params" v-if="selectedType === 3">
            <h4 style="margin: 1px 1px 10px 1px">Параметры стадиона</h4>
            <label for="stadium_sq">Площадь >=</label>
            <input type="number" min="0" id="stadium_sq" value="0" v-model="stdSq"><br>
            <label for="stadium_places" >Количество мест >=</label>
            <input type="number" min="0" id="stadium_places" value="0" v-model="stdPl"><br>
            <label for="stadium_cov">Крытый</label>
            <input type="checkbox" id="stadium_cov" v-model="stdIsCov"><br>

          </div>
          <div class="place_params" v-if="selectedType === 1">
            <h4 style="margin: 1px 1px 10px 1px">Параметры бассейна</h4>
            <label for="pool_lanes">Кол-во полос >=</label>
            <input type="number" min="0" id="pool_lanes" value="0" v-model="poolLan"><br>
            <label for="pool_len" >Длина >=</label>
            <input type="number" min="0" id="pool_len" value="0" v-model="poolLen"><br>
            <label for="pool_dep" >Глубина >=</label>
            <input type="number" min="0" id="pool_dep" value="0" v-model="poolDep"><br>
          </div>
          <div class="place_params" v-if="selectedType === 2">
            <h4 style="margin: 1px 1px 10px 1px">Параметры спортзала</h4>
            <label for="gym_sq">Площадь >=</label>
            <input type="number" min="0" id="gym_sq" value="0" v-model="gymSq"><br>
          </div>
          <button class="param_button" style="margin: 10px" @click="this.searchPlace()">Искать</button>
        </div>
        <div class="about2">
          <h3>Места и соревнования по датам</h3>
          <div class="viewport">
          <ul>
            <li v-for="c in this.comps"> {{c.name}} - {{c.comp_id}}: {{c.date}} </li>
          </ul>
          </div>
          <div class="params">
            <label for="startD">с</label>
            <input type="date" id="startD" v-model="this.startD">
            <label for="endD">по</label>
            <input type="date" id="endD" v-model="this.endD">
            <button class="param_button" @click="findPlacesCompetitions">Показать</button>
          </div>
        </div>
      </div>
      <button class="param_button" @click="getPlacesList">Сброс</button>
      <button class="param_button" @click="showAdd = true">Добавить</button>
      <button class="param_button" @click="deletePl()">Удалить место</button>
      <button class="param_button" @click="refreshAll()">&#8635;</button>
    </div>
  </div>

  <div class="add" v-if="showAdd">
    <div class="modal_content">
      <span class="close" @click="showAdd = false">&times;</span>
      <h3>Добавить место</h3>
      <label for="name">Название</label>
      <input type="text" class="text_input" id="name" v-model="nameA"><br>
      <label for="address">Адрес</label>
      <input type="text" class="text_input" id="address" v-model="addressA"><br><br>
      <div class="tabs_container">
        <button class="tab_button" @click="selectedTypeAdd = 3">Стадионы</button>
        <button class="tab_button" @click="selectedTypeAdd = 1">Бассейны</button>
        <button class="tab_button" @click="selectedTypeAdd = 2">Спортзалы</button>
      </div>
      <div class="place_params" v-if="selectedTypeAdd === 3">
        <h4 style="margin: 1px 1px 10px 1px">Параметры стадиона</h4>
        <label for="stadium_sq">Площадь</label>
        <input type="number" min="1" id="stadium_sq" value="1" v-model="stdSqA"><br>
        <label for="stadium_places" >Количество мест</label>
        <input type="number" min="1" id="stadium_places" value="1" v-model="stdPlA"><br>
        <label for="stadium_cov">Крытый</label>
        <input type="checkbox" id="stadium_cov" v-model="stdIsCovA"><br>

      </div>
      <div class="place_params" v-if="selectedTypeAdd === 1">
        <h4 style="margin: 1px 1px 10px 1px">Параметры бассейна</h4>
        <label for="pool_lanes">Кол-во полос</label>
        <input type="number" min="1" id="pool_lanes" value="1" v-model="poolLanA"><br>
        <label for="pool_len" >Длина</label>
        <input type="number" min="1" id="pool_len" value="1" v-model="poolLenA"><br>
        <label for="pool_dep" >Глубина</label>
        <input type="number" min="1" id="pool_dep" value="1" v-model="poolDepA"><br>
      </div>
      <div class="place_params" v-if="selectedTypeAdd === 2">
        <h4 style="margin: 1px 1px 10px 1px">Параметры спортзала</h4>
        <label for="gym_sq">Площадь</label>
        <input type="number" min="1" id="gym_sq" value="1" v-model="gymSqA"><br>
      </div>
      <button class="param_button" style="margin: 10px" @click="this.createPlace()">Добавить</button>
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

.subpanel2 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 50%;
}

h3 {
  margin: 5px;
}

label {
  margin-right: 5px;
}

.tabs_container {
 margin-left: 20px;
}

.tab_button {
  background-color: white;
  border: #aaaaaa solid 2px;
  border-radius: 10px 10px 0 0;
  border-bottom: none;
  margin: 0 2px 0 2px;
  height: 25px;
}

.tab_button:hover {
  background-color: #f7c59f;
  border-color: #ff5a35;
}

.place_params {
  margin: -2px 10px;
  border: #aaaaaa solid 2px;
  border-radius: 10px;
  padding: 10px;
  height: 65%;
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