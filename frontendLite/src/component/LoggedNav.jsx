import React from 'react'
import { Link } from 'react-router-dom'
import { dvlogo } from "../assets";
import { useConnectWallet } from '@web3-onboard/react';

const LoggedNav = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  return (
    <div className="navbar shadow-md bg-white shadow-black fixed px-10 text-black">
      <div className="flex-1 ">
        <a className="btn-ghost ">
          <img src={dvlogo} alt="defivista" width={100} height={58} />
        </a>
      </div>
      <div className="flex gap-4">
        <Link to="/my-company" className="btn btn-ghost">
          My Company
        </Link>

        <Link to="/create-company" className="btn btn-ghost">
          Add Company
        </Link>

        <Link to="/admin" className="btn btn-ghost">
          Admin
        </Link>

        <button className="btn btn-ghost font-semibold bg-black hover:bg-black text-white" onClick={() => disconnect(wallet)}>
          Disconnect Wallet
        </button>
      </div>
    </div>
  )
}

export default LoggedNav