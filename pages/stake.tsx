/* eslint-disable react/jsx-key */
import { useContract, useAddress, Web3Button, ThirdwebNftMedia, useOwnedNFTs, useContractRead, } from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import NFTCard from "../components/NFTcard";
import styles from "../styles/Stake.module.css";
import Header from "../components/Header";
import React from "react";

const Stake: NextPage = () => {
  const address = useAddress();

  const segAddress = "0xAbFc7687c1c2c55B39229c21de9B703dcd475E60";
  const stakingAddress = "0xB023493228cB8e6208E6A09491B62D7Ab3Bb956D";

  const { contract: segContract } = useContract(segAddress, "nft-drop");
  const { contract: stakingContract } = useContract(stakingAddress);

  const { data: mySegNFTs } = useOwnedNFTs(segContract, address);
  const { data: stakedSegNFTs } = useContractRead(stakingContract, "getStakeInfo", address);

  async function stakeNFT(nftId: string) {
    if(!address) return;

    const isApproved = await segContract?.isApproved(
      address,
      stakingAddress
    );

    if(!isApproved) {
      await segContract?.setApprovalForAll(stakingAddress, true);
    }

    await stakingContract?.call("stake", [nftId])
  }

  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();

  useEffect(() => {
    if (!stakingContract || !address) return;

    async function LoadClaimableRewads() {
      const stakeInfo = await stakingContract?.call("getStakeInfo", address);
      setClaimableRewards(stakeInfo[1]);
    }
    LoadClaimableRewads();
  }, [address, stakingContract]);

  function stake(id: string): any {
    throw new Error("Function not implemented.");
  }

  return (
  <div className={styles.container}>
      <Header />
    <main className={styles.main}>
    <h1>Start Staking</h1>
      <div>
        {mySegNFTs?.map((nft) => (
          <div>
            <h3>{nft.metadata.name}</h3>
            <ThirdwebNftMedia
              metadata={nft.metadata}
              height="100px"
              width="100px"
            />
            <Web3Button
              contractAddress={stakingAddress}
              action={() => stakeNFT(nft.metadata.id)}
            >Stake NFT</Web3Button>
          </div>
        ))}
      </div>
      <h1>Steking</h1>
      <div>
        {stakedSegNFTs && stakedSegNFTs[0].map((stakedNFT: BigNumber) => (
          <div key={stakedNFT.toString()}>
            <NFTCard tokenId={stakedNFT.toNumber()} />
          </div>
        ))}
      </div>
      <br />
      <h1>Claimable</h1>
      {!claimableRewards ? "Losding..." : ethers.utils.formatUnits(claimableRewards, 18)}
      <Web3Button
        contractAddress={stakingAddress}
        action={(stakingContract) => stakingContract.call("claimRewards")}
      >Claim Token</Web3Button>
    </main>
    </div >
  );
};

export default Stake;
