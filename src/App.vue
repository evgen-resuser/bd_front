<script setup>
import TabButton from "@/components/TabButton.vue"
</script>

<template>
  <header>
    <div class="header">
      <TabButton :name="'Спортсмены'" :link="'/#sportsman'" :icon_path="'public/icons/sportsman_icon.svg'"/>
      <TabButton :name="'Тренеры'" :link="'/#coach'" :icon_path="'public/icons/coach_icon.svg'"/>
      <TabButton :name="'Места'" :link="'/#place'" :icon_path="'public/icons/place_icon.svg'"/>
      <TabButton :name="'Соревнования'" :link="'/#competition'" :icon_path="'public/icons/trophy_icon.svg'"/>
    </div>
  </header>

  <main>



  </main>
</template>

<style>
  @import "./style/header.css";

</style>
