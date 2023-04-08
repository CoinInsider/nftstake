/* eslint-disable @next/next/no-img-element */
import { Web3Button } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  
  return (
    <div className={styles.container}>
      <Header />
      <section className={styles.info}>
        <img className={styles.logo} src="./Logo.png" alt="Logo" />
        <h1>Egg Stacking Test Project</h1>
        <p>Welcome to Egg Stacking in the BSC test network</p>
        <br/>
        <Web3Button contractAddress="0xAbFc7687c1c2c55B39229c21de9B703dcd475E60"
        action={(contract) => {contract.erc721.claim(1);
        }}
          colorMode="light"
          accentColor="#9702c4"
        >
          Claim EGG
        </Web3Button>
        <h3>Price 0.0001 TBNB</h3>
      </section>
    </div>
  );
};

export default Home;
