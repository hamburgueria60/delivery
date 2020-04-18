<template>
  <div class="layout-with-toolbar">
    <main-toolbar />
    <router-view />
  </div>
</template>

<script>
import MainToolbar from '@/components/App/MainToolbar.vue'

export default {
  components: {
    MainToolbar,
  },
}
</script>

<style></style>
