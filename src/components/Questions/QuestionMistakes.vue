<script setup lang="ts">

import { useQuizStore } from "@/stores/quizz"

const quizStore = useQuizStore();

</script>


<template>
  <div class="mistakes-wrapper">
    <button class="close-btn" @click="quizStore.showMistakes = false">
      <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 10.9163L2.29278 17.6236C2.04182 17.8745 1.72243 18 1.3346 18C0.946768 18 0.627376 17.8745 0.376425 17.6236C0.125475 17.3726 0 17.0532 0 16.6654C0 16.2776 0.125475 15.9582 0.376425 15.7072L7.08365 9L0.376425 2.29278C0.125475 2.04182 0 1.72243 0 1.3346C0 0.946768 0.125475 0.627376 0.376425 0.376425C0.627376 0.125475 0.946768 0 1.3346 0C1.72243 0 2.04182 0.125475 2.29278 0.376425L9 7.08365L15.7072 0.376425C15.9582 0.125475 16.2776 0 16.6654 0C17.0532 0 17.3726 0.125475 17.6236 0.376425C17.8745 0.627376 18 0.946768 18 1.3346C18 1.72243 17.8745 2.04182 17.6236 2.29278L10.9163 9L17.6236 15.7072C17.8745 15.9582 18 16.2776 18 16.6654C18 17.0532 17.8745 17.3726 17.6236 17.6236C17.3726 17.8745 17.0532 18 16.6654 18C16.2776 18 15.9582 17.8745 15.7072 17.6236L9 10.9163Z"
          fill="black" />
      </svg>
    </button>
    <div class="question" v-for="item, index in quizStore.mistakes" :key="index">
      <div class="question-block">
        <h4>Question:</h4>
        <p>{{ item.question }}</p>
      </div>
      <div class="question-block">
        <h4>Correct Answer:</h4>
        <p>{{ item.correctAnswer }}</p>
      </div>
      <div class="question-block">
        <h4>Your Answer:</h4>
        <p>{{ item.userAnswer }}</p>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.mistakes-wrapper {
  position: absolute;
  inset: 0;
  margin: auto;
  width: min(30rem, 99vw);
  height: min(30rem, 95vh);
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  box-shadow: 0 3px 10px hsla(0, 0%, 0%, 0.2), 0 0 5px hsla(0, 0%, 0%, 0.2);
  background-color: var(--white-color);
  border-radius: var(--b-radius);
  padding: 2rem 1.5rem;
  overflow-y: auto;


  &::-webkit-scrollbar {
    width: 0.3rem;
  }

  &::-webkit-scrollbar-track {
    width: 0.3rem;
    background-color: transparent;

  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--fg-color);
    border-radius: 0.2rem;
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 1.1rem;
    height: 1.1rem;
    border: none;
    background: none;
    transition: all 0.2s ease;

    svg {
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    &:hover {
      rotate: 180deg;
    }

    &:active {
      scale: 0.8;
      transition-duration: 0.1s;
    }
  }

  .question {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .question-block {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
    }

    &:not(:last-child)::after {
      position: absolute;
      content: "";
      bottom: -1.5rem;
      left: 0;
      width: 100%;
      height: 0.2rem;
      border-radius: var(--b-radius);
      background-color: var(--accent-color);
    }

  }
}
</style>