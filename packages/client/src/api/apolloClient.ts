import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { getMainDefinition } from 'apollo-utilities'
import { OperationDefinitionNode } from 'graphql'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import randomize from 'randomatic'
import fetch from 'unfetch'

import { X_TRANSACTION_ID } from './constants'
import errorLink from './errorLink'
import getBaseUrl from './getBaseUrl'
import websocketLink from './websocketLink'

const contextLink = setContext((): {} => {
  return {
    headers: {
      [X_TRANSACTION_ID]: randomize('Aa0', 20),
    },
  }
})

const httpLink = createHttpLink({ uri: getBaseUrl(), fetch })

const options = {
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    errorLink,
    contextLink,
    ApolloLink.split(
      ({ query }): boolean => {
        const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode
        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      websocketLink,
      httpLink,
    ),
  ]),
  connectToDevTools: process.env.NODE_ENV !== 'production',
}

const apolloClient = new ApolloClient(options)

export default apolloClient
