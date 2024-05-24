<script>

import {addClub, addOrg, addSport, clubCount, orgCount} from "@/components/extra/OtherUtils.js";

export default {
  props: ['server'],
  data() {
    return {
      headerHeight: 0,
      pageHeight: 0,

      organizeCount: [],
      orgPeriodS: null,
      orgPeriodE: null,

      clubCount: [],
      clubPeriodS: null,
      clubPeriodE: null,

      clubNameA: null,
      sportNameA: null,
      orgNameA: null,

    }
  },
  mounted() {
    const anotherBlock = document.getElementById('header');
    this.headerHeight = anotherBlock.offsetHeight;
    this.calcHeight()
  },
  methods: {
    calcHeight() {
      this.pageHeight = `${document.documentElement.scrollHeight - 2 * this.headerHeight}px`
    },
    async getOrgCount() {
      if (this.orgPeriodS === null || this.orgPeriodE === null) return
      this.organizeCount = await orgCount(this.server, this.orgPeriodS, this.orgPeriodE);
    },
    async getClubCount() {
      if (this.clubPeriodS === null || this.clubPeriodE === null) return
      this.clubCount = await clubCount(this.server, this.clubPeriodS, this.clubPeriodE)
    },
    async addClub(){
      if (this.clubNameA === null) return
      addClub(this.server, this.clubNameA)
    },
    async addOrg() {
      if (this.orgNameA === null) return
      addOrg(this.server, this.orgNameA)
    },
    async addSport() {
      if (this.sportNameA === null) return
      addSport(this.server, this.sportNameA)
    }
  }
}
</script>

<template>
  <div id="extra" class="extra_container">
    <h2>Дополнительно</h2>
    <div class="extra_panel">
      <div class="subpanel">
        <div class="about2">
          <h4>Список организаторов соревнований и число проведенных ими соревнований в
            течение определенного периода времени
          </h4>
          <div class="viewport">
            <ul v-if="this.organizeCount !== null">
              <li v-for="o in organizeCount">
                {{o.organize.name}} - {{o.count}}
              </li>
            </ul>
          </div>
          <div class="params">
            <label for="orgPeriodS">c </label>
            <input type="date" id="orgPeriodS" v-model="orgPeriodS">
            <label for="orgPeriodE"> по </label>
            <input type="date" id="orgPeriodE" v-model="orgPeriodE">
            <button class="param_button" @click="this.getOrgCount()">Показать</button>
          </div>
        </div>
        <div class="about2">
          <h4>Перечень спортивных клубов и число спортсменов этих клубов, участвовавших в спортивных соревнованиях
          </h4>
          <div class="viewport">
            <ul v-if="this.clubCount !== null">
              <li v-for="o in clubCount">
                {{o.name}} - {{o.number_of_sportsmen}}
              </li>
            </ul>
          </div>
          <div class="params">
            <label for="clubPeriodS">c </label>
            <input type="date" id="clubPeriodS" v-model="clubPeriodS">
            <label for="clubPeriodE"> по </label>
            <input type="date" id="clubPeriodE" v-model="clubPeriodE">
            <button class="param_button" @click="this.getClubCount()">Показать</button>
          </div>
        </div>
      </div>
      <div class="subpanel">
        <div class="about2">
          <h3>Управление клубами</h3>
          <label for="clubNameA">Название </label>
          <input type="text" v-model="clubNameA" class="text_input">
          <button class="param_button" @click="addClub()">Добавить</button>
        </div>
        <div class="about2">
          <h3>Управление спортом</h3>
          <label for="clubNameA">Название </label>
          <input type="text" v-model="sportNameA" class="text_input">
          <button class="param_button" @click="addSport()">Добавить</button>
        </div>
        <div class="about2">
          <h3>Управление организаторами</h3>
          <label for="clubNameA">Название </label>
          <input type="text" v-model="orgNameA" class="text_input">
          <button class="param_button" @click="addOrg()">Добавить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "/public/styles/sider.css";
@import "/public/styles/page.css";

.extra_container {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  border: 2px solid #ff5a35;
  margin: 20px 7% 10px 7%;
  padding: 0 15px 0 15px;
  height: v-bind(pageHeight);
  max-height: v-bind(pageHeight);
  overflow: auto;
}

h2 {
  margin: 0;
}

#extra {
  display: none;
}

#extra:target {
  display: block;
}

.extra_panel {
  height: 95%;
}
</style>