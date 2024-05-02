<script>
export default {
  methods: {
    goToSection(section) {
      window.location.hash = section;
    },
    isSectionVisible(section) {
      console.log(section)
      return window.location.hash === `#${section}`;
    }
  }
}
</script>

<template>

</template>

<style>

</style>