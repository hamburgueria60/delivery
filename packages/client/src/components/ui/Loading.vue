<template>
  <div class="spinner"></div>
</template>

<script>
export default {}
</script>

<style scoped>
.spinner {
  position: relative;
}
.spinner:before {
  content: '';
  position: relative;
  display: block;
}
.spinner:before {
  animation: spinner 2s cubic-bezier(0.75, 0, 0.5, 1) infinite normal;
  width: 1rem;
  height: 1rem;
  background-color: var(--blue);
}

@keyframes spinner {
  50% {
    border-radius: 50%;
    transform: scale(0.5) rotate(360deg);
  }
  100% {
    transform: scale(1) rotate(720deg);
  }
}
@keyframes shadow {
  50% {
    transform: scale(0.5);
    background-color: rgba(#000, 0.1);
  }
}
</style>
