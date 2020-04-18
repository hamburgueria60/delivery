<template>
  <span v-tooltip="tooltip">{{ formatted }}</span>
</template>

<script>
import RelativeTimeFormat from 'relative-time-format'

import ActionScheduler from './ActionScheduler'
import Locale from './index'

export default {
  props: {
    value: { type: String, default: new Date().toISOString() },
    options: { type: Object, default: () => ({ style: 'long' }) },
  },
  data() {
    return {
      formatted: '',
      tooltip: '',
    }
  },
  watch: {
    value() {
      this.format()
      this.applyTooltip()
    },
  },
  mounted() {
    this.format()
    this.applyTooltip()
    this.stop = ActionScheduler.schedule(() => this.format())
  },
  beforeDestroy() {
    this.stop()
  },
  methods: {
    timeUnit(rawDiff) {
      const ONE_SECOND = 1
      const ONE_MINUTE = ONE_SECOND * 60
      const ONE_HOUR = ONE_MINUTE * 60
      const ONE_DAY = ONE_HOUR * 24

      const when = rawDiff < 0 ? 'past' : rawDiff > 0 ? 'future' : 'now'
      const absoluteDiff = Math.abs(rawDiff)
      const units = [
        ['day', ONE_DAY],
        ['hour', ONE_HOUR],
        ['minute', ONE_MINUTE],
        ['second', ONE_SECOND],
      ]

      return units.reduce((timeUnit, [unit, threshold]) => {
        if (!timeUnit && (unit === 'second' || absoluteDiff / threshold > 1)) {
          return {
            unit,
            time: Math.floor(absoluteDiff / threshold),
            when,
          }
        }
        return timeUnit
      }, undefined)
    },
    diff() {
      const ONE_SECOND_IN_MILLISECONDS = 1000
      const unixTime = new Date(this.value).getTime()

      if (!unixTime) return

      const now = new Date().getTime()
      const difference = unixTime / ONE_SECOND_IN_MILLISECONDS - now / ONE_SECOND_IN_MILLISECONDS

      return this.timeUnit(difference)
    },
    format() {
      const formatter = new RelativeTimeFormat(Locale.getLocale(), {
        ...this.options,
      })

      const diff = this.diff()
      const formatted = formatter.format(diff.time * (diff.when === 'past' ? -1 : 1), diff.unit)

      if (formatted !== this.formatted) {
        this.formatted = formatted
        this.$emit('change', this.formatted, diff)
      }
    },
    applyTooltip() {
      this.tooltip = new Intl.DateTimeFormat(Locale.getLocale(), {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format(new Date(this.value))
    },
  },
}
</script>

<style></style>
