<script setup lang="ts">

import { useQuizStore } from "@/stores/quizz"


const { title, icon, image, index } = defineProps<{
  title: string,
  icon: string,
  image: string,
  index: number
}>();

const quizStore = useQuizStore();

const pickItem = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement;
  const targetTitle: string = target.dataset.title as string;
  quizStore.pickedItem = targetTitle;
  quizStore.isModalOpen = true;
}

</script>

<template>
  <div class="wrapper" @click="pickItem">
    <div class="item">
      <div class="img-box">
        <img :src="image" :alt="title">
      </div>
      <div class="info-box">
        <h3>{{ title.replace("_and_", " & ") }}</h3>
        <img :src="icon" :alt="title">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  animation: anim-item 0.5s ease both;
  animation-delay: calc(0.3s * v-bind(index));

  @keyframes anim-item {
    from {
      opacity: 0;
      translate: 0 5rem;
    }

    to {
      opacity: 1;
      translate: 0rem;
    }
  }

  .item {
    --shadow: 6px;
    --move: 0rem;
    background-color: var(--white-color);
    max-width: 25rem;
    height: 20rem;
    display: flex;
    flex-direction: column;
    border-radius: var(--b-radius);
    box-shadow: var(--shadow) var(--shadow) 0 var(--fg-color);
    translate: var(--move);
    overflow: hidden;
    transition: box-shadow 0.3s ease, translate 0.3s ease;


    &:hover {
      --shadow: 9px;
      --move: -0.3rem;
    }

    &:active {
      --shadow: 1px;
      --move: 0.3rem;
      transition: box-shadow 0.1s ease, translate 0.1s ease;
    }

    &:active {
      transition: box-shadow 0.1s ease, translate 0.1s ease;
    }

    .img-box {
      height: 85%;
      cursor: pointer;
      padding: 1rem;
      background-color: var(--accent-medium);
      overflow: hidden;

      img {
        height: 100%;
        width: 100%;
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
        aspect-ratio: 1/1;
      }
    }

    .info-box {
      height: 15%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-inline: 1rem;

      h3 {
        font-weight: 400;
        font-size: 1.1rem;
      }

      img {
        width: 2rem;
        height: 2rem;
      }
    }
  }

}
</style>