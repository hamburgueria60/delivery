<template>
  <textarea
    ref="textarea"
    rows="1"
    class="bb b--light-gray"
    v-bind="$attrs"
    v-on="listeners"
    @input="emit('input', $event.target.value)"
  ></textarea>
</template>

<script>
import autosize from 'autosize'
import { omit } from 'lodash'

import makeDebounced from '@/utils/makeDebounced'

export default {
  data() {
    return {}
  },
  computed: {
    listeners() {
      return omit(this.$listeners, 'input')
    },
  },
  watch: {
    value() {
      autosize.update(this.$refs.textarea)
    },
  },
  mounted() {
    this.$refs.textarea.style.display = 'block'
    autosize(this.$refs.textarea)
  },
  beforeDestroy() {
    autosize.destroy(this.$refs.textarea)
  },
  methods: {
    emit: makeDebounced('$emit', 300),
  },
}
</script>

<style scoped>
textarea {
  display: none;
  border: none;
  border-bottom: 1px solid var(--light-gray);
  resize: none;
  overflow: hidden;
}
textarea::placeholder {
  color: var(--silver);
}
textarea:focus {
  border-color: #357edd;
}
</style>
