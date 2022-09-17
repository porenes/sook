import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout";
import theme from "./theme";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

function MyApp({ Component, pageProps }) {
  console.log(process.env);
  process.env.NEXT_PUBLIC_TEZTOK_API_BASE_URI ||
    console.error("Teztok API undefined");
  process.env.NEXT_PUBLIC_IPFS_HTTP_GATEWAY_BASE_URI ||
    console.error("IPFS Gateway undefined ");
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default MyApp;
