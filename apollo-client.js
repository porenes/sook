import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://unstable-do-not-use-in-production-api.teztok.com/v1/graphql",
  cache: new InMemoryCache(),
});

export default client;
