import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const MainNav = (props: Props) => {
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

          <button className="btn btn-ghost mr-10 font-semibold">Connect</button>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
