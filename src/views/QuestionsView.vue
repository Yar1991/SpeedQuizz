<script setup lang="ts">

import Question from '@/components/Questions/Question.vue';

</script>


<template>
  <article class="questions-container">
    <Question />
  </article>
</template>


<style lang="scss" scoped>
.questions-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
}
</style>


