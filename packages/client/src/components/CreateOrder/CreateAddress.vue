<template>
  <div>
    <md-dialog
      class="md-dialog"
      :md-active="open"
      @update:mdActive="$emit('update:open', arguments[0])"
      @md-closed="handleClose"
    >
      <md-dialog-title class="mv1">
        Adicionar novo endereço
        <div class="f5 normal light-silver">{{ formattedPhone }}</div>
      </md-dialog-title>

      <focus-trap>
        <div class="flex flex-column pt0 pb0 pa4">
          <div class="flex flex-row pv1">
            <div class="flex-3 pr1">
              <title-card header="Rua ou avenida" class="h-100">
                <Input v-model="streetName" class="ttc" />
                <span class="f6 light-silver">
                  exemplo: Rua Padre João Ribeiro ou Avenida Djalma Batista
                </span>
              </title-card>
            </div>
            <div class="flex-1 pl1">
              <title-card header="Número" class="h-100">
                <Input v-model="number" />
              </title-card>
            </div>
          </div>
          <div class="pv1">
            <location-select-card :location.sync="location" />
          </div>
          <div class="pv1">
            <title-card header="Informações adicionais">
              <Input v-model="complement" class="ttc" />
              <span class="f6 light-silver">
                exemplo: quadra, bloco, apartamento, ponto de referência, instruções, etc.
              </span>
            </title-card>
          </div>
        </div>

        <div v-if="open" class="flex items-center justify-end ph4 pv3">
          <span v-if="error" class="dark-red mr-auto">
            Oops, não foi possível criar o endereço.
          </span>

          <Button class="mr3" outlined @click="$emit('update:open', false)">
            Cancelar
          </Button>

          <loading-button
            ref="primary"
            :loading="loading"
            :disabled="!(streetName && number && location)"
            filled
            tabindex="0"
            @click="handleAddBtnClick"
          >
            Adicionar
          </loading-button>
        </div>
      </focus-trap>
    </md-dialog>
  </div>
</template>

<script>
import { pick, startCase, toLower } from 'lodash'
import FocusTrap from 'vue-focus-lock'
import { filter as format } from 'vue-input-facade'
import { mapState } from 'vuex'

import LocationSelectCard from '@/components/CreateOrder/LocationSelectCard.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import LoadingButton from '@/components/ui/LoadingButton.vue'
import TitleCard from '@/components/ui/TitleCard.vue'
import { ADD_ADDRESS, GET_ADDRESSES } from '@/gqls'
import { getRawPhone } from '@/utils/phone'

export default {
  components: {
    LocationSelectCard,
    LoadingButton,
    Input,
    TitleCard,
    Button,
    FocusTrap,
  },
  props: {
    open: { type: Boolean },
  },
  data() {
    return {
      error: false,
      loading: false,
      streetName: '',
      number: '',
      location: null,
      complement: '',
    }
  },
  computed: {
    ...mapState('CreateOrder', ['phone']),
    formattedPhone() {
      return format(this.phone, { mask: '(##) #####-####' })
    },
  },
  methods: {
    async handleAddBtnClick() {
      const address = {
        ...pick(this, ['number']),
        location: this.location.id,
        streetName: startCase(toLower(this.streetName)),
        complement: startCase(toLower(this.complement)),
        phoneNumber: getRawPhone(this.phone),
      }

      this.loading = true
      this.error = false
      try {
        const response = await this.$apollo.mutate({
          mutation: ADD_ADDRESS,
          variables: { address },
          update: (store, { data: { addAddress } }) => {
            const data = store.readQuery({
              query: GET_ADDRESSES,
              variables: { phone: getRawPhone(this.phone) },
            })
            data.addresses.push(addAddress)
            store.writeQuery({
              query: GET_ADDRESSES,
              variables: { phone: getRawPhone(this.phone) },
              data,
            })
          },
        })

        this.$emit('update:address', response.data.addAddress)
        this.$emit('update:open', false)
      } catch (e) {
        this.error = true
      } finally {
        this.loading = false
      }
    },
    handleClose() {
      this.streetName = ''
      this.number = ''
      this.location = null
      this.complement = ''
      this.$emit('md-closed')
    },
  },
}
</script>

<style scoped>
.md-dialog {
  min-width: 640px;
}
.snack-bar {
  max-width: 680px;
}
</style>
