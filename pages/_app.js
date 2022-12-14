import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout";
import theme from "../components/theme";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { DappProvider } from "../contexts/dAppContext";

function MyApp({ Component, pageProps }) {
  process.env.NEXT_PUBLIC_TEZTOK_API_BASE_URI ||
    console.error("Teztok API undefined");
  process.env.NEXT_PUBLIC_IPFS_HTTP_GATEWAY_BASE_URI ||
    console.error("IPFS Gateway undefined ");

  return (
    <ChakraProvider theme={theme}>
      <DappProvider>
        <ApolloProvider client={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </DappProvider>
    </ChakraProvider>
  );
}

export default MyApp;
