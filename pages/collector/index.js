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

export default function Collector({ nfts }) {
  const router = useRouter();
  const { accountId } = router.query;
  return (
    <Box>
      <Head>
        <title>Sook</title>
        <meta name="description" content="Your Tezos NFT Sook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading as="h1" textAlign="center">
        {nfts.length} NFTs
      </Heading>
      6
      <SimpleGrid columns={[2, 3, 5]}>
        {nfts.map((nft) => {
          let platformURL = "#";
          switch (nft.token.platform) {
            case "OBJKT":
              platformURL =
                "https://objkt.com/asset/" +
                nft.fa2_address +
                "/" +
                nft.token_id;
              break;
            case "VERSUM":
              platformURL =
                "https://www.versum.xyz/token/versum/" + nft.token_id;
              break;
            case "FXHASH":
              platformURL = "https://www.fxhash.xyz/gentk/" + nft.token_id;
              break;
            case "HEN":
              platformURL = "https://hic.af/o/" + nft.token_id;
              break;

            default:
              platformURL =
                "https://objkt.com/asset/" +
                nft.fa2_address +
                "/" +
                nft.token_id;
              break;
          }
          return (
            <Box alignItems="center" justifyContent="space-between" margin="5%">
              <Box p="5" maxW="320px" h="400px" borderWidth="1px">
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
                  <Text
                    ml={2}
                    textTransform="uppercase"
                    fontSize="sm"
                    fontWeight="bold"
                    color="teal.800"
                  >
                    <Link
                      href={"https://tzkt.io/" + nft.token.artist_address}
                      isExternal
                    >
                      {nft.token.artist_profile?.alias || "anon"}
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
                <Text mt={2}>$119/night</Text>
                <Flex mt={2} align="center">
                  <Text ml={1} fontSize="sm">
                    <b>4.84</b> (190)
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

export async function getServerSideProps() {
  const client = new ApolloClient({
    uri: "https://unstable-do-not-use-in-production-api.teztok.com/v1/graphql",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query GetHoldings {
        holdings(
          where: {
            holder_address: { _eq: "tz1LRugk5K1StypSUpwtRTwkc3J2KriyCNTL" }
            amount: { _gt: 0 }
          }
          order_by: {
            last_received_at: asc
            token: { artist_profile: { alias: asc } }
          }
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
          }
        }
      }
    `,
  });
  return {
    props: {
      nfts: data.holdings,
    },
  };
}
