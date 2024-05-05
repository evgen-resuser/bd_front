<script>
export default {
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
<div id="home" class="home_container">
  <h1>HOME PAGE</h1>
</div>
</template>

<style>
.home_container {
  //background: white;
  //border-radius: 10px;
  //border: 2px solid #ff5a35;
  //margin: 20px 5% 10px 5%;
  //padding: 0 15px 0 15px;
  //height: v-bind(pageHeight)
}

#home {
  display: none;
}

#home:target {
  display: block;
}
</style>