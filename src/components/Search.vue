<script setup lang="ts">

import { useQuizStore } from "@/stores/quizz"

const quizStore = useQuizStore();
</script>



<template>
  <div class="input-box">
    <label for="search">Search:</label>
    <input v-model="quizStore.searchInput" type="search" name="search" id="search" maxlength="50"
      placeholder="e.g. history...">
  </div>
</template>

<style lang="scss" scoped>
.input-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 100%;
  margin-top: 2rem;
  margin-bottom: 4rem;

  label {
    font-weight: 500;
  }

  input {
    border: none;
    border-radius: var(--b-radius);
    padding: 0.5rem;
    width: 25rem;
  }
}
</style>
