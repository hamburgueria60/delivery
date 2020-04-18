<template>
  <div class="gray f7 flex items-center">
    <v-fragment v-if="status === 'DRAFT'">
      <draft-icon :size="16" class="mr1" />
      Rascunho
    </v-fragment>

    <v-fragment v-if="status === 'RECEIVED'">
      <received-icon :size="16" class="mr1" />
      Recebido
    </v-fragment>

    <v-fragment v-if="status === 'READY'">
      <ready-icon :size="16" class="mr1" />
      Pronto
    </v-fragment>

    <v-fragment v-if="status === 'DONE'">
      <ready-icon :size="16" class="mr1 blue" />
      Finalizado
    </v-fragment>

    <v-fragment v-if="!statuses.includes(status)">
      {{ status }}
    </v-fragment>
  </div>
</template>

<script>
import ReceivedIcon from 'vue-material-design-icons/Check.vue'
import ReadyIcon from 'vue-material-design-icons/CheckAll.vue'
import DraftIcon from 'vue-material-design-icons/ClockOutline.vue'

import VFragment from '@/components/ui/VFragment'
import Status from '@/types/Status'

export default {
  components: {
    DraftIcon,
    ReadyIcon,
    ReceivedIcon,
    VFragment,
  },
  props: {
    status: { type: String, default: '' },
  },
  data() {
    return { statuses: Object.values(Status) }
  },
}
</script>

<style></style>
