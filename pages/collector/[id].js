/* eslint-disable react/jsx-key */
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FaDiscord, FaGithub, FaTwitter, FaGlobe } from "react-icons/fa";
import {
  Box,
  Heading,
  Flex,
  Badge,
  Text,
  Image,
  SimpleGrid,
  Link,
  Center,
  HStack,
  Button,
  Avatar,
} from "@chakra-ui/react";

import Head from "next/head";
import { useRouter } from "next/router";
import PlatformTokenLink from "../../components/tokens/PlatformTokenLink";

export default function Collector({ id, nfts, profile }) {
  return (
    <Box>
      <Head>
        <title>Sook</title>
        <meta name="description" content="Your Tezos NFT Sook" />
      </Head>
      <Center margin="5%">
        <HStack>
          <Box p="5" border="1px" borderRadius="lg">
            <HStack>
              <Avatar name={profile?.alias} src={profile.logo} />
              <Heading>{profile?.alias}</Heading>
            </HStack>
            <Text>{nfts.length} NFTs</Text>
            {id}
          </Box>
          <Box p="5" border="1px" borderRadius="lg" fontSize="sm">
            <Text>{profile.description}</Text>
            <HStack>
              <Button as="a" href={profile.discord}>
                <FaDiscord />
              </Button>
              <Button as="a" href={profile.github}>
                <FaGithub />
              </Button>
              {profile?.twitter && (
                <Button
                  as="a"
                  href={"https://twitter.com/" + profile.twitter}
                  target="_blank"
                >
                  <FaTwitter />
                </Button>
              )}
              <Button as="a" href={profile.website}>
                <FaGlobe />
              </Button>
            </HStack>
          </Box>
        </HStack>
      </Center>

      <SimpleGrid columns={[2, 3, 5]}>
        {nfts.map((nft) => {
          return (
            <Box
              alignItems="center"
              justifyContent="space-between"
              margin="5%"
              key={nft.fa2_address + nft.token_id}
            >
              <Box p="2" maxW="320px" h="400px" borderWidth="1px">
                {nft.token.thumbnail_uri && (
                  <Image
                    src={nft.token.thumbnail_uri.replace(
                      "ipfs://",
                      "https://ipfs.io/ipfs/"
                    )}
                    alt={nft.token.name}
                    placeholder="blur"
                    maxH="320px"
                  />
                )}
                <Flex align="baseline" mt={2}>
                  {nft.token.platform && (
                    <Badge colorScheme="teal">{nft.token.platform}</Badge>
                  )}
                  <Text ml={2} fontSize="sm" fontWeight="bold" color="teal.800">
                    <Link href={"/creator/" + nft.token.artist_address}>
                      {nft.token.artist_profile?.alias || "anon"}
                    </Link>
                    <Link
                      href={"https://tzkt.io/" + nft.token.artist_address}
                      isExternal
                    >
                      <ExternalLinkIcon />
                    </Link>
                  </Text>
                </Flex>
                <Text
                  mt={2}
                  fontSize="xl"
                  fontWeight="semibold"
                  lineHeight="short"
                >
                  {nft.token.name?.length < 25
                    ? nft.token.name
                    : nft.token.name?.slice(0, 25) + "..."}
                </Text>
                <Text mt={2}>
                  xtz {nft.token.price / 10 ** 6} {"-> "}
                  {nft.token.last_sales_price / 10 ** 6} {"-> "}
                  {nft.token.lowest_price_listing / 10 ** 6}
                  {"-> "}
                </Text>
                <Flex mt={2} align="center">
                  <Text ml={1} fontSize="sm">
                    <PlatformTokenLink token={nft.token}>
                      {nft.token_id.length < 5
                        ? nft.token_id
                        : nft.token_id.slice(0, 5) + "..."}
                    </PlatformTokenLink>
                  </Text>
                </Flex>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

export async function getServerSideProps(ctx) {
  console.log(ctx.query);
  const { id } = ctx.query;
  const client = new ApolloClient({
    uri: "https://unstable-do-not-use-in-production-api.teztok.com/v1/graphql",
    cache: new InMemoryCache(),
  });
  //TODO add support for https://emojiart.xyz/ contract KT1VBe538e2ucXhdWdoaFnLpyCiTkvsPkyZm
  const { data } = await client.query({
    query: gql`
      query GetHoldings {
        holdings(
          where: {
            holder_address: { _eq: "${id}" }
            amount: { _gt: 0 }
            fa2_address: { _neq: "KT1VBe538e2ucXhdWdoaFnLpyCiTkvsPkyZm" }
          }
          order_by: { last_received_at: desc }
        ) {
          amount
          fa2_address
          token_id
          token {
            artist_address
            name
            platform
            thumbnail_uri
            artist_profile {
              alias
            }
            sales_count
            sales_volume
            highest_sales_price
            lowest_sales_price
            last_sales_price
            burned_editions
            editions
            first_sales_price
            lowest_price_listing(path: "price")
            price
            fa2_address
            token_id
          }
        }
        tzprofiles_by_pk(account: "${id}") {
          alias
          description
          discord
          domain_name
          ethereum
          github
          logo
          twitter
          website
        }
      }
    `,
  });
  return {
    props: {
      id,
      nfts: data.holdings,
      profile: data.tzprofiles_by_pk,
    },
  };
}
