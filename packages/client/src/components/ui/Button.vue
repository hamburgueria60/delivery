<template>
  <button class="button-reset pointer br2 pa0 ph2 non-selectable" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
}
</script>

<style lang="scss" scoped>
button {
  --button-color: var(--blue);
  --button-dark-color: var(--dark-blue);
  --button-color-constrast: var(--white);

  background: transparent;
  border: 1px solid transparent;
  min-height: 2rem;

  &:focus-visible {
    box-shadow: 0 0 6px 0px var(--button-dark-color);
  }

  &[disabled] {
    cursor: default;
  }
}

button[flat] {
  min-width: auto;
}

button[filled] {
  background: var(--button-color);
  color: var(--button-color-constrast);

  &:hover {
    background: var(--button-dark-color);
    color: var(--button-color-constrast);
  }

  &[disabled] {
    &,
    &:hover {
      background-color: var(--moon-gray);
    }
  }
}

button[outlined] {
  border: 1px solid var(--button-color);
  color: var(--button-color);

  &.pressed {
    --button-color: var(--dark-blue);
    --button-dark-color: var(--dark-blue);
    --button-color-constrast: var(--white);
  }

  &:hover {
    border: 1px solid var(--button-dark-color);
    color: var(--button-dark-color);
  }

  &[disabled] {
    &,
    &:hover {
      color: var(--moon-gray);
      border-color: var(--moon-gray);
    }
  }
}

.danger {
  --button-color: var(--red);
  --button-dark-color: var(--dark-red);
  --button-color-constrast: var(--white);
}
</style>
