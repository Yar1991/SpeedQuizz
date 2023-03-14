
<template>
  <button type="button" class="accent-button">
    <slot />
  </button>
</template>


<style lang="scss" scoped>
.accent-button {
  position: relative;
  width: 8rem;
  height: 2.7rem;
  padding-block: 0.6rem;
  background-color: var(--bg-color);
  font-weight: 500;
  color: var(--fg-color);
  border: none;
  border-radius: var(--b-radius);
  box-shadow: 4px 4px var(--fg-color);
  align-self: center;
  transition: box-shadow 0.2s ease, translate 0.2s ease;

  &:hover {
    box-shadow: 5px 5px var(--fg-color);
    translate: -0.1rem;
  }

  &:active {
    box-shadow: 1px 1px var(--fg-color);
    translate: 0.1rem;
    transition: box-shadow 0.1s ease, translate 0.1s ease;
  }
}
</style>