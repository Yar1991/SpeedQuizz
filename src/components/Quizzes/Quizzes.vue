<script setup lang="ts">

import { ref, onMounted } from "vue"
import Quiz from './Quiz.vue';
import { useQuizStore } from "@/stores/quizz"


const quizStore = useQuizStore();


</script>

<template>
  <div class="grid">
    <Quiz v-for="item, index in quizStore.searchItems" :title="item.title" :icon="item.icon" :image="item.image"
      :key="index" :index="index" :data-title="item.title" />
  </div>
</template>

<style lang="scss" scoped>
.grid {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, min(25rem, 100%));
  gap: 3rem;
  justify-content: center;
  padding-bottom: 4rem;
}
</style>