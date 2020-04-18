<template>
  <div class="bb b--light-gray pv2 bg-white">
    <div class="flex items-center mw8 center ph3">
      <div>
        <router-link class="link nowrap mr2" to="/" exact>
          Página inicial
        </router-link>
      </div>

      <div>
        <router-link class="link nowrap mr2" to="/orders">
          Pedidos
        </router-link>
      </div>

      <div class="ml-auto flex items-center">
        <notifications />
        <md-divider />
        <current-user />
      </div>
    </div>
  </div>
</template>

<script>
import CurrentUser from '@/components/App/CurrentUser.vue'
import Notifications from '@/components/App/Notifications.vue'

export default {
  components: {
    Notifications,
    CurrentUser,
  },
}
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;

  &:not(.router-link-active) {
    color: var(--moon-gray);
  }

  &:hover,
  &:focus {
    color: var(--silver);
  }
}

.router-link-active {
  color: var(--blue);

  &:hover,
  &:focus {
    color: var(--dark-blue);
  }
}
</style>
