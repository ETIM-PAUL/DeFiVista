import { FC } from "react";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { Link } from "react-router-dom";
import { dvlogo } from "../assets";

type Props = {};

const MainNav = (props: Props) => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();

  return (

    <div className="navbar shadow-md bg-white shadow-black fixed px-10 text-black">
      <div className="flex-1">
        <Link to="/" className=" btn-ghost">
          <img src={dvlogo} alt="defivista" width={100} height={58} />
        </Link>
      </div>
      <div className="flex-none">
        <div className="flex gap-6">
          <Link to="/" className="btn btn-ghost">
            About Us
          </Link>

          <Link to="/" className="btn btn-ghost">
            Contact Us
          </Link>
          {!wallet ? <button
            className="btn btn-ghost mr-10 font-semibold bg-black hover:bg-black text-white"
            onClick={() =>
              connect()
            }
          >
            {connecting ? "Connecting..." : "Connect Wallet"}
          </button>
            :
            <button className="btn btn-ghost mr-10 font-semibold bg-black hover:bg-black text-white" onClick={() => disconnect(wallet)}>
              Disconnect Wallet
            </button>
          }
          {/* <button className="btn btn-ghost font-semibold">Connect</button> */}

        </div>
      </div>
    </div>
  );
};

export default MainNav;
