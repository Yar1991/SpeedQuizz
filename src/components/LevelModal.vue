<script setup lang="ts">
import { watch, ref, onUnmounted } from "vue"
import { useQuizStore } from "../stores/quizz"
import { useRouter } from "vue-router"
import { addToLocal } from "@/assets/utils/useLocal"
import axios from "axios";
import AccentButton from "./AccentButton.vue";

const modalRef = ref<HTMLDialogElement | null>(null);
const quizStore = useQuizStore();
const selectLevelRef = ref<HTMLSelectElement | null>(null);
const isLoading = ref<boolean>(false);

const router = useRouter();

const modalWatcher = watch(() => quizStore.isModalOpen, () => {
  if (quizStore.isModalOpen) {
    modalRef.value?.animate(
      [
        {
          opacity: 0,
          scale: 0.8
        },
        {
          opacity: 1,
          scale: 1
        }
      ],
      {
        duration: 300,
        delay: 200,
        easing: "ease-out",
        fill: "both"
      }
    )
    modalRef.value?.showModal()
  }
})

const closeModal = () => {
  const closeAnim = modalRef.value?.animate(
    [
      {
        opacity: 0,
        scale: 0.8
      }
    ],
    {
      duration: 200,
      easing: "ease-in",
    }
  )
  closeAnim?.addEventListener("finish", () => {
    quizStore.isModalOpen = false;
    selectLevelRef.value!.value = "--pick level--"
    modalRef.value?.close()
  })
}

const fetchItem = async () => {


  if (selectLevelRef.value && selectLevelRef.value.value === "--pick level--") {
    return;
  }
  try {
    isLoading.value = true;
    const quizUrl = `https://the-trivia-api.com/api/questions?categories=${quizStore.pickedItem}&limit=${quizStore.questionsLimit}&difficulty=${selectLevelRef.value?.value}`
    const res = await axios.get(quizUrl);
    quizStore.questions = res.data;
    quizStore.isModalOpen = false;
    isLoading.value = false;
    if (selectLevelRef.value!.value === "easy") {
      quizStore.gameTimer = 60;
    } else if (selectLevelRef.value!.value === "medium") {
      quizStore.gameTimer = 90;
    } else {
      quizStore.gameTimer = 120;
    }
    addToLocal(res.data);
    router.push(`questions/${quizStore.pickedItem}`)
  } catch (err: unknown) {
    console.log(err);

  }

}

onUnmounted(() => {
  modalWatcher();
})

</script>


<template>
  <dialog ref="modalRef" class="level-modal">
    <div class="modal-form">
      <button class="close-btn" @click="closeModal">
        <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 10.9163L2.29278 17.6236C2.04182 17.8745 1.72243 18 1.3346 18C0.946768 18 0.627376 17.8745 0.376425 17.6236C0.125475 17.3726 0 17.0532 0 16.6654C0 16.2776 0.125475 15.9582 0.376425 15.7072L7.08365 9L0.376425 2.29278C0.125475 2.04182 0 1.72243 0 1.3346C0 0.946768 0.125475 0.627376 0.376425 0.376425C0.627376 0.125475 0.946768 0 1.3346 0C1.72243 0 2.04182 0.125475 2.29278 0.376425L9 7.08365L15.7072 0.376425C15.9582 0.125475 16.2776 0 16.6654 0C17.0532 0 17.3726 0.125475 17.6236 0.376425C17.8745 0.627376 18 0.946768 18 1.3346C18 1.72243 17.8745 2.04182 17.6236 2.29278L10.9163 9L17.6236 15.7072C17.8745 15.9582 18 16.2776 18 16.6654C18 17.0532 17.8745 17.3726 17.6236 17.6236C17.3726 17.8745 17.0532 18 16.6654 18C16.2776 18 15.9582 17.8745 15.7072 17.6236L9 10.9163Z"
            fill="black" />
        </svg>
      </button>
      <h3>Level of difficulty:</h3>
      <div class="select-wrapper">
        <select ref="selectLevelRef">
          <option selected>--pick level--</option>
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
        <svg viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.12502 5.875L0.875015 2.625C0.479182 2.22917 0.390848 1.77625 0.610015 1.26625C0.829182 0.75625 1.2196 0.500833 1.78127 0.5H8.21876C8.78126 0.5 9.1721 0.755417 9.39126 1.26625C9.61043 1.77708 9.52168 2.23 9.12502 2.625L5.87501 5.875C5.75001 6 5.6146 6.09375 5.46877 6.15625C5.32293 6.21875 5.16668 6.25 5.00002 6.25C4.83335 6.25 4.6771 6.21875 4.53127 6.15625C4.38543 6.09375 4.25002 6 4.12502 5.875Z"
            fill="black" />
        </svg>
      </div>
      <AccentButton @click="fetchItem">
        {{ isLoading ? "" : "Confirm" }}
        <span v-if="isLoading" class="loader">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid">
            <g>
              <circle cx="60" cy="50" r="4" fill="#292828">
                <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1"
                  begin="-0.67s"></animate>
                <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1"
                  begin="-0.67s"></animate>
              </circle>
              <circle cx="60" cy="50" r="4" fill="#292828">
                <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1"
                  begin="-0.33s"></animate>
                <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1"
                  begin="-0.33s"></animate>
              </circle>
              <circle cx="60" cy="50" r="4" fill="#292828">
                <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="0s">
                </animate>
                <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1"
                  begin="0s"></animate>
              </circle>
            </g>
            <g transform="translate(-15 0)">
              <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#dfc7a7" transform="rotate(90 50 50)"></path>
              <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#dfc7a7">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s"
                  values="0 50 50;45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
              </path>
              <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#dfc7a7">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s"
                  values="0 50 50;-45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
              </path>
            </g>
          </svg>
        </span>
      </AccentButton>
    </div>
  </dialog>
</template>


<style lang="scss" scoped>
.level-modal {
  position: absolute;
  min-width: 100%;
  height: 100%;
  border: none;
  inset: 0;
  background-color: transparent;

  &::backdrop {
    background-color: hsla(0, 0%, 0%, 0.7);
  }


  .modal-form {
    position: absolute;
    width: min(25rem, 100%);
    height: fit-content;
    inset: 0;
    margin: auto;
    background-color: #fff;
    border-radius: var(--b-radius);
    display: flex;
    flex-direction: column;
    padding: 1.5rem 1rem;
    gap: 1.5rem;

    .close-btn {
      position: absolute;
      top: 0.7rem;
      right: 0.7rem;
      width: 1.1rem;
      height: 1.1rem;
      background: none;
      border: none;
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

    h3 {
      text-align: center;
      font-weight: 500;
    }

    .select-wrapper {
      position: relative;
      width: 80%;
      align-self: center;

      select {
        width: 100%;
        appearance: none;
        border: none;
        border-radius: var(--b-radius);
        padding: 0.5rem;
        background-color: var(--accent-light);
        color: var(--fg-color);
      }

      svg {
        position: absolute;
        top: 50%;
        right: 0.5rem;
        width: 0.8rem;
        height: 0.8rem;
        translate: 0 -50%;
        pointer-events: none;
      }
    }

    .loader {
      position: absolute;
      inset: 0;
      margin: auto;
      display: block;
      width: 100%;
      height: 100%;

      svg {
        width: 100%;
        height: 100%;
      }
    }

  }
}

.modal-enter-active {
  transition: all 0.4s ease-out;
}

.modal-leave-active {
  transition: 0.3s ease-in;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  scale: 0.8;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  scale: 1;
}
</style>