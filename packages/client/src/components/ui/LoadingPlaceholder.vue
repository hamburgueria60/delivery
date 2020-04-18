<template>
  <div class="animation">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 468px 0;
  }
}

.animation {
  animation-duration: 1.25s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: darkgray;
  background: linear-gradient(to right, #eeeeee 10%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  color: transparent;
  position: relative;
  user-select: none;

  &:before {
    content: '&nbsp;';
  }
}
</style>
