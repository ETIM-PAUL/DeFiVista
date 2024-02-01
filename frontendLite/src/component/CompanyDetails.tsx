import React from "react";
import { Link, useParams } from "react-router-dom";
import { allCompanyData } from "../constants";
import ShareHolderStats from "./ShareHolderStats";
import Logo from "./Logo";

const CompanyDetails = () => {
  // Get the id from the URL
  const { id } = useParams();

  // Find the company with the matching id
  const company = allCompanyData.find((company) => company.id === id);

  // If no company was found, show a message
  if (!company) {
    return <div>No company found with this ID.</div>;
  }

  // Display the company's details
  return (
    <div className="bg-white">

      <div className="flex flex-row justify-between items-center mx-20 text-xl text-black  font-semibold">
        <img
          src={company.companyLogo}
          alt="Company-Logo"
          width={300}
          className="-ml-10"
        />

        <div className="flex flex-col space-y-3">
          <h4 className="font-medium text-base">Company Name</h4>
          <h2>{company.companyName}</h2>
        </div>

        <div className="flex flex-col space-y-3">
          <h4 className="font-medium text-base">Registeration Number</h4>
          <h2>{company.regNum}</h2>
        </div>

        <div className="flex flex-col space-y-3">
          <h4 className="font-medium text-base">Country</h4>
          <h2>{company.country}</h2>
        </div>
      </div>

      {/* ...display other details... */}

      <p className="flex text-center text-black text-lg mx-20 leading-8">
        {company.description}
      </p>

      <div className="flex justify-center mt-10  gap-10">
        <button className="btn btn-ghost  text-lg font-bold bg-base-100">
          Buy Shares
        </button>

        <button className="   bg-slate-500   btn btn-ghost text-lg font-bold">
          Sell Shares
        </button>
      </div>

      <ShareHolderStats />
    </div>
  );
};

export default CompanyDetails;
