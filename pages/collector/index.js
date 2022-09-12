import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
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
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

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
      <Box alignItems="center" justifyContent="space-between" margin="5%">
        <TableContainer>
          <Table variant="striped" size="sm">
            <Thead>
              <Tr>
                <Th>Thumb</Th>
                <Th>Name</Th>
                <Th>Author</Th>
                <Th>Lowest</Th>
                <Th>Highest</Th>
                <Th>Last</Th>
              </Tr>
            </Thead>
            <Tbody>
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
                    platformURL =
                      "https://www.fxhash.xyz/gentk/" + nft.token_id;
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
                  <Tr key={nft.fa2_address + nft.token_id}>
                    <Td padding="0" textAlign="center">
                      {nft.token.thumbnail_uri && (
                        <Image
                          src={nft.token.thumbnail_uri.replace(
                            "ipfs://",
                            "https://ipfs.io/ipfs/"
                          )}
                          width="50"
                          height="50"
                          alt={nft.token.name}
                        ></Image>
                      )}
                    </Td>
                    <Td>
                      <Link href={platformURL} isExternal>
                        {nft.token.name}
                        <ExternalLinkIcon />
                      </Link>
                    </Td>
                    <Td>
                      <Link
                        href={"https://tzkt.io/" + nft.token.artist_address}
                        isExternal
                      >
                        {nft.token.artist_profile?.alias || "anon"}
                        <ExternalLinkIcon />
                      </Link>
                    </Td>
                    <Td isNumeric>
                      {(nft.token.lowest_sales_price / 1000000).toFixed(4)}
                    </Td>
                    <Td isNumeric>
                      {(nft.token.highest_sales_price / 1000000).toFixed(4)}
                    </Td>
                    <Td isNumeric>
                      {(nft.token.last_sales_price / 1000000).toFixed(4)}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
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
