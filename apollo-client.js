import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_TEZTOK_API_BASE_URI,
  cache: new InMemoryCache(),
});

export default client;
