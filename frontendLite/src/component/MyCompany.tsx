import React from "react";
import { myCompanyData } from "../constants";
import { Link } from "react-router-dom";
import Logo from "./Logo";

type Props = {};

const MyCompany = (props: Props) => {
  return (
    <div className="bg-white">
      <div className="navbar bg-base-100 mt-2">
        <div className="flex-1">
          <Logo />
        </div>
        <div className="flex-none gap-20">
          <div className="gap-20 mr-28">
            <Link to="/companies" className="btn btn-ghost">
              All Company
            </Link>

            <Link to="/my-company" className="btn btn-ghost">
              My Company
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {myCompanyData.map((myCompany) => (
          <div
            key={myCompany.id}
            className=" px-4 py-3 border-2 rounded-xl shadow-md mt-10 mx-10 text-black"
          >
            <div className="flex flex-row items-center justify-between">
              <img src={myCompany.companyLogo} alt="Company-Logo" width={100} />

              <div className="flex flex-col ">
                <h2 className="font-semibold text-lg ">
                  {myCompany.companyName}
                </h2>
                <h2>{myCompany.regNum}</h2>
                <h2>{myCompany.country} </h2>
              </div>
            </div>

            <div className="space-y-4 text-lg mt-10 space-x-10">
              <p className="font-medium space-x-10">
                Total Shares Owned: {myCompany.totalShares}
              </p>
            </div>

            <div className="flex justify-center mt-10  gap-10 mb-6">
              <button className=" text-white btn btn-ghost  text-lg font-bold bg-base-100">
                Buy More
              </button>

              <button className="   bg-slate-500   btn btn-ghost text-lg font-bold">
                Sell Shares
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCompany;
