<script>
export default {

}
</script>

<template>
<div id="home" class="home_container">
  <h1>HOME PAGE</h1>
</div>
</template>

<style>
.home_container {
  background: yellow;
}

#home {
  display: none;
}

#home:target {
  display: block;
}
</style>