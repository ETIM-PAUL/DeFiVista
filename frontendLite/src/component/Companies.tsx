import React from "react";
import { Link } from "react-router-dom";
import { allCompanyData } from "../constants";
import { dvlogo } from "../assets";


type Props = {};

const Companies = (props: Props) => {
  return (
    <div className="bg-white">

<div className="navbar bg-white text-black mt-2">
        <div className="flex-1 ">
          <a className="btn-ghost ">
          <img src={dvlogo} alt="defivista" width={100} height={58} />
          </a>
        </div>
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
      </div>

    

      {/* CompaniesData */}

      <div className="grid grid-cols-1 md:grid-cols-3 bg-slate-400 gap-4">
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

            <Link
              to={`/company-details/${companiesData.id}`}
              className="flex items-center justify-center btn btn-ghost text-lg font-bold mt-10 "
            >
              View More
            </Link>
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
