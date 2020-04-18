import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv-safe'
import express from 'express'
import http from 'http'
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas'
import path from 'path'

import auth from './auth'

dotenv.config({
  path: './environment/.env',
  example: './environment/required.env',
})

const app = express()
const typesArray = fileLoader(path.join(__dirname, './graphql/types'))
const resolversArray = fileLoader(path.join(__dirname, './graphql/resolvers'))

const server = new ApolloServer({
  typeDefs: mergeTypes(typesArray, { all: true }),
  resolvers: mergeResolvers(resolversArray),
})

app.use(bodyParser.json())
auth.applyMiddleware({ app })
auth.applyRoutes({ app })
server.applyMiddleware({ app })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: 4000 }, () => {
  console.log(`🚀 GraphQL ready at http://localhost:4000${server.graphqlPath}`)
  console.log(`🚀 API ready at http://localhost:4000/api`)
})
