import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.TEZTOK_API_BASE_URI,
  cache: new InMemoryCache(),
});

export default client;
