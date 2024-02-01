import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { allCompanyData, hexToString } from "../constants";
import ShareHolderStats from "./ShareHolderStats";
import Logo from "./Logo";

const CompanyDetails = () => {
  // Get the id from the URL
  const { id } = useParams();
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState<boolean>()

  // Find the company with the matching id
  const company = allCompanyData.find((company) => company.id === id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `{
              input(index: ${Number(id) - 1}) {
                notices {
                  edges {
                    node {
                      payload
                    }
                  }
                }
              }
            }`,
            // query: '{ input(index: 0) {blockNumber} }',
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        const hexData = result.data.input.notices.edges[0].node.payload

        setData(JSON.parse(hexToString(JSON.parse(hexToString(hexData)).createdCompany.payload)));
        setLoading(false);

      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // If no company was found, show a message
  if (!company) {
    return <div>No company found with this ID.</div>;
  }



  // Display the company's details
  return (
    <div className="bg-white mt-14">

      <div className="flex flex-row justify-between items-center mx-20 text- text-black">
        <img
          src={company.companyLogo}
          alt="Company-Logo"
          width={300}
          className="-ml-10"
        />

        <div className="flex flex-col space-y-1">
          <h4 className="font-medium text-base">Company Name</h4>
          <h2>{data?.companyName}</h2>
        </div>

        <div className="flex flex-col space-y-1">
          <h4 className="font-medium text-base">Registration Number</h4>
          <h2>{data?.regNum}</h2>
        </div>

        <div className="flex flex-col space-y-1">
          <h4 className="font-medium text-base">Country</h4>
          <h2>{data?.country}</h2>
        </div>
      </div>

      {/* ...display other details... */}

      <p className="flex text-center text-black text-sm mx-20 leading-8">
        {data?.description}
      </p>

      <div className="flex justify-center mt-10  gap-4">
        <button className="btn btn-ghost  text-lg font-bold bg-base-100">
          Buy Shares
        </button>

        <button className="   bg-white btn btn-ghost text-black border border-black text-lg font-bold">
          Sell Shares
        </button>
      </div>

      <ShareHolderStats shareHolders={data?.shareHolders} />
    </div>
  );
};

export default CompanyDetails;
