/* eslint-disable react/jsx-key */
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
  Center,
  HStack,
  Button,
  Avatar,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import Head from "next/head";
import PlatformTokenLink from "../../components/tokens/PlatformTokenLink";
import { getCollectionQuery } from "../../utils/collector/collection";
import ProfileDetails from "../../components/profile/profileDetails";

export default function Collector({ id }) {
  const QUERY = getCollectionQuery(id);
  const { data, loading, error } = useQuery(QUERY);
  if (loading) {
    return (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  if (error) {
    //TODO catch error
    return null;
  }
  const nfts = data.holdings;
  const profile = data.tzprofiles_by_pk;
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
          <ProfileDetails profile={profile} />
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
                    src={(![
                      "ipfs://QmNrhZHUaEqxhyLfqoq1mtHSipkWHeT31LNHb1QEbDHgnc",
                      "ipfs://QmY7npznSASiN61trocXBbYe43iRKKicx2ZtZgQZNJRjtA",
                    ].includes(nft.token.thumbnail_uri)
                      ? nft.token.thumbnail_uri
                      : nft.token.display_uri
                    )?.replace("ipfs://", "https://ipfs.io/ipfs/")}
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
export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  return {
    props: {
      id,
    },
  };
};
