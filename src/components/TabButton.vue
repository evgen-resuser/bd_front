<script>
export default {
  props: ['name', 'link']
}
</script>

<template>
<div class="header_button">
  <a :href=link>{{name}}</a>
</div>
</template>

<style>
.header_button {
  margin: 5px;
  padding: 10px 25px 10px 25px;
  background: rgba(255, 255, 255, 0.26);
  border-radius: 5px;
  cursor: pointer;
}

a {
  text-decoration: none;
}

.header_button:hover {
  background: #669bbc;
}
</style>