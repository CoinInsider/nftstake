import { FC } from 'react';
import { ThirdwebNftMedia, useContract, useNFT, Web3Button, } from '@thirdweb-dev/react';

interface NFTcardProps {
    tokenId: number;
}

const NFTCard: FC<NFTcardProps> = ({ tokenId }) => {
    const segAddress = "0xAbFc7687c1c2c55B39229c21de9B703dcd475E60";
    const stakingAddress = "0xB023493228cB8e6208E6A09491B62D7Ab3Bb956D";

    const { contract: segContract } = useContract(segAddress, "nft-drop");
    const { contract: stakingContract } = useContract(stakingAddress);
    const { data: nft } = useNFT (segContract, tokenId,);

    async function withdraw(nftId: string) {
        await stakingContract?.call("withdraw", [nftId]);
    }

    return (
        <>
          {
            nft && (
                <div>
                    <h3>{nft.metadata.name}</h3>
                    {nft.metadata && (
                        <ThirdwebNftMedia
                        metadata={nft.metadata}
                        />
                    )}
                    <Web3Button
                    contractAddress={stakingAddress}
                    action={() => withdraw(nft.metadata.id)}
                    >Withdraw</Web3Button>
                </div>
            )
          }
        </>
    )

}
export default NFTCard;