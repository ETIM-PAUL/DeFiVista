import React from "react";
import { Link } from "react-router-dom";
import { dvicon, dvlogo } from "../assets";

type Props = {};

const MainNav = (props: Props) => {
  return (
    <div>
      <div className="navbar bg-white text-black mt-2">
        <div className="flex-1 ">
          <a className="btn btn-ghost ">
          <img
            src={dvlogo}
            alt="defivista"
            width={150}
            height={58}
            className=""
          />
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="gap-8 mr-28">
            <Link to="/" className="btn btn-ghost">
              About Us
            </Link>
            <Link to="/Admin" className="btn text-black btn-ghost">
              Admin
            </Link>

            <Link to="/" className="btn btn-ghost">
              Contact Us
            </Link>
            <button className="btn btn-ghost font-semibold">Connect</button>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default MainNav;
