import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import {
  Box,
  Center,
  List,
  ListItem,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import PlatformTokenLink from "../../components/tokens/PlatformTokenLink";

const Creator = ({ data }) => {
  const { cid, creations, creations_fxhash } = data;
  return (
    <Box>
      <Center>{cid}</Center>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Platform</Th>
            <Th>Ed.</Th>
          </Tr>
        </Thead>
        <Tbody>
          {creations.map((token) => {
            return (
              <Tr key={token.platform + token.token_id}>
                <Td>{token.name}</Td>
                <Td>
                  <PlatformTokenLink token={token}>
                    {token.platform}
                  </PlatformTokenLink>
                </Td>
                <Td>{token.editions}</Td>
              </Tr>
            );
          })}
          {creations_fxhash.map((token) => {
            return (
              <Tr key={token.fx_issuer_id}>
                <Td>{token.fx_collection_name}</Td>
                <Td>FXHASH</Td>
                <Td>?</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <List></List>
      <List></List>
    </Box>
  );
};

export const getServerSideProps = async (ctx) => {
  const { cid } = ctx.query;

  const client = new ApolloClient({
    uri: "https://unstable-do-not-use-in-production-api.teztok.com/v1/graphql",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query GetCreations {
        tokens(
          where: {
            artist_address: { _eq: "${cid}" }
            platform: { _neq: "FXHASH"}
          }
          order_by: {minted_at: desc}
        ) {
          editions
          eightscribo_title
          name
          objkt_artist_collection_id
          platform
          minted_at
          fa2_address
          token_id
        }
      }
    `,
  });
  const res = await client.query({
    query: gql`
      query GetCreationsFxhash {
        tokens(
          where: {
            artist_address: { _eq: "${cid}" }
            platform: { _eq: "FXHASH" }
          }
          order_by: { fx_issuer_id: asc, fx_iteration: desc }
          distinct_on: fx_issuer_id
        ) {
          fx_collection_name
          platform
          fx_collection_editions
          fx_issuer_id
          fx_iteration
        }
      }
    `,
  });
  console.log(res.data);
  return {
    props: {
      data: {
        cid,
        creations: data.tokens,
        creations_fxhash: res.data.tokens,
      },
    },
  };
};

export default Creator;
