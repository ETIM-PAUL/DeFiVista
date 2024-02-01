import React from "react";
import { Link } from "react-router-dom";
import { dvicon, dvlogo } from "../assets";

const MainNav = () => {
  return (
    <div className="navbar bg-white text-black mt-2">
      <div className="flex-1">
        <Link to="/" className=" btn-ghost">
          <img src={dvlogo} alt="defivista" width={100} height={58} />
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="gap-8 mr-28">
          <Link to="/" className="btn btn-ghost">
            About Us
          </Link>
          <Link to="/admin" className="btn text-black btn-ghost">
            Admin
          </Link>
          <Link to="/" className="btn btn-ghost">
            Contact Us
          </Link>
          <button className="btn btn-ghost font-semibold">Connect</button>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
