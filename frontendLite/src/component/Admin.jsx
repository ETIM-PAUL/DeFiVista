import React, { useState } from "react";
import { ethers } from "ethers";
import { useNoticesQuery } from "../generated/graphql";
import { Link } from "react-router-dom";
import dvlogo from "../assets";
import { useRollups } from "../useRollups"; 
import { toast } from "react-toastify";

const Admin = (props) => {
  const [result, reexecuteQuery] = useNoticesQuery();
  const { data, fetching, error } = result;
  const cartesiRollups = useRollups("0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C");

  const handleVerify = async (companyId) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Assuming your Cartesi Rollups contract has a verifyCompany function
      const cartesiContract = cartesiRollups.getContract();

      const msg_sender = await signer.getAddress();
      const isDappAdmin = msg_sender;

      if (!isDappAdmin) {
        throw new Error('Not authorized. Only DApp admins can perform this action.');
      }

      // Open MetaMask modal for transaction signing
      const transaction = await cartesiContract.verifyCompany(companyId);

      // Wait for the transaction to be mined
      await transaction.wait();

      console.log(`Updating company status in the backend`);
      // Placeholder for updating the company status in the frontend
      console.log(`Updating company status in the frontend`);

      // Placeholder for generating a notice
      const notice_payload = `{{"type":"update_company_status","content":${JSON.stringify({
        id: companyId,
        status: 'verified',
      })}}}`;
      console.log(`Company ${companyId} status updated`);

      // After successful verification, re-fetch notices to update the UI
      reexecuteQuery();
    } catch (error) {
      console.error('Verification failed:', error);
      // Handle errors or display a message to the user
      toast.error(`Verification failed`);
    }
  };

  return (
    <div className="bg-white p-10 mt-20">
      <div className="font-bold txt-black flex justify-between items-center">
        <span>All Companies</span>
        <label
          htmlFor="suggestInvestmentModal"
         
          className="btn"
        >
          Suggest Investment
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
        {data &&
          data.notices.edges.map((node, index) => {
            const item = node.node;

            return (
              <div key={index} className="border rounded-md shadow-md">
                <div key={index} className=" px-4 py-3 text-black">
                  <div className="flex flex-row items-center justify-between">
                    <img src={dvlogo} alt="Company-Logo" width={100} />
                    <div className="flex flex-col text-sm">
                      <h2 className="font-medium text-md">
                        {item?.payload?.companyName}
                      </h2>
                      <h2>{item?.payload?.regNum}</h2>
                    </div>
                  </div>
                  <div className="space-y-4 text-sm">
                    <p>Country: {item?.payload?.country} </p>
                    <p>Price Per Share: {item?.payload?.pricePerShare}ETH</p>
                    <p>
                      Minimum Purchase Share: {item?.payload?.minShare}Shares{" "}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/company-details/${item?.payload?.id}`}
                  className={`flex items-center justify-center bg-black border-t rounded-b-md p-3 text-xs font-bold mt-1 ${
                    item?.payload?.status !== 'verified' ? 'disabled' : ''
                  }`}
                  onClick={() => {
                    if (item?.payload?.status !== 'verified') {
                      handleVerify(item?.payload?.id);
                    }
                  }}
                >
                  {item?.payload?.status === 'verified'
                    ? 'View More'
                    : 'Verify and View More'}
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Admin;
