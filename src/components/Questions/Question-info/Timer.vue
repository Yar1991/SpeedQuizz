<script setup lang="ts">

import { useQuizStore } from "@/stores/quizz"
import { computed, onMounted, onUnmounted, ref } from "vue";

const quizStore = useQuizStore();
const interval = ref<NodeJS.Timeout>();

const getTime = computed(() => {
  return `0${Math.floor(quizStore.gameTimer / 60)}:${quizStore.gameTimer % 60 < 10 ? '0' + quizStore.gameTimer % 60 : quizStore.gameTimer % 60}`;
})


onMounted(() => {
  interval.value = setInterval(() => {
    if (quizStore.gameTimer > 0 && quizStore.completedQuestionsCount < quizStore.questionsLimit) {
      quizStore.gameTimer--;
    } else {
      return;
    }
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval.value);
})

</script>


<template>
  <div class="timer-container">
    <h4>Time Left:</h4>
    <span class="time">{{ getTime }}</span>
  </div>
</template>


<style scoped lang="scss">
.timer-container {
  display: flex;
  align-items: center;
  gap: 1.5rem;

  h4 {
    font-weight: 500;
  }

  .time {
    display: inline-block;
    background-color: var(--white-color);
    border-radius: var(--b-radius);
    padding: 0.3rem 0.5rem;
    font-size: 1rem;
  }
}
</style>