<script setup lang="ts">

</script>


<template>
  <div class="notfound-box">
    <h1>404</h1>
    <p>Page not found :(</p>
  </div>
</template>


<style lang="scss" scoped>
.notfound-box {
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding-top: 4rem;
  overflow: hidden;

  h1 {
    font-family: var(--fancy-font);
    font-size: min(15vw + 3rem, 14rem);
    color: hsl(34, 30%, 35%);
  }

  p {
    font-size: min(2vw + 1rem, 2.2rem);
    text-align: center;
  }
}
</style>