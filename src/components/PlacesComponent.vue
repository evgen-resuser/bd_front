<script>

export default {
  props: ['server']
}
</script>

<template>
  <div id="place" class="place_container">
    <h1>PLACE</h1>
  </div>
</template>

<style>
.place_container {
  background: orange;
}

#place {
  display: none;
}

#place:target {
  display: block;
}
</style>