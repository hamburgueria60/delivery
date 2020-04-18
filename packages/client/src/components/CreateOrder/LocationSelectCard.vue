<template>
  <div>
    <select-input-card
      v-model="query"
      popper-height="160"
      type="single"
      header="Bairro ou conjunto"
      :empty="!location"
      :options="{ text: 'name', key: 'id' }"
      :items="filteredLocations"
      :loading="loading"
      active-placeholder="Digite para escolher o bairro ou conjunto"
      show-search-button
      @select="handleSelect"
    >
      <div>
        <div v-if="location && !loading">{{ location.name }}</div>

        <div class="f6 dark-red" v-if="error">
          Não foi possível criar a nova localidade. Tente novamente.
        </div>
      </div>

      <template #loading>
        <loading v-if="loading" :size="20" />
      </template>

      <template v-slot:items="{ tabindex, select }">
        <list-item
          v-for="(item, index) in filteredLocations"
          :key="item.id"
          :tabindex="tabindex(index)"
          @select="select(item)"
        >
          <div class="pv3 pl5" :class="{ 'moon-gray': item.delay && counter }">
            {{ item.name }}
            <span v-if="item.delay && counter">({{ counter }})</span>
          </div>
        </list-item>
      </template>
    </select-input-card>

    <try-again-snackbar :md-active.sync="displayTryAgainSnackbar" class="snackbar" @click="tryAgain()" />
  </div>
</template>

<script>
import levenshtein from 'fast-levenshtein'
import { debounce, reduce, toLower } from 'lodash'
import { mapMutations } from 'vuex'

import TryAgainSnackbar from '@/components/CreateOrder/TryAgainSnackbar.vue'
import ListItem from '@/components/ui/ListItem.vue'
import Loading from '@/components/ui/Loading.vue'
import SelectInputCard from '@/components/ui/SelectInputCard.vue'
import { GET_LOCATIONS } from '@/gqls'

import { ADD_LOCATION } from '../../gqls'

const SUGGESTION = 'SUGGESTION'
const CREATE = 'CREATE'

export default {
  components: {
    ListItem,
    SelectInputCard,
    Loading,
    TryAgainSnackbar,
  },
  props: {
    location: { type: Object, default: null },
  },
  data() {
    return {
      locations: [],
      query: '',
      counter: 0,
      displayTryAgainSnackbar: false,
      loading: false,
      error: false,
    }
  },
  computed: {
    filteredLocations() {
      const query = toLower(this.query)
      let suggestion = null

      if (query.length < 3) return []

      return reduce(
        this.locations,
        (locations, location, index, source) => {
          const locationName = location.name.toLowerCase()

          if (toLower(locationName).startsWith(query)) {
            locations.push(location)
          }

          const distance = levenshtein.get(query, locationName)

          if (!suggestion || distance <= suggestion.distance) {
            suggestion = { distance, location }
          }

          const notFound = index + 1 === source.length && locations.length === 0

          if (notFound) {
            locations.push({
              id: SUGGESTION,
              additional: true,
              suggestion: suggestion.location,
              name: `Você quis dizer: "${suggestion.location.name}"?`,
            })

            locations.push({
              id: CREATE,
              additional: true,
              delay: true,
              name: `Adicionar "${this.query}"`,
            })
          }

          return locations
        },
        [],
      )
    },
  },
  watch: {
    query(value, prevValue) {
      if (value !== prevValue) {
        this.counter = 3
        this.countdown()
      }
    },
  },
  methods: {
    ...mapMutations('CreateOrder', {
      setUpdateLocationDeliveryFee: 'SET_UPDATE_LOCATION_DELIVERY_FEE',
    }),

    countdown: debounce(function countdown() {
      if (this.counter === 0) return
      this.counter -= 1
      this.countdown()
    }, 1000),

    async handleSelect(location) {
      if (location.additional) {
        if (location.id === SUGGESTION) {
          const { suggestion } = location
          this.$emit('update:location', suggestion)
        }

        if (location.id === CREATE) {
          if (location.delay && this.counter) return
          const createdLocation = await this.createLocation()
          this.$emit('update:location', createdLocation)
        }
      } else {
        this.$emit('update:location', location)
      }
    },

    async createLocation() {
      try {
        this.error = false
        this.loading = true
        const response = await this.$apollo.mutate({
          mutation: ADD_LOCATION,
          variables: { name: this.query },
        })
        const createdLocation = response.data.addLocation
        this.setUpdateLocationDeliveryFee({ id: createdLocation.id })
        return createdLocation
      } catch (e) {
        this.error = true
      } finally {
        this.loading = false
      }
    },

    async tryAgain() {
      this.displayTryAgainSnackbar = false
      try {
        this.$apollo.queries.locations.skip = false
        await this.$apollo.queries.locations.refetch()
      } catch (e) {
        this.displayTryAgainSnackbar = true
      }
    },
  },
  apollo: {
    locations: {
      query: GET_LOCATIONS,
      error() {
        this.displayTryAgainSnackbar = true
      },
    },
  },
}
</script>

<style></style>
