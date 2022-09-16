import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Link,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Head from "next/head";
import ProfileDetails from "../../components/profile/profileDetails";
import PlatformTokenLink from "../../components/tokens/PlatformTokenLink";
import NextLink from "next/link";

const Creator = ({ data }) => {
  const { cid, creations, creations_fxhash, profile } = data;
  return (
    <>
      <Head>
        <title>Sook collector - {profile?.alias || cid}</title>
      </Head>

      <Center margin="1%">
        <HStack>
          <Box p="5" border="1px" borderRadius="lg">
            <HStack>
              <Avatar name={profile?.alias} src={profile.logo} />
              <Heading>{profile?.alias}</Heading>
              <NextLink href={"/collector/" + cid} passHref>
                <Button as="a" size="xs">
                  View collection
                </Button>
              </NextLink>
            </HStack>
            {cid}
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
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Platform</Th>
              <Th>Ed.</Th>
              <Th>🔥</Th>
              <Th>🏷</Th>
              <Th>1st 🏷</Th>
              <Th>🔝 💰</Th>
              <Th>🔝 💁🏻‍♂️</Th>
              <Th>Last 🏷</Th>
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
                  <Td isNumeric>{token.editions}</Td>
                  <Td isNumeric>{token.burned_editions || ""}</Td>
                  <Td isNumeric>{token?.price / 10 ** 6} tz</Td>
                  <Td isNumeric>{token?.first_sales_price / 10 ** 6} tz</Td>
                  <Td isNumeric>{token?.highest_sales_price / 10 ** 6} tz</Td>
                  <Td isNumeric>{token?.highest_offer_price / 10 ** 6} tz</Td>
                  <Td isNumeric>{token?.last_sales_price / 10 ** 6} tz</Td>
                </Tr>
              );
            })}
            {creations_fxhash.map((token) => {
              return (
                <Tr key={token.fx_issuer_id}>
                  <Td>{token.fx_collection_name}</Td>
                  <Td>
                    {" "}
                    <PlatformTokenLink token={token} fxhashUseGenerator>
                      {token.platform}
                    </PlatformTokenLink>
                  </Td>
                  <Td isNumeric>{token.fx_collection_editions}</Td>
                  <Td isNumeric>?</Td>
                  <Td isNumeric>?</Td>
                  <Td isNumeric>?</Td>
                  <Td isNumeric>?</Td>
                  <Td isNumeric>?</Td>
                  <Td isNumeric>?</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
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
