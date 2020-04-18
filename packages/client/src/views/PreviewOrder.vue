<template>
  <md-dialog :md-active.sync="open" @md-closed="onClosing">
    <MountingPortal mount-to="#portal" append>
      <div class="fixed top-0 left-0 w-100 bg-black white toolbar">
        <focus-trap>
          <div class="mw8 center pa2 ph3 flex items-center">
            <span class="flex-1">
              Pré-visualização para impressão
            </span>

            <span v-tooltip="'Editar'" tabindex="0" class="mr4" @keydown.enter="edit" @click="edit">
              <edit-icon :title="''" class="dim pointer" />
            </span>

            <span v-tooltip="'Imprimir'" tabindex="0" class="mr4" @keydown.enter="print" @click="print">
              <print-icon :title="''" class="dim pointer" />
            </span>

            <span v-tooltip="'Fechar'" tabindex="0" @keydown.enter="open = false" @click="open = false">
              <close-icon :title="''" class="dim pointer" />
            </span>
          </div>
        </focus-trap>
      </div>
    </MountingPortal>

    <v-fragment v-if="selectedOrder">
      <printable-order ref="body" v-bind="selectedOrder" />
    </v-fragment>
  </md-dialog>
</template>

<script>
import FocusTrap from 'vue-focus-lock'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import EditIcon from 'vue-material-design-icons/Pencil.vue'
import PrintIcon from 'vue-material-design-icons/Printer.vue'

import PrintableOrder from '@/components/CreateOrder/PrintableOrder.vue'
import VFragment from '@/components/ui/VFragment'
import { mapGetterSetter } from '@/utils/mapGetterSetter'
import print from '@/utils/print'
import ScrollLock from '@/utils/ScrollLock'

export default {
  components: {
    FocusTrap,
    CloseIcon,
    EditIcon,
    PrintIcon,
    PrintableOrder,
    VFragment,
  },
  props: {},
  data() {
    return { open: true, scrollLock: new ScrollLock() }
  },
  computed: {
    ...mapGetterSetter('Orders', {
      selectedOrder: 'SET_SELECTED_ORDER',
    }),
  },
  mounted() {
    this.scrollLock.lockScroll()
    if (!this.selectedOrder) this.$router.replace({ name: 'orders' })
  },
  beforeDestroy() {
    this.scrollLock.unlockScroll()
  },
  methods: {
    async edit() {
      this.$router.push({
        name: 'edit-order',
        params: { id: this.selectedOrder.id },
      })
      this.$storeTyped.dispatch('CreateOrder/editDraftOrder', this.selectedOrder)
    },
    async print() {
      await print(this.$refs.body.$el)
    },
    onClosing() {
      this.selectedOrder = null
      this.$router.push({ name: 'orders' })
    },
  },
}
</script>

<style scoped>
.toolbar {
  z-index: 6;
}
</style>
