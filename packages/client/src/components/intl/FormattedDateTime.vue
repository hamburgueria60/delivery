<template>
  <span>{{ formatted }}</span>
</template>

<script>
import { isEmpty, pick } from 'lodash'

import Locale from './index'

export default {
  props: {
    value: { type: String, default: '', required: true },
    year: { type: String, default: '2-digit' },
    month: { type: String, default: '2-digit' },
    day: { type: String, default: '2-digit' },
    hour: { type: String, default: '2-digit' },
    minute: { type: String, default: '2-digit' },
    second: { type: String, default: '2-digit' },
  },
  data() {
    return { formatted: '' }
  },
  watch: {
    value() {
      this.format()
    },
  },
  mounted() {
    this.format()
  },
  methods: {
    format() {
      const formatter = new Intl.DateTimeFormat(
        Locale.getLocale(),
        pick(
          this,
          ['year', 'month', 'day', 'hour', 'minute', 'second'].filter(prop => !isEmpty(this[prop])),
        ),
      )
      this.formatted = formatter.format(new Date(this.value))
    },
  },
}
</script>

<style></style>
