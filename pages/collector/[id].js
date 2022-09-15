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
import TokenCard from "../../components/tokens/TokenCard";

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
      <Center margin="1%">
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
          return <TokenCard nft={nft} />;
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
