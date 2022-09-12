import styles from "../../styles/Collector.module.css";
import Image from "next/image";

export default function NFTCard({ nft }) {
  return (
    <a href="#" className={styles.card} key={nft.fa2_address + nft.token_id}>
      <p>
        {nft.token.thumbnail_uri && (
          <Image
            src={nft.token.thumbnail_uri.replace(
              "ipfs://",
              "https://ipfs.io/ipfs/"
            )}
            width="100"
            height="100"
          ></Image>
        )}
      </p>
      <h2>{nft.token.name}</h2>
      <p>{nft.token.artist_profile?.alias + " | " + nft.token.platform}</p>
    </a>
  );
}
