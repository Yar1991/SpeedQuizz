<script setup lang="ts">

import { useQuizStore } from "@/stores/quizz"

const quizStore = useQuizStore();

</script>


<template>
  <div class="progress-info">
    <h4>Questions: {{ quizStore.completedQuestionsCount }}/10</h4>
    <div class="progress-bar">
      <span v-for="i in quizStore.completedQuestionsCount" class="line" :key="i" />
    </div>
  </div>
</template>


<style scoped lang="scss">
.progress-info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;

  h4 {
    font-weight: 500;
  }

  .progress-bar {
    background-color: var(--white-color);
    border-radius: var(--b-radius);
    padding: 0.3rem;
    width: min(13rem, 60vw);
    height: 2rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;

    .line {
      display: inline-block;
      height: 100%;
      width: 1rem;
      background-color: var(--accent-color);
      border-radius: var(--b-radius);
    }
  }
}
</style>