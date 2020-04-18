<template>
  <div class="login gradient flex items-center justify-center">
    <div class="form br2 flex-l flex-row-reverse-l shadow-2-l">
      <div class="right flex items-center justify-center w-40-l">
        <img class="logo" :src="logo" />
      </div>

      <form class="flex flex-column w-60-l" @submit="login">
        <div class="left pa4">
          <md-input name="id" placeholder="Usuário" :value.sync="user">
            <template #icon>
              <account-icon />
            </template>
          </md-input>

          <md-input name="password" placeholder="Senha" type="password" :value.sync="password">
            <template #icon>
              <password-icon />
            </template>
          </md-input>

          <div class="flex items-center">
            <md-loading-button :loading="loading" class="sign-in w-100 pa3 w-20-l pa2-l" filled @click="login">
              Entrar
            </md-loading-button>

            <div class="dark-red ml3" v-if="error">Usuário e/ou senha inválidos</div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AccountIcon from 'vue-material-design-icons/Account'
import PasswordIcon from 'vue-material-design-icons/Lock'

import MdInput from '@/components/Login/MdInput.vue'
import MdLoadingButton from '@/components/ui/LoadingButton'
import logo from '@/images/full-logo.png'

export default {
  components: {
    AccountIcon,
    PasswordIcon,
    MdInput,
    MdLoadingButton,
  },
  data() {
    return {
      logo,
      user: null,
      password: null,
      error: false,
      loading: false,
    }
  },
  mounted() {
    document.documentElement.style.overflowY = 'hidden'
  },
  beforeDestroy() {
    document.documentElement.style.overflowY = 'scroll'
  },
  methods: {
    async login(e) {
      e.preventDefault()

      try {
        this.error = false
        this.loading = true

        await axios.post('/auth/login', {
          user: this.user,
          password: this.password,
        })

        this.$push({ name: 'orders' })
      } catch (e) {
        this.error = true
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
* {
  line-height: normal;
}
.gradient {
  background-image: linear-gradient(to right top, #051937, #11305d, #1d4885, #2a62b0, #357edd);
}
.form {
  width: 425px;
}
.login {
  height: 100vh;
}

.logo {
  width: 150px;
  height: 129px;
}

@media (min-width: 64rem) {
  .form {
    width: 780px;
  }

  .left {
    background: var(--white);
  }

  .right {
    background-color: #051938;
  }
}
</style>
