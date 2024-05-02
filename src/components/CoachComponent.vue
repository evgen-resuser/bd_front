<script>

export default {
  props: ['server']
}
</script>

<template>
  <div id="coach" class="coach_container">
    <h1>COACH</h1>
  </div>
</template>

<style>
.coach_container {
  background: cornflowerblue;
}

#coach {
  display: none;
}

#coach:target {
  display: block;
}
</style>