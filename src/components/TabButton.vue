<script>
export default {
  props: ['name', 'link', 'icon_path'],
  methods: {
    goToLink() {
      window.location.href = this.link
    }
  },
  head() {
    return {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap' }
      ]
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
  background: rgba(255, 255, 255, 0.26);
  border-radius: 5px;
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
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  font-weight: 100;
  font-style: normal;
}

.icon {
  margin: 0 5px 0 0;
  filter: invert();
}

.header_button:hover {
  background: #669bbc;
}
</style>