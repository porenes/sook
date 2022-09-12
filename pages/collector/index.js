import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Image from "next/image";

export default function Collector({ nfts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sook</title>
        <meta name="description" content="Your Tezos NFT Sook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>{nfts.length} NFTs</h1>
        <ul className={styles.ul}>
          {nfts.map((nft) => {
            nft.token.thumbnail_uri &&
              console.log(
                nft.token.thumbnail_uri.replace(
                  "ipfs://",
                  "https://ipfs.io/ipfs/"
                )
              );
            return (
              <li className={styles.li} key={nft.fa2_address + nft.token_id}>
                {/* {nft.token.thumbnail_uri && (
                  <Image
                    src={nft.token.thumbnail_uri.replace(
                      "ipfs://",
                      "https://ipfs.io/ipfs/"
                    )}
                    width="100"
                    height="100"
                  ></Image>
                )} */}
                {nft.token.artist_profile?.alias +
                  " - " +
                  nft.token.name +
                  " | " +
                  nft.token.platform}
              </li>
            );
          })}
        </ul>
      </main>
    </div>
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
