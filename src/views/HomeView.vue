<script setup lang="ts">
import { onMounted } from "vue"

import Search from '@/components/Search.vue';
import Quizzes from "@/components/Quizzes/Quizzes.vue";
import LevelModal from '@/components/LevelModal.vue';

import { getItems } from "@/firebase/config"
import { useQuizStore } from "@/stores/quizz"

const quizStore = useQuizStore();

interface ItemInterface {
  title: string;
  icon: string;
  image: string;
}


onMounted(async () => {


  const res = await getItems();
  quizStore.items = [...res as ItemInterface[]]
})

</script>


<template>
  <section id="home-section">
    <Search />
    <Transition name="fade">
      <Quizzes v-if="quizStore.searchItems.length" />
      <div v-else>
        <span class="loader"></span>
      </div>
    </Transition>
    <Teleport to="#app">
      <LevelModal />
    </Teleport>
  </section>
</template>


<style lang="scss" scoped>
#home-section {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.loader {
  box-sizing: border-box;
  display: inline-block;
  width: 4rem;
  height: 6.1rem;
  border-top: 5px solid var(--fg-color);
  border-bottom: 5px solid var(--fg-color);
  position: relative;
  margin: auto;
  top: 100%;
  background: linear-gradient(var(--accent-color) 30px, transparent 0) no-repeat;
  background-size: 2px 40px;
  background-position: 50% 0px;
  animation: spinx 5s linear infinite;
}

.loader:before,
.loader:after {
  content: "";
  width: 3rem;
  left: 50%;
  height: 2.7rem;
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0 0 20px 20px;
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: 0 0px;
  animation: lqt 5s linear infinite;
}

.loader:after {
  top: auto;
  bottom: 0;
  border-radius: 20px 20px 0 0;
  animation: lqb 5s linear infinite;
}

@keyframes lqt {

  0%,
  100% {
    background-image: linear-gradient(var(--accent-color) 40px, transparent 0);
    background-position: 0% 0px;
  }

  50% {
    background-image: linear-gradient(var(--accent-color) 40px, transparent 0);
    background-position: 0% 40px;
  }

  50.1% {
    background-image: linear-gradient(var(--accent-color) 40px, transparent 0);
    background-position: 0% -40px;
  }
}

@keyframes lqb {
  0% {
    background-image: linear-gradient(var(--accent-color) 40px, transparent 0);
    background-position: 0 40px;
  }

  100% {
    background-image: linear-gradient(var(--accent-color) 40px, transparent 0);
    background-position: 0 -40px;
  }
}

@keyframes spinx {

  0%,
  49% {
    transform: rotate(0deg);
    background-position: 50% 36px;
  }

  51%,
  98% {
    transform: rotate(180deg);
    background-position: 50% 4px;
  }

  100% {
    transform: rotate(360deg);
    background-position: 50% 36px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>