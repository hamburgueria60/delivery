<template>
  <span>{{ formatted }}</span>
</template>

<script>
export default {
  props: {
    value: { type: String, default: '' },
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
      this.formatted = this.value.replace(/\D/g, '').replace(/(\d{2})(\d{5})?(\d{4})?/g, (txt, f, s, t) => {
        return `(${f}) ${s}-${t}`
      })
    },
  },
}
</script>

<style></style>
