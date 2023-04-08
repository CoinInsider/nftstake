import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import styles from "../styles/Header.module.css";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();

     return (
        <div className={styles.container}>
         <div>
              <Link legacyBehavior href={"/"}><a id="link">Home..</a></Link>
              <Link legacyBehavior href={"/nfts"}><a id="link">NFT..</a></Link>
              <Link legacyBehavior href={"/my"}><a id="link">My..</a></Link>
              <Link legacyBehavior href={"/stake"}><a id="link">Stake</a></Link>
        </div>
            <ConnectWallet colorMode="light" accentColor="#9702c4" />
        </div>
     );
};

export default Header;
