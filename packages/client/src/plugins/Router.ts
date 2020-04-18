import _Vue from 'vue'

export default {
  install(Vue: typeof _Vue) {
    Vue.prototype.$push = function({ name }: { name: string }) {
      if (this.$route.name !== name) {
        return this.$router.push({ name })
      }
    }
  },
}
