<script setup lang="ts">

import { RouterView, useRouter } from 'vue-router'
import { useQuizStore } from "@/stores/quizz"

const router = useRouter();
const quizStore = useQuizStore();

const goHome = (): void => {

  quizStore.mistakes = [];
  quizStore.completedQuestionsCount = 1;
  router.push("/");

}

</script>


<template>
  <main id="main">
    <div class="container">
      <button type="button" title="home" class="logo-btn" @click="goHome">
        <h1 class="logo">SPEEDQUIZZ</h1>
      </button>
      <RouterView v-slot="{ Component }">
        <Transition mode="out-in" name="page">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </main>
</template>

<style lang="scss" scoped>
#main {
  height: 100%;
  background-color: var(--bg-color);
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    width: 0.5rem;
    background-color: transparent
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--fg-color);
    border-radius: 0.2rem;
  }

  .container {
    height: 100%;
    width: 75%;
    margin: auto;
    padding: 2rem 0;
    display: flex;
    flex-direction: column;

    @media (max-width: 500px) {
      width: 95%;
    }

    .logo-btn {
      border: none;
      background: none;
      align-self: center;

      .logo {
        font-family: var(--fancy-font);
        font-size: 2.6rem;
        font-weight: 400;
        color: var(--fg-color);
      }

    }
  }
}

.page-enter-active {
  transition: all 0.6s ease-out;
}

.page-leave-active {
  transition: all 0.3s ease-in;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  scale: 0.8;
  transform-origin: center center;
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  scale: 1;
  transform-origin: center center;
}
</style>
