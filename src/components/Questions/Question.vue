<script setup lang="ts">

import { computed, ref } from "vue"
import { useQuizStore } from "@/stores/quizz"
import { getFromLocal } from "@/assets/utils/useLocal"

import Progress from './Question-info/Progress.vue';
import Timer from './Question-info/Timer.vue';
import QuestionResults from "./QuestionResults.vue";


interface QuestionInterface {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
  tags: string[];
  type: string;
  difficulty: string;
  regions: [];
  isNiche: boolean;
}

interface MistakeInterface {
  question: string;
  correctAnswer: string;
  userAnswer: string;
}

const quizStore = useQuizStore();

const allQuestions = ref<QuestionInterface[]>(getFromLocal());
const currentQuestion = computed(() => {
  if (quizStore.completedQuestionsCount < quizStore.questionsLimit) {
    return allQuestions.value[quizStore.completedQuestionsCount]
  }
})
const currentAnswers = computed(() => {
  if (quizStore.completedQuestionsCount < quizStore.questionsLimit) {
    const all = [...allQuestions.value![quizStore.completedQuestionsCount].incorrectAnswers];
    const randomIndex = Math.floor(Math.random() * all.length);
    all.splice(randomIndex, 0, allQuestions.value![quizStore.completedQuestionsCount].correctAnswer)
    return all;
  }
})

const chooseAnswer = (answer: string) => {
  if (answer !== currentQuestion.value!.correctAnswer) {
    quizStore.mistakes = [...quizStore.mistakes as MistakeInterface[], {
      question: currentQuestion.value!.question,
      correctAnswer: currentQuestion.value!.correctAnswer,
      userAnswer: answer
    }]
  }
  quizStore.completedQuestionsCount++;
}

</script>


<template>
  <div class="question">
    <Transition name="item" mode="out-in">
      <div v-if="quizStore.completedQuestionsCount < quizStore.questionsLimit && quizStore.gameTimer > 0" class="wrapper"
        :key="quizStore.completedQuestionsCount">
        <h2>{{ currentQuestion?.question }}</h2>
        <div class="answers">
          <button v-for="answer, index in currentAnswers" type="button" @click="chooseAnswer(answer)" :key="index">{{
            answer
          }}</button>
        </div>
      </div>
      <QuestionResults v-else />
    </Transition>
    <div class="info">
      <Progress />
      <Timer />
    </div>
  </div>
</template>


<style scoped lang="scss">
.question {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
    margin-bottom: 3rem;


    h2 {
      font-weight: 500;
      font-size: 1.8rem;
      margin-bottom: 1rem;
      text-align: center;
    }

    .answers {
      width: min(40rem, 95vw);
      display: flex;
      flex-direction: column;
      gap: 2rem;

      button {
        --shadow: 4px;
        --move: 0rem;
        width: 100%;
        border: none;
        background-color: var(--accent-light);
        border-radius: var(--b-radius);
        padding: 0.6rem;
        font-weight: 500;
        font-size: 1.1rem;
        color: var(--fg-color);
        box-shadow: var(--shadow) var(--shadow) 0 var(--fg-color);
        translate: var(--move);
        transition: box-shadow 0.2s ease, translate 0.2s ease;


        &:hover {
          --shadow: 5px;
          --move: -0.2rem;
        }

        &:active {
          --shadow: 1px;
          --move: 0.2rem;
          transition: box-shadow 0.1s ease, translate 0.1s ease;
        }
      }
    }


  }

  .info {
    width: min(40rem, 95vw);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 600px) {
      justify-content: center;
      gap: 2rem;
      margin-bottom: 3rem;
    }
  }

}

.item-move,
.item-enter-active {
  transition: all 0.6s ease-out;
}

.item-leave-active {
  transition: all 0.3s ease-in;
}

.item-enter-from {
  opacity: 0;
  translate: 20rem 0;
}

.item-leave-to {
  opacity: 0;
  translate: -20rem 0;
}

.item-enter-to,
.item-leave-from {
  opacity: 1;
  translate: 0;
}
</style>