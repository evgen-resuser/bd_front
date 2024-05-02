<script>

export default {
  props: ['server']
}
</script>

<template>
<div id="sportsman" class="sportsman_container">
<h1>SPORTSMAN</h1>
</div>
</template>

<style>
.sportsman_container {
  background: green;
}

#sportsman {
  display: none;
}

#sportsman:target {
  display: block;
}
</style>