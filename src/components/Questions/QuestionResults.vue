<script setup lang="ts">

import { useQuizStore } from "@/stores/quizz"
import { useRouter } from "vue-router"

import AccentButton from '../AccentButton.vue';
import QuestionMistakes from "./QuestionMistakes.vue";


const quizStore = useQuizStore();
const router = useRouter();

const goHome = (): void => {

  quizStore.mistakes = [];
  quizStore.completedQuestionsCount = 1;
  router.push("/");

}
</script>


<template>
  <div class="wrapper">
    <h3>{{ quizStore.gameTimer > 0 ? "Completed all questions!" : "Time is up!" }}</h3>
    <p>Correct Answers: {{ `${quizStore.completedQuestionsCount -
      quizStore.mistakes.length}/${quizStore.questionsLimit}` }}</p>
    <div class="btns">
      <AccentButton @click="goHome">
        Go Back
      </AccentButton>
      <AccentButton v-if="quizStore.mistakes.length > 0" @click="quizStore.showMistakes = true">
        Mistakes
      </AccentButton>
    </div>
    <Transition name="mistakes" mode="out-in">
      <QuestionMistakes v-if="quizStore.showMistakes" />
    </Transition>
  </div>
</template>


<style lang="scss" scoped>
.wrapper {
  width: min(35rem, 95vw);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem 1rem;
  background-color: var(--white-color);
  border-radius: var(--b-radius);

  h3 {
    font-weight: 500;
    font-size: 1.2rem;
  }

  p {
    font-size: 1.1rem;
  }

  .btns {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
}

.mistakes-enter-active {
  transition: all 0.4s ease-out;
}

.mistakes-leave-active {
  transition: all 0.3s ease-in;
}

.mistakes-enter-to,
.mistakes-leave-from {
  opacity: 1;
  translate: 0;
}

.mistakes-enter-from,
.mistakes-leave-to {
  opacity: 0;
  translate: 0 10rem;
}
</style>