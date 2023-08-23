import {readFile} from 'fs/promises'
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { resolvers } from './resolvers.js';

const PORT = 9000;

const app = express();

const typeDefs = await readFile('./schema.graphql', 'utf8');
const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
apolloServer.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`)
});
