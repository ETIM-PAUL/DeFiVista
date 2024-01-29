import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Logo = (props: Props) => {
  return (
    <div>
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-2xl font-bold">
          DeFiVista
        </Link>
      </div>
    </div>
  );
};

export default Logo;
