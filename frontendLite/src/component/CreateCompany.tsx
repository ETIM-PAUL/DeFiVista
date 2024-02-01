import React, { useState } from "react";
import { Link } from "react-router-dom";
import { dvlogo } from "../assets";


type Props = {};

const CreateCompany = (props: Props) => {
  const [companyName, setCompanyName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [country, setCountry] = useState("");
  const [companyAdminAddr, setCompanyAdminAddr] = useState("");
  const [minShare, setMinShare] = useState<number>();
  const [pricePerShare, setPricePerShare] = useState<number>();

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="navbar bg-white text-black mt-2">
      <div className="flex-1">
        <Link to="/" className=" btn-ghost">
          <img src={dvlogo} alt="defivista" width={100} height={58} />
        </Link>
      </div>
      <div className="flex-none gap-2">
      <div className="gap-8 mr-28">
            <Link to="/my-company" className="btn btn-ghost">
              My Company
            </Link>

            <Link to="/admin" className="btn btn-ghost">
              Admin
            </Link>
          </div>
      </div>
    </div>
         
      

      <form
        action=""
        onSubmit={formSubmitHandler}
        className="flex flex-col items-center mx-auto bg-slate-300 justify-center py-10"
      >
        <div className="space-y-6">
          <div className="flex flex-row  gap-14   ">
            <div className="flex flex-col space-y-1 ">
              <label htmlFor="companyName">Company Name</label>
              <input
                value={companyName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCompanyName(e.target.value)
                }
                type="text"
                name="companyName"
                id="companyName"
                placeholder="The Name of Your Company"
                required
                className="text-black   h-[40px] bg-transparent border border-[#999999]  outline-none p-4 "
              />
            </div>

            <div className="flex flex-col space-y-1 ">
              <label htmlFor="regNumber">Registeration Number</label>
              <input
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                type="text"
                name="regNumber"
                id="regNumber"
                placeholder="Company Registeration Number"
                required
                className="text-black   h-[40px] bg-transparent border border-[#999999]  outline-none p-4 "
              />
            </div>
          </div>

          {/*  */}

          <div className="flex flex-row  gap-14   ">
            <div className="flex flex-col space-y-1 ">
              <label htmlFor="country">Country</label>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                type="text"
                name="country"
                id="country"
                placeholder="Country where company is registered"
                required
                className="text-black   h-[40px] bg-transparent border border-[#999999]  outline-none p-4 "
              />
            </div>

            <div className="flex flex-col space-y-1 ">
              <label htmlFor="companyAdminAddr">Admin Address</label>
              <input
                value={companyAdminAddr}
                onChange={(e) => setCompanyAdminAddr(e.target.value)}
                type="text"
                name="companyAdminAddr"
                id="companyAdminAddr"
                placeholder="Company Admin Wallet Address"
                required
                className="text-black   h-[40px] bg-transparent border border-[#999999]  outline-none p-4 "
              />
            </div>
          </div>

          {/*  */}

          <div className="flex flex-row  gap-14   ">
            <div className="flex flex-col space-y-1 ">
              <label htmlFor="pricePerShare">Price per share</label>
              <input
                value={pricePerShare}
                onChange={(e: any) => setPricePerShare(e.target.value)}
                type="number"
                name="pricePerShare"
                id="pricePerShare"
                placeholder="Price Per Share"
                required
                className="text-black   h-[40px] bg-transparent border border-[#999999]  outline-none p-4 "
              />
            </div>

            <div className="flex flex-col space-y-1 ">
              <label htmlFor="minShare">Minimum Share</label>
              <input
                value={minShare}
                onChange={(e: any) => setMinShare(e.target.value)}
                type="number"
                name="minShare"
                id="minShare"
                placeholder="Minimum Share"
                required
                className="text-black   h-[40px] bg-transparent border border-[#999999]  outline-none p-4 "
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1 mt-10 ">
          <label htmlFor="companyLogo">Upload Company Logo to IPFS</label>

          <input
            type="file"
            src=""
            alt="Company Logo"
            placeholder="Upload Logo Company Logo to IPFS"
          />
        </div>

        <button
          type="submit"
          className="justify-center text-black items-center mt-12 btn btn-ghost text-xl font-bold"
        >
          Create Company
        </button>
      </form>
    </>
  );
};

export default CreateCompany;

/**
 * 
 *  companyName,
    companyAdminAddress,
    companyLogo,
    pricePerShare,
    minShare,
    country,
    regNum,
 * 
 * 
 * 
 */
