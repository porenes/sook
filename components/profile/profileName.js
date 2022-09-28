import { ApolloClient, gql, InMemoryCache, useQuery } from "@apollo/client";
import { useMediaQuery } from "@chakra-ui/react";
import { waitUntilSymbol } from "next/dist/server/web/spec-extension/fetch-event";

export default function ProfileName({ artist_profile, artist_address }) {
  if (artist_profile?.alias) {
    return artist_profile.alias;
  } else {
    const FXHASH_QUERY = gql`
      query fxProfileQuery($userId: String) {
        user(id: $userId) {
          name
        }
      }
    `;
    const fxhashClient = new ApolloClient({
      uri: "https://api.fxhash.xyz/graphql",
      cache: new InMemoryCache(),
    });
    const { loading, error, data } = useQuery(FXHASH_QUERY, {
      client: fxhashClient,
      variables: { userId: artist_address },
    });
    if (loading) {
      return "---";
    }
    if (error) return `Error! ${error.message}`;
    const fxprofilename = data.user?.name;
    if (fxprofilename) return fxprofilename;
  }
}
