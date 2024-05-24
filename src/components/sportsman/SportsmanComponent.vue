<script>

import SportsmanPanel from "@/components/sportsman/SportsmanPanel.vue";

export default {
  components: {SportsmanPanel},
  props: ['server'],
  data() {
    return {
      headerHeight: 0,
      pageHeight: 0
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
    }
  }
}
</script>

<template>
<div id="sportsman" class="sportsman_container">
  <h2>Спортсмены</h2>
  <SportsmanPanel :server="server"/>
</div>
</template>

<style>
.sportsman_container {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  border: 2px solid #ff5a35;
  margin: 20px 7% 10px 7%;
  padding: 0 15px 0 15px;
  height: v-bind(pageHeight);
  overflow: hidden;
}

h2 {
  margin: 0;
}

#sportsman {
  display: none;
}

#sportsman:target {
  display: block;
}
</style>