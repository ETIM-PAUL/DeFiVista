import React from "react";
import { Link } from "react-router-dom";
import { dvlogo } from "../assets";

type Props = {};

const Logo = (props: Props) => {
  return (
    <div>
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-2xl font-bold">
          <img
            src={dvlogo}
            alt="defivista"
            width={100}
            height={58}
            className=""
          />
        
        </Link>
      </div>
    </div>
  );
};

export default Logo;
