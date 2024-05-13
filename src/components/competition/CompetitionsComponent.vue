<script>

export default {
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
  <div id="competition" class="competition_container">
    <h2>COMPETITION</h2>
  </div>
</template>

<style>

.competition_container {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  border: 2px solid #ff5a35;
  margin: 20px 7% 10px 7%;
  padding: 0 15px 0 15px;
  height: v-bind(pageHeight);
  max-height: v-bind(pageHeight);
  overflow: hidden;
}

h2 {
  margin: 0;
}

#competition {
  display: none;
}

#competition:target {
  display: block;
}
</style>