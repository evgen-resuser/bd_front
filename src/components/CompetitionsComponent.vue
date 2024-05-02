<script>

export default {
  props: ['server']
}
</script>

<template>
  <div id="competition" class="competition_container">
    <h1>COMPETITION</h1>
  </div>
</template>

<style>
.competition_container {
  background: indianred;
}

#competition {
  display: none;
}

#competition:target {
  display: block;
}
</style>