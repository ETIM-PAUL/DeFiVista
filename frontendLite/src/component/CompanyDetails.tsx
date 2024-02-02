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
    <div className="bg-white mt-20">

      <div
        className={`flex justify-center flex-col-reverse md:flex-row items-center pt-10 w-full h-full mx-0 p-0`}
      >
        <div className="flex justify-between gap-4 px-7 py-7 mx-4 sm:mx-0 w-sm sm:w-[550px] w-full bg-white my-0 h-fit border shadow-md rounded-lg border-black">
          <div className="items-center justify-center flex">
            <div>
              <h3 className="mt-5 text-xl flex items-center">
                <span className="font-bold">{data?.companyName} ~ </span>
                <span className="text-sm pt-1">{" "}{data?.regNum}</span>
              </h3>
              <p className="max-w-[300px] my-4">
                {data?.description}
              </p>
              <div className="font-medium leading-6 mt-4">
                <div className="flex justify-between mb-2">
                  <div className="text-[#44494E] capitalize">
                    Country
                  </div>
                  <div>{data?.country}</div>
                </div>
                <hr />
                <div className="flex justify-between mb-2">
                  <div className="text-[#44494E] capitalize">
                    State
                  </div>
                  <div>{data?.state}</div>
                </div>
                <hr />
                <div className="flex justify-between my-2">
                  <div className="text-[#44494E]">
                    Price Per Share
                  </div>
                  <div>{data?.pricePerShare}</div>
                </div>
                <hr />
                <div className="flex justify-between my-2">
                  <div className="text-[#44494E]">
                    Minimum Shares
                  </div>
                  <div>{data?.minShare}</div>
                </div>
              </div>
            </div>
          </div>
          <div
            className=""
            id="stripe-payment-form"
          >
            <div className="flex-col">

              <img
                src={company.companyLogo}
                className="w-[100px] sm:w-[200px]"
              />

              <div className="flex w-full mt-3">
                <button className="btn btn-ghost w-full text-lg font-bold bg-base-100">
                  Buy Shares
                </button>
              </div>
              <div
                className="flex items-center w-full mt-3"
              >
                <button className="btn btn-ghost w-full text-lg font-bold bg-base-100">
                  Withdraw Shares
                </button>
              </div>
              {/* )} */}
            </div>
          </div>
        </div>

      </div>
      {/* <div className="flex flex-row justify-between items-center mx-20 text- text-black">
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
      </div> */}

      <ShareHolderStats shareHolders={data?.shareHolders} />
    </div>
  );
};

export default CompanyDetails;
