<script>
export default {
  props: ['name', 'link', 'icon_path'],
  methods: {
    goToLink() {
      window.location.href = this.link
    }
  }
}
</script>

<template>
<div class="header_button" @click="goToLink">
  <img class="icon" :src="icon_path" alt=""/><span class="name">{{name}}</span>
</div>
</template>

<style>
.header_button {
  margin: 5px;
  padding: 10px 25px 10px 25px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  cursor: pointer;
  width: 120px;
  word-wrap: break-word;
  overflow-wrap: break-word;

  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.name {
  font-family: "Jost", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}

.icon {
  margin: 0 10px 0 0;
  filter: invert();
}

.header_button:hover {
  background: rgba(102, 155, 188, 0.77);
}
</style>