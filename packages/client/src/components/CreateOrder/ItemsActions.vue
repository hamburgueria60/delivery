<template>
  <div direction="horizontal" class="actions flex mt2 mt0-mm">
    <list-item
      class="flex items-center mr3 pointer hover-mid-gray"
      aria-label="Ação: duplicar."
      @select="ADD_ITEM(item)"
    >
      <copy-icon :title="''" />
    </list-item>

    <li class="flex items-center mr3 hover-mid-gray" aria-label="Ação: alterar complemento.">
      <description-change class="flex items-center" :item="item">
        <details-icon class="pointer" :title="''" />
      </description-change>
    </li>

    <li class="flex items-center mr3 hover-mid-gray" aria-label="Ação: acréscimo ou desconto.">
      <price-change class="flex items-center" :item="item">
        <currency-icon class="pointer" :title="''" />
      </price-change>
    </li>

    <list-item
      class="flex items-center mr3 pointer hover-mid-gray"
      aria-label="Ação: remover."
      @select="REMOVE_ITEM(item)"
    >
      <delete-icon :title="''" />
    </list-item>
  </div>
</template>

<script>
import CopyIcon from 'vue-material-design-icons/ContentCopy.vue'
import CurrencyIcon from 'vue-material-design-icons/CurrencyUsd'
import DetailsIcon from 'vue-material-design-icons/Paperclip.vue'
import DeleteIcon from 'vue-material-design-icons/TrashCan.vue'
import { mapMutations } from 'vuex'

import DescriptionChange from '@/components/CreateOrder/DescriptionChange.vue'
import PriceChange from '@/components/CreateOrder/PriceChange.vue'
import ListItem from '@/components/ui/ListItem.vue'

export default {
  components: {
    DescriptionChange,
    PriceChange,
    ListItem,
    CopyIcon,
    DeleteIcon,
    DetailsIcon,
    CurrencyIcon,
  },
  props: {
    item: { type: Object, default: () => ({}) },
  },
  methods: {
    ...mapMutations('CreateOrder', ['ADD_ITEM', 'REMOVE_ITEM']),
  },
}
</script>

<style lang="scss" scoped>
.actions {
  color: var(--light-silver);
}
</style>
