import { FC } from "react";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import configFile from "../config.json";
import { Link } from "react-router-dom";

type Props = {};

const MainNav = (props: Props) => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();

  return (
    <div>
      <div className="navbar bg-base-100 mt-2">
        <div className="flex-1">
          <a className="btn btn-ghost text-2xl font-bold">DeFiVista</a>
        </div>
        <div className="flex-none gap-2">
          <div className="gap-8 mr-28">
            <Link to="/" className="btn btn-ghost">
              About Us
            </Link>

            <Link to="/" className="btn btn-ghost">
              Contact Us
            </Link>
          </div>
          {!wallet ? <button
            className="btn btn-ghost mr-10 font-semibold bg-white text-black"
            onClick={() =>
              connect()
            }
          >
            {connecting ? "Connecting..." : "Connect Wallet"}
          </button>
            :
            <button className="btn btn-ghost mr-10 font-semibold bg-white text-black" onClick={() => disconnect(wallet)}>
              Disconnect Wallet
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default MainNav;
