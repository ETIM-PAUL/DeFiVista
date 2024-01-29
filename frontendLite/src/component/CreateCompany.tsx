import React, { useState } from "react";

type Props = {};

const CreateCompany = (props: Props) => {
  const [companyName, setCompanyName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [country, setCountry] = useState("");
  const [companyAdminAddr, setCompanyAdminAddr] = useState("");
  const [minShare, setMinShare] = useState<number>();
  const [pricePerShare, setPricePerShare] = useState<number>(0);

  return (
    <form
      action=""
      className="flex flex-col items-center mx-auto justify-center py-10"
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
              className="text-white   h-[33px] bg-transparent border border-[#999999]  outline-none p-4 "
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
              className="text-white  h-[33px] bg-transparent border border-[#999999]  outline-none p-4 "
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
              className="text-white   h-[33px] bg-transparent border border-[#999999]  outline-none p-4 "
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
              placeholder="Company Admin Address"
              required
              className="text-white  h-[33px] bg-transparent border border-[#999999]  outline-none p-4 "
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
              className="text-white   h-[33px] bg-transparent border border-[#999999]  outline-none p-4 "
            />
          </div>

          <div className="flex flex-col space-y-1 ">
            <label htmlFor="minShare">Minimum Share</label>
            <input
              value={companyAdminAddr}
              onChange={(e: any) => setMinShare(e.target.value)}
              type="number"
              name="minShare"
              id="minShare"
              placeholder="Minimum Share"
              required
              className="text-white  h-[33px] bg-transparent border border-[#999999]  outline-none p-4 "
            />
          </div>
        </div>
      </div>

      <button className="justify-center items-center mt-20">
        Create Company
      </button>
    </form>
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
