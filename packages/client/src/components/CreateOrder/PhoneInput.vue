<template>
  <div class="flex flex-column">
    <input
      v-model="formattedPhone"
      v-mask="'(##) #####-####'"
      class="input bg-transparent bn input-reset outline-0 w-100"
      type="text"
      v-bind="$attrs"
      v-on="listeners"
      @input="formatPhone($event.target.value)"
    />
  </div>
</template>

<script>
import { omit } from 'lodash'
import { facade as mask } from 'vue-input-facade'

import { NUMBER_WITH_DDD_LENGTH } from '@/constants'
import makeDebounced from '@/utils/makeDebounced'
import { getRawPhone } from '@/utils/phone'

export default {
  directives: { mask },
  props: {
    value: { type: String, default: '' },
  },
  data() {
    return {
      formattedPhone: this.value,
    }
  },
  computed: {
    listeners() {
      return omit(this.$listeners, 'input')
    },
  },
  methods: {
    emit: makeDebounced('$emit', 300),
    formatPhone(phone) {
      const rawPhone = getRawPhone(phone)
      this.formattedPhone = phone

      if (rawPhone.length !== NUMBER_WITH_DDD_LENGTH) {
        this.emit('update:value', '')
      } else {
        this.emit('update:value', rawPhone)
      }
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
