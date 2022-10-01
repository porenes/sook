import { ApolloClient, gql, InMemoryCache, useQuery } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import CreationTable from "../../components/creations/CreationTable";
import ProfileDetails from "../../components/profile/profileDetails";
import { DappContext } from "../../contexts/dAppContext";
import { getCreatorHoldingsQuery } from "../../utils/collector/collection";
import { getDecaGalleries } from "../../utils/deca/decaApi";

const Creator = (props) => {
  const router = useRouter();
  const { cid, creations, creations_fxhash, profile } = props.data;
  // const result = getDecaGalleries(cid);
  const handleSubmit = (event) =>
    event.key == "Enter" && router.push("/creator/" + event.target.value);
  const pageTitle = `Sook creator - ${profile?.alias || cid}`;
  const { accountConnected, accountAddress } = useContext(DappContext);

  const QUERY = getCreatorHoldingsQuery(cid, accountAddress);
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
    console.error("Error fetching collection");
    return null;
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Center>
        <Input
          placeholder="tz1..."
          onChange={handleSubmit}
          onKeyPress={handleSubmit}
        />
      </Center>
      <Center margin="1%">
        <HStack>
          <Box p="5" border="1px" borderRadius="lg">
            <HStack>
              <Avatar name={profile?.alias} src={profile?.logo} />
              <Heading>{profile?.alias}</Heading>
              <NextLink href={"/collector/" + cid} passHref>
                <Button as="a" size="xs">
                  View collection
                </Button>
              </NextLink>
              <NextLink href={"/sales/" + cid} passHref>
                <Button as="a" size="xs">
                  View sales
                </Button>
              </NextLink>
            </HStack>
            <Text>{creations.length + creations_fxhash.length} creations</Text>
            <Text>
              Holding {data.holdings_aggregate.aggregate.count} creations /{" "}
              {data.holdings_aggregate.aggregate.sum.amount} editions
            </Text>
          </Box>
          <ProfileDetails profile={profile} />
        </HStack>
      </Center>
      <Box
        margin="2%"
        border="1px"
        p="5"
        borderColor="green.200"
        borderRadius="sm"
      >
        <CreationTable
          creations={creations}
          creations_fxhash={creations_fxhash}
          holdings={data.holdings_aggregate.nodes}
        />
      </Box>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const { cid } = ctx.query;

  const client = new ApolloClient({
    uri: "https://unstable-do-not-use-in-production-api.teztok.com/v1/graphql",
    cache: new InMemoryCache(),
  });
  let { data } = await client.query({
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
          burned_editions
          eightscribo_title
          token_id
          fa2_address
          name
          objkt_artist_collection_id
          platform
          minted_at
          first_sales_price
          highest_sales_price
          highest_offer_price
          last_sales_price
          price
        }
      }
    `,
  });
  const creations = data.tokens;
  ({ data } = await client.query({
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
  }));
  const creations_fxhash = data.tokens;

  ({ data } = await client.query({
    query: gql`
      query GetProfile {
        tzprofiles_by_pk(account: "${cid}") {
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
  }));
  const profile = data.tzprofiles_by_pk;
  return {
    props: {
      data: {
        cid,
        creations,
        creations_fxhash,
        profile,
      },
    },
  };
};

export default Creator;
