import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
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

        <p className={styles.description}>Your ultimate tools for Tezos</p>

        <div className={styles.grid}>
          <a href="#" className={styles.card}>
            <h2>Creator &rarr;</h2>
            <p>Creator tools</p>
          </a>

          <Link href="/collector">
            <div className={styles.card}>
              <h2>Collectors &rarr;</h2>
              <p>Collectors tools</p>
            </div>
          </Link>
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
  );
}
