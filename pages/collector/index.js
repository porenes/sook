import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Flex,
  Badge,
  Text,
  Image,
  SimpleGrid,
  Link,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import HoldingTableView from "../../components/holdings/holdingTableView";

export default function Collector() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Box>
      <Head>
        <title>Sook</title>
        <meta name="description" content="Your Tezos NFT Sook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/collector/tz1LRugk5K1StypSUpwtRTwkc3J2KriyCNTL">me</Link>
    </Box>
  );
}
