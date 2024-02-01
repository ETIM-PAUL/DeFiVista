import React, { useState } from "react";
import { Link } from "react-router-dom";
import { allCompanyData } from "../constants";
import { dvlogo } from "../assets";

const AdminPage = () => {
  const [companies, setCompanies] = useState(allCompanyData);

  const handleVerify = (companyId: string) => {
    // Update the status of the company to true
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === companyId ? { ...company, status: true } : company
      )
    );
  };
  

  return (
    <div>
      <div className="bg-white">
        <div className="navbar bg-white text-black mt-2">
          <div className="flex-1 ">
            <Link to="/" className="btn-ghost">
              <img src={dvlogo} alt="defivista" width={100} height={58} />
            </Link>
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
      </div>

      {/* CompaniesData */}
      <div className="grid grid-cols-1 md:grid-cols-3 bg-slate-400 gap-4">
        {companies.map((companyData) => (
          <div
            key={companyData.id}
            className="px-4 py-3 border-2 rounded-xl shadow-md mt-10 mx-10 text-black"
          >
            <div className="flex flex-row items-center justify-between">
              <img src={companyData.companyLogo} alt="Company-Logo" width={100} />
              <div className="flex flex-col ">
                <h2 className="font-medium ">{companyData.companyName}</h2>
                <h2>{companyData.regNum}</h2>
              </div>
            </div>
            <div className="space-y-4 text-lg">
              <p>Country: {companyData.country} </p>
              <p>Price Per Share: {companyData.pricePerShare}</p>
              <p>Minimum Share: {companyData.minShare} </p>
              <p>Status: {companyData.status ? "Verified" : "Not Verified"}</p>
            </div>
            {!companyData.status && (
              <button
                onClick={() => handleVerify(companyData.id)}
                className="btn bg-green-600 font-bold mt-4"
              >
                Verify Company
              </button>
            )}
            <Link
              to={`/company-details/${companyData.id}`}
              className="flex items-center justify-center btn btn-ghost text-lg font-bold mt-4"
            >
              View More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
