<template>
  <label class="flex flex-row pb3 w-100">
    <div class="absolute self-center pl3" :class="{ 'moon-gray': !focused, 'dark-gray': focused }">
      <slot name="icon" />
    </div>

    <input
      :class="[$style.input, { 'bg-light-gray': !focused, 'bg-moon-gray': focused }]"
      class="pa3 bn br2 w-100"
      @focus="focused = true"
      @blur="focused = false"
      v-bind="$attrs"
      v-on="$listeners"
      @input="$emit('update:value', $event.target.value)"
    />
  </label>
</template>

<script>
export default {
  data() {
    return {
      focused: false,
    }
  },
}
</script>

<style module>
.input {
  padding-left: 3.5rem;
}
</style>
