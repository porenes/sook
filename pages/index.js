import Head from "next/head";
import NextLink from "next/link";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Container,
  Heading,
  Link,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext } from "react";
import { DappContext } from "../contexts/dAppContext";

export default function Home() {
  const { accountConnected, accountAddress } = useContext(DappContext);
  return (
    <Container>
      <Head>
        <title>Sook</title>
        <meta name="description" content="Your Tezos NFT Sook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        <Center>
          <Box
            alignItems="center"
            justifyContent="space-between"
            margin="15%"
            borderRadius="lg"
            border="1px"
            p="10"
          >
            <Heading as="h1">Welcome to Sook</Heading>
            <p>Your ultimate tools for Tezos</p>
          </Box>
        </Center>
        {accountConnected && (
          <SimpleGrid columns={2}>
            <Box alignItems="center" justifyContent="space-between" margin="5%">
              <Box
                p="2"
                maxW="320px"
                h="100px"
                borderWidth="1px"
                borderRadius="lg"
              >
                <NextLink href={`/creator/${accountAddress}`} passHref>
                  <Link>
                    <Heading as="h2">Creator &rarr;</Heading>
                    <p>Creator tools</p>
                  </Link>
                </NextLink>
              </Box>
            </Box>
            <Box alignItems="center" justifyContent="space-between" margin="5%">
              <Box
                p="2"
                maxW="320px"
                h="100px"
                borderWidth="1px"
                borderRadius="lg"
              >
                <NextLink href={`/collector/${accountAddress}`} passHref>
                  <Link>
                    <Heading as="h2">Collectors &rarr;</Heading>
                    <p>Collectors tools</p>
                  </Link>
                </NextLink>
              </Box>
            </Box>
          </SimpleGrid>
        )}
      </Box>
    </Container>
  );
}
