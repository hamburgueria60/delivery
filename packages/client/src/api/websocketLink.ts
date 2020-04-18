import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'

const GRAPHQL_ENDPOINT = `ws://${window.location.host}/graphql`

const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true,
})

const websocketLink = new WebSocketLink(client)

export default websocketLink
