<script>
import PlacePanel from "@/components/places/PlacePanel.vue";

export default {
  components: {PlacePanel},
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
  <div id="place" class="place_container">
    <h2>Места проведения</h2>
    <PlacePanel :server="this.server"/>
  </div>
</template>

<style>

.place_container {
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

#place {
  display: none;
}

#place:target {
  display: block;
}
</style>