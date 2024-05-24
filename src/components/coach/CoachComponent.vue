<script>
import CoachPanel from "@/components/coach/CoachPanel.vue";
export default {
  props: ['server'],
  components: {CoachPanel},
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
  <div id="coach" class="coach_container">
    <h2>Тренеры</h2>
    <CoachPanel :server="server"/>
  </div>
</template>

<style>
.coach_container {
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

#coach {
  display: none;
}

#coach:target {
  display: block;
}
</style>