import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { allCompanyData, hexToString } from "../constants";
import ShareHolderStats from "./ShareHolderStats";
import Logo from "./Logo";
import { useRollups } from "../useRollups";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useNoticesQuery } from "../generated/graphql";

const CompanyDetails = () => {
  // Get the id from the URL
  const { id } = useParams();
  const [dataInfo, setData] = useState()
  const [loading, setLoading] = useState()
  const rollups = useRollups("0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [result, reexecuteQuery] = useNoticesQuery();
  const { data, fetching, error } = result;
  // Find the company with the matching id
  const company = allCompanyData.find((company) => company.id === id);

  // Function to filter out duplicates based on a specific key

  function findCompanyWithConditions(dataArray) {
    // Filter companies with active status and non-empty shareholders
    const activeCompanies = dataArray.filter(
      company => company.payload.status === 1 && company.payload.shareHolders.length > 0 && company.payload.id === id
    );

    // If there are active companies, return the last one
    if (activeCompanies.length > 0) {
      return activeCompanies[activeCompanies.length - 1];
    }

    // If no active companies found, return the first company with status 0
    const inactiveCompany = dataArray.find(company => company.payload.status === 1 && company.payload.id === id);
    console.log(inactiveCompany)

    return inactiveCompany || null; // Return null if no matching company is found
  }
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
              notices {
                edges {
                  node {
                    index
        input {
          index
        }
                    payload
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

        const parsed = result.data.notices.edges
          .map((node) => {
            const n = node.node;
            let inputPayload = n?.input.payload;
            if (inputPayload) {
              try {
                inputPayload = ethers.utils.toUtf8String(inputPayload);
              } catch (e) {
                inputPayload = inputPayload + " (hex)";
              }
            } else {
              inputPayload = "(empty)";
            }
            let payload = n?.payload;
            if (payload) {
              try {
                payload = ethers.utils.toUtf8String(payload);
              } catch (e) {
                payload = payload + " (hex)";
              }
            } else {
              payload = "(empty)";
            }
            // console.log(JSON.parse(hexToString(JSON.parse(payload).payload)))
            return {
              payload: JSON.parse(
                JSON.parse(
                  JSON.stringify(
                    JSON.parse(
                      JSON.stringify(
                        hexToString(JSON.parse(payload).payload)
                      )
                    )
                  )
                )
              ),
              input: n ? { index: n.input.index, payload: inputPayload } : {},
            };
          }).sort((b, a) => {
            if (a.input.index === b.input.index) {
              return b.index - a.index;
            } else {
              return b.input.index - a.input.index;
            }
          });

        const g = findCompanyWithConditions(parsed)

        setData(g.payload)
        // console.log(parsed.find((i) => i.payload.status === 1))

        // const hexData = result.data.input.notices.edges[0].node.payload

        // setData(JSON.parse(hexToString(JSON.parse(hexToString(hexData)).createdCompany.payload)));
        setLoading(false);

      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const buyShares = async () => {
    // setIsSubmitLoading(true)
    try {
      if (rollups) {
        try {
          let str = `{"method":"shares_purchase","company_id":${Number(id)},"amount_of_shares":"${2}","amount":"${5}"}`
          let payload = ethers.utils.toUtf8Bytes(str);

          const result = await rollups.inputContract.addInput("0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C", payload);
          console.log("waiting for confirmation...");
          const receipt = await result.wait(1);
          // Search for the InputAdded event
          const event = receipt.events?.find((e) => e.event === "InputAdded");
          // setIsSubmitLoading(true)
          toast("Company Shares Purchased");
        } catch (e) {
          console.log(`${e}`);
        }
      }
      setIsSubmitLoading(false)
    } catch (error) {
      // setIsSubmitLoading(false)
      console.log("Error", error);
    }
  };

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
                <span className="font-bold">{dataInfo?.companyName} ~ </span>
                <span className="text-sm pt-1">{" "}{dataInfo?.regNum}</span>
              </h3>
              <p className="max-w-[300px] my-4">
                {dataInfo?.description}
              </p>
              <div className="font-medium leading-6 mt-4">
                <div className="flex justify-between mb-2">
                  <div className="text-[#44494E] capitalize">
                    Country
                  </div>
                  <div>{dataInfo?.country}</div>
                </div>
                <hr />
                <div className="flex justify-between mb-2">
                  <div className="text-[#44494E] capitalize">
                    State
                  </div>
                  <div>{dataInfo?.state}</div>
                </div>
                <hr />
                <div className="flex justify-between my-2">
                  <div className="text-[#44494E]">
                    Price Per Share
                  </div>
                  <div>{dataInfo?.pricePerShare}</div>
                </div>
                <hr />
                <div className="flex justify-between my-2">
                  <div className="text-[#44494E]">
                    Minimum Shares
                  </div>
                  <div>{dataInfo?.shareHolders.length}</div>
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
                src={`https://ipfs.io/${dataInfo?.companyLogo}`}
                className="w-[100px] sm:w-[200px]"
              />

              <div className="flex w-full mt-3">
                <button onClick={() => buyShares()} className="btn btn-ghost w-full text-lg font-bold bg-base-100">
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

            </div>
          </div>
        </div>

      </div>

      <ShareHolderStats shareHolders={dataInfo?.shareHolders.length > 0 && dataInfo?.shareHolders} />
    </div>
  );
};

export default CompanyDetails;
