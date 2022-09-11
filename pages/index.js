import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export default function Home({nfts}) {
  console.log('nfts',nfts);
  return (
    <div className={styles.container}>
      <Head>
        <title>Sook</title>
        <meta name="description" content="Your Tezos NFT Sook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Sook</a>
        </h1>

        <p className={styles.description}>
          Your ultimate tools for Tezos
        </p>

        <div className={styles.grid}>
          <a href="#" className={styles.card}>
            <h2>Creator &rarr;</h2>
            <p>Creator tools</p>
          </a>

          <a href="#" className={styles.card}>
            <h2>Collectors &rarr;</h2>
            <p>Collectors tools</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        {/* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a> */}
      </footer>
    </div>
  )
}
export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://unstable-do-not-use-in-production-api.teztok.com/v1/graphql',
    cache: new InMemoryCache()
  });
  const { data } = await client.query({
    query: gql`
    query GetHoldings {
      holdings(where: {holder_address: {_eq: "tz1LRugk5K1StypSUpwtRTwkc3J2KriyCNTL"}}, order_by: {last_received_at: asc}) {
        amount
        fa2_address
        token_id
        token {
          artist_address
          artifact_uri
          display_uri
          name
          platform
          thumbnail_uri
        }
      }
    }
    
    `
  });
  return {
    props: {
      nfts: data.holdings
    }
  }
}