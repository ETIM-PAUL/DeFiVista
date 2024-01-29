import React from "react";
import { Link } from "react-router-dom";
import { allCompanyData } from "../constants";

type Props = {};

const Companies = (props: Props) => {
  return (
    <div className="">
      <div className="navbar bg-base-100 mt-2">
        <div className="flex-1">
          <a className="btn btn-ghost text-2xl font-bold">DeFiVista</a>
        </div>
        <div className="flex-none gap-8">
          <div className="gap-8 mr-28">
            <Link to="/my-company" className="btn btn-ghost">
              My Company
            </Link>

            <Link to="/create-company" className="btn btn-ghost">
              Add Company
            </Link>

            <Link to="/admin" className="btn btn-ghost">
              Admin
            </Link>
          </div>

          {/* <button className="btn btn-ghost mr-10 font-semibold">Connect</button> */}
        </div>
      </div>

      {/* CompaniesData */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {allCompanyData.map((companiesData) => (
          <div
            key={companiesData.id}
            className=" px-4 py-3 border-2 rounded-xl shadow-md mt-10 mx-10 text-black"
          >
            <div className="flex flex-row items-center justify-between">
              <img
                src={companiesData.companyLogo}
                alt="Company-Logo"
                width={100}
              />

              <div className="flex flex-col ">
                <h2 className="font-medium ">{companiesData.companyName}</h2>
                <h2>{companiesData.regNum}</h2>
              </div>
            </div>

            <div className="space-y-4 text-lg">
              <p>Country: {companiesData.country} </p>
              <p>Price Per Share: {companiesData.pricePerShare}</p>
              <p>Minimum Share: {companiesData.minShare} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;

//  {availableBounties &&
//         availableBounties?.map((bountiesData: any) => (
//           <div
//             key={bountiesData.id}
//             className=""
//             onClick={() => handleBountyClick(bountiesData)}
//           >
//             <div className="border-[#1F1F1F] border flex mt-4 mx-6 relative">
//               <div className="flex flex-row gap-4 p-6 w-full">
//                 <Image
//                   src={bountiesData.image ? "" : DummyImage}
//                   alt="bountyImage"
//                   width={200}
//                   className=""
//                 />
