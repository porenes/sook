/* eslint-disable react/jsx-key */
import { gql, useQuery } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import ProfileDetails from "../../components/profile/profileDetails";
import PlatformTokenLink from "../../components/tokens/PlatformTokenLink";
import TokenCard from "../../components/tokens/TokenCard";
import { getCollectionQuery } from "../../utils/collector/collection";

export default function Collector({ id }) {
  const QUERY = gql`
    query CollectorSales($id: String!) {
      listings_aggregate(
        where: { seller_address: { _eq: $id }, status: { _eq: "active" } }
      ) {
        aggregate {
          count(columns: swap_id)
        }
        nodes {
          start_price
          price
          token {
            name
          }
          status
          amount_left
          amount
          swap_id
          offer_id
          ask_id
        }
      }
      tzprofiles_by_pk(account: $id) {
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
  `;
  const { data, loading, error } = useQuery(QUERY, {
    variables: { id },
  });
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
    console.error("Error fetching collection");
    return null;
  }
  const { listings_aggregate, tzprofiles_by_pk: profile } = data;
  const { aggregate, nodes } = listings_aggregate;

  return (
    <Box>
      <Head>
        <title>Collector sales</title>
        <meta name="description" content="Your Tezos NFT Sook" />
      </Head>
      <Center margin="1%">
        <HStack>
          <Box p="5" border="1px" borderRadius="lg">
            <HStack>
              <Avatar name={profile?.alias} src={profile?.logo} />
              <Heading>{profile?.alias}</Heading>
              <NextLink href={"/creator/" + id} passHref>
                <Button as="a" size="xs">
                  View creations
                </Button>
              </NextLink>
            </HStack>
            <Text>{aggregate.count} tokens on sales</Text>
            {id}
          </Box>
          <ProfileDetails profile={profile} />
        </HStack>
      </Center>
      <Table size="sm" p={0}>
        <Thead>
          <Tr>
            <Th>id</Th>
            <Th>Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {nodes.map((swap) => {
            return (
              <Tr key={swap.swap_id || swap.offer_id || swap.ask_id}>
                <Td>{swap.swap_id || swap.offer_id || swap.ask_id}</Td>
                <Td>{swap.token.name}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
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
