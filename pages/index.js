import Head from "next/head";
import NextLink from "next/link";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sook</title>
        <meta name="description" content="Your Tezos NFT Sook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        <Heading as="h1">Welcome to Sook</Heading>

        <p>Your ultimate tools for Tezos</p>

        <Box>
          <NextLink
            href="/creator/tz1LRugk5K1StypSUpwtRTwkc3J2KriyCNTL"
            passHref
          >
            <Link>
              <Heading as="h2">Creator &rarr;</Heading>
              <p>Creator tools</p>
            </Link>
          </NextLink>

          <NextLink href="/collector" passHref>
            <Link>
              <Heading as="h2">Collectors &rarr;</Heading>
              <p>Collectors tools</p>
            </Link>
          </NextLink>
        </Box>
      </Box>
    </div>
  );
}
