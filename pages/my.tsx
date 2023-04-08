import { ThirdwebNftMedia, useAddress, useContract, useNFTs } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Header from "../components/Header";
import styles from "../styles/My.module.css";

const My: NextPage = () => {
  const { contract } = useContract(
    "0xAbFc7687c1c2c55B39229c21de9B703dcd475E60"
  );
  const address = useAddress();
  const { data: nfts, isLoading, error } = useNFTs(contract)

  console.log(nfts);

  return (
    <div className={styles.container}>
      <Header />
      <section className={styles.info}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          nfts
          ?.filter((nft) => nft.owner == address)
          ?.map((nft) => {
            return (
              <div key={nft.metadata.id}>
                <ThirdwebNftMedia
                  metadata={nft.metadata}
                  height="100"
                  style={{ borderRadius: "10px" }}
                />
                <p>{nft.metadata.name}</p>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
};

export default My;
