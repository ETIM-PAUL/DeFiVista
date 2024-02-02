import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { allCompanyData, hexToString } from "../constants";
import ShareHolderStats from "./ShareHolderStats";
import Logo from "./Logo";
import { useRollups } from "../useRollups";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useNoticesQuery } from "../generated/graphql";
import { useConnectWallet } from "@web3-onboard/react";

const CompanyDetails = () => {
  // Get the id from the URL
  const { id } = useParams();
  const [wallet] = useConnectWallet();
  const [dataInfo, setData] = useState()
  const [loading, setLoading] = useState()
  const rollups = useRollups("0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showModal, setModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);

  const [numberOfShares, setNumberOfShares] = useState(0);
  const [totalShares, setTotalShares] = useState(0);
  const navigate = useNavigate()

  // Find the company with the matching id
  const company = allCompanyData.find((company) => company.id === id);

  // Function to filter out duplicates based on a specific key

  function findCompanyWithConditions(dataArray) {
    // Filter companies with active status and non-empty shareholders
    const activeCompanies = dataArray.filter(
      company => company.payload.status === 1 && company.payload.shareHolders.length > 0 && company.payload.id === Number(id)
    );
    // console.log(dataArray)
    // If there are active companies, return the last one
    if (activeCompanies.length > 0) {
      return activeCompanies[activeCompanies.length - 1];
    }

    // If no active companies found, return the first company with status 0
    const inactiveCompany = dataArray.find(company => company.payload.status === 1 && company.payload.id === Number(id));

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


  const withdrawShares = async () => {
    setWithdrawing(true)
    try {
      if (rollups) {
        try {
          let str = `{"method":"shares_withdraw","company_id":${Number(id)},"amount":${Number(numberOfShares)}"}`
          let payload = ethers.utils.toUtf8Bytes(str);

          const result = await rollups.inputContract.addInput("0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C", payload);
          console.log("waiting for confirmation...");
          const receipt = await result.wait(1);
          // Search for the InputAdded event
          const event = receipt.events?.find((e) => e.event === "InputAdded");
          setWithdrawing(true)
          setModal(false)
          navigate("/")
          toast("Company Shares Purchased");
        } catch (e) {
          console.log(`${e}`);
        }
      }
      setWithdrawing(false)
    } catch (error) {
      setIsSubmitLoading(false)
      console.log("Error", error);
    }
  };

  const buyShares = async () => {
    setIsSubmitLoading(true)
    try {
      if (rollups) {
        try {
          let str = `{"method":"shares_purchase","company_id":${Number(id)},"amount_of_shares":${Number(numberOfShares)},"amount":${Number(totalShares)}"}`
          let payload = ethers.utils.toUtf8Bytes(str);

          const result = await rollups.inputContract.addInput("0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C", payload);
          console.log("waiting for confirmation...");
          const receipt = await result.wait(1);
          // Search for the InputAdded event
          const event = receipt.events?.find((e) => e.event === "InputAdded");
          setIsSubmitLoading(true)
          setModal(false)
          navigate("/")
          toast("Company Shares Purchased");
        } catch (e) {
          console.log(`${e}`);
        }
      }
      setIsSubmitLoading(false)
    } catch (error) {
      setIsSubmitLoading(false)
      console.log("Error", error);
    }
  };

  function checkShare(array, address) {
    const hasGivenEvmAddress = array?.map(shareholder => {
      return shareholder.msg_sender === address;
    });
    const containsGivenEvmAddress = hasGivenEvmAddress?.includes(true);
    return containsGivenEvmAddress
  }
  function checkAmountShare() {
    const hasGivenEvmAddress = dataInfo?.shareHolders?.filter(shareholder =>
      shareholder.msg_sender === wallet?.wallet?.accounts?.[0]?.address
    );
    return Number(hasGivenEvmAddress[0].amount_of_shares)
  }

  // If no company was found, show a message
  if (!company) {
    return <div>No company found with this ID.</div>;
  }

  const calculateTotalShares = (value) => {
    if (value >= dataInfo?.minShare) {
      setErrorMessage("")
      setTotalShares(value * dataInfo?.pricePerShare);
    } else {
      setErrorMessage(`Please Enter an amount greater than ${dataInfo?.minShare} (Minimum shares)`)
      setTotalShares(0);
    }
  };

  const checkMateBalance = (value) => {
    if (checkAmountShare() < value) {
      setErrorMessage(`Please Enter an amount less than or equal ${checkAmountShare()}`)
      return;
    } else {
      setErrorMessage("")
      setTotalShares(value * dataInfo?.pricePerShare);
    }
  };

  // Display the company's details
  return (
    <div className="bg-white mt-20">
      <div
        className={`flex justify-center flex-col-reverse md:flex-row items-center pt-10 w-full h-full mx-0 p-0`}
      >
        <div className="flex justify-between gap-8 px-7 py-7 mx-4 sm:mx-0 w-sm sm:w-[600px] w-full bg-white my-0 h-fit border shadow-md rounded-lg border-black">
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
                    Minimum Shares You can Purchased From {dataInfo?.companyName}
                  </div>
                  <div>{" "} {dataInfo?.minShare}</div>
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
                <button onClick={() => setModal(true)} className="btn btn-ghost w-full text-sm font-bold bg-base-100">
                  Buy Shares
                </button>
              </div>
              {checkShare(dataInfo?.shareHolders, wallet?.wallet?.accounts?.[0]?.address) &&
                <div
                  className="flex items-center w-full mt-3"
                >
                  <button
                    onClick={() => setWithdrawModal(true)} className="btn btn-ghost w-full h-fit text-sm font-bold bg-base-100">
                    Withdraw
                  </button>
                </div>
              }

            </div>
          </div>
        </div>

      </div>

      <ShareHolderStats shareHolders={dataInfo?.shareHolders.length > 0 && dataInfo?.shareHolders} />

      {withdrawModal && (
        <>
          <input
            type="checkbox"
            checked
            id="my_modal_6"
            className="modal-toggle"
          />
          <div className="modal bg-white" role="dialog">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">
                Withdraw Shares Seamlessly at {dataInfo?.companyName}
              </h3>

              <div>
                <p className="text-red-500 italic py-1">{errorMessage}</p>
                <div className="block  gap-14   ">
                  <div className="flex flex-col space-y-1 ">
                    <label htmlFor="companyName">Number of Shares To Withdraw</label>
                    <input
                      type="number"
                      placeholder="Enter Number of Shares"
                      value={numberOfShares}
                      onChange={(e) => {
                        setNumberOfShares(e.target.value);
                        checkMateBalance(e.target.value);
                      }}
                      className="rounded h-[40px] bg-transparent border border-[#999999] outline-none p-3 "
                    />
                  </div>

                  <div className="flex flex-col space-y-1 mt-4">
                    <label htmlFor="regNumber">How Much You will Get</label>
                    <input
                      type="number"
                      placeholder="Total Shares"
                      value={totalShares}
                      disabled
                      className="rounded  h-[40px] bg-transparent border border-[#999999]  outline-none p-3 "
                    />
                  </div>
                </div>
              </div>
              <div className="modal-action">
                <label
                  disabled={withdrawing}
                  onClick={() => setWithdrawModal(false)}
                  htmlFor="my_modal_6 bg-"
                  className="btn"
                >
                  Close!
                </label>
                <button
                  disabled={withdrawing}
                  onClick={() => withdrawShares()}
                  className="btn bg-white text-black hover:bg-white"
                >
                  {isSubmitLoading ? "Processing" : "Proceed!"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {showModal && (
        <>
          <input
            type="checkbox"
            checked
            id="my_modal_6"
            className="modal-toggle"
          />
          <div className="modal bg-white" role="dialog">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">
                Buy Shares Seamlessly at {dataInfo?.companyName}
              </h3>

              <div>
                <p className="text-red-500 italic py-1">{errorMessage}</p>
                <div className="block  gap-14   ">
                  <div className="flex flex-col space-y-1 ">
                    <label htmlFor="companyName">Number of Shares</label>
                    <input
                      type="number"
                      placeholder="Enter Number of Shares"
                      value={numberOfShares}
                      onChange={(e) => {
                        setNumberOfShares(e.target.value);
                        calculateTotalShares(e.target.value);
                      }}
                      className="rounded h-[40px] bg-transparent border border-[#999999] outline-none p-3 "
                    />
                  </div>

                  <div className="flex flex-col space-y-1 mt-4">
                    <label htmlFor="regNumber">How Much You will Pay</label>
                    <input
                      type="number"
                      placeholder="Total Shares"
                      value={totalShares}
                      disabled
                      className="rounded  h-[40px] bg-transparent border border-[#999999]  outline-none p-3 "
                    />
                  </div>
                </div>
              </div>
              <div className="modal-action">
                <label
                  disabled={isSubmitLoading}
                  onClick={() => setModal(false)}
                  htmlFor="my_modal_6 bg-"
                  className="btn"
                >
                  Close!
                </label>
                <button
                  disabled={isSubmitLoading}
                  onClick={() => buyShares()}
                  className="btn bg-white text-black hover:bg-white"
                >
                  {isSubmitLoading ? "Processing" : "Proceed!"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyDetails;
