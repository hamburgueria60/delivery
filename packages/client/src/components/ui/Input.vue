<template>
  <input
    class="input bg-transparent bn input-reset outline-0 w-100"
    type="text"
    v-bind="$attrs"
    v-on="listeners"
    @input="handleInput($event.target.value)"
  />
</template>

<script>
import { mask } from 'ke-the-mask/dist/cjs'
import { omit } from 'lodash'

export default {
  directives: { mask },
  computed: {
    listeners() {
      return omit(this.$listeners, 'input')
    },
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value)
      this.$emit('update:value', value)
    },
  },
}
</script>

<style scoped>
input {
  border-bottom: 1px solid var(--light-gray);
}
input::placeholder {
  color: var(--silver);
}
input:focus {
  border-color: #357edd;
}
</style>
