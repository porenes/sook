import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { Box, List, ListItem } from "@chakra-ui/react";

const Creator = ({ data }) => {
  const { cid, creations } = data;
  return (
    <Box>
      <List>
        {creations.map((token) => {
          return <ListItem>{token.name}</ListItem>;
        })}
      </List>
      {/* <List>
        {creations_fxhash.map((token) => {
          return <ListItem>{token.name}</ListItem>;
        })}
      </List> */}
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
          order_by: {
            platform: asc
            fx_collection_name: asc
            fx_iteration: asc
          }
        ) {
          editions
          eightscribo_title
          fx_collection_name
          name
          objkt_artist_collection_id
          platform
        }
      }
    `,
  });
  //   const data_fxhash = await client.query({
  //     query: gql`
  //       query GetCreationsFxhash {
  //         tokens(
  //           where: {
  //             artist_address: { _eq: "tz1LRugk5K1StypSUpwtRTwkc3J2KriyCNTL" }
  //             platform: { _eq: "FXHASH" }
  //           }
  //           order_by: { fx_issuer_id: asc, fx_iteration: desc }
  //           distinct_on: fx_issuer_id
  //         ) {
  //           fx_collection_name
  //           platform
  //           fx_collection_editions
  //           fx_issuer_id
  //           fx_iteration
  //         }
  //       }
  //     `,
  //   });
  //   console.log(data_fxhash);
  return {
    props: {
      data: {
        cid,
        creations: data.tokens,
        // creations_fxhash: data_fxhash.tokens,
      },
    },
  };
};

export default Creator;
