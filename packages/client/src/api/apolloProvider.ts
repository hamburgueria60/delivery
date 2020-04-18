import VueApollo from 'vue-apollo'

import apolloClient from './apolloClient'

export default new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $query: {
      fetchPolicy: 'network-only',
    },
  },
})
