import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNoticesQuery } from "../generated/graphql";
import { Link } from "react-router-dom";
import { allCompanyData } from "../constants";
import { dvlogo } from "../assets";

function hexToString(hex) {
  // Remove the '0x' prefix
  const strippedHexString = hex.slice(2);

  // Convert the hex string to a buffer
  const buffer = Buffer.from(strippedHexString, "hex");

  // Convert the buffer to a string
  const resultString = buffer.toString("utf-8");
  return resultString;
}

const Companies = (props) => {
  const [showModal, setModal] = useState(false);
  const [result, reexecuteQuery] = useNoticesQuery();
  const { data, fetching, error } = result;

  const notices =
    data &&
    data.notices.edges
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
      })
      .sort((b, a) => {
        if (a.input.index === b.input.index) {
          return b.index - a.index;
        } else {
          return b.input.index - a.input.index;
        }
      });
  // Function to filter out duplicates based on a specific key
  function filterDuplicates(arr, key) {
    // Create an object to store unique company objects based on their id
    const uniqueCompanies = arr.reduce((acc, current) => {
      const companyId = current.payload.id;

      // Only add the company to the accumulator if it has status 1
      if (current.payload.status === 1) {
        acc[companyId] = current;
      }

      return acc;
    }, {});

    // Convert the values of the uniqueCompanies object back to an array
    const resultArray = Object.values(uniqueCompanies);

    return resultArray;
  }


  return (
    <div className="bg-white p-10 mt-20">
      {/* CompaniesData */}
      <div className="font-bold txt-black flex justify-between items-center">
        <span>All Active Companies</span>
        <label
          htmlFor="my_modal_6"
          onClick={() => setModal(true)}
          className="btn"
        >
          Suggest Investment
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
        {notices &&
          notices.length > 0 &&
          filterDuplicates(notices, 'companyLogo').map((item, index) => (
            <div key={index} className="border flex flex-col justify-between rounded-md shadow-md">
              <div key={index} className=" px-4 py-3 text-black">
                <div className="flex flex-row items-center justify-between">
                  <img src={`https://ipfs.io/${item?.payload?.companyLogo}`} alt="Company-Logo" width={100} />

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
                className="flex items-center justify-center bg-black border-t rounded-b-md p-3 text-xs font-bold mt-1"
              >
                View More
              </Link>
            </div>
          ))}
      </div>

      {showModal && (
        <>
          <input
            type="checkbox"
            checked
            id="my_modal_6"
            className="modal-toggle"
          />
          <div className="modal" role="dialog">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Welcome to our Shares AI!</h3>
              <p className="py-4">
                This AI will take your bio data and will suggest companies that
                suits your profile for you to invest in!
              </p>
              <div className="modal-action">
                <label
                  onClick={() => setModal(false)}
                  htmlFor="my_modal_6 bg-"
                  className="btn"
                >
                  Close!
                </label>
                <Link
                  to="./user-details"
                  className="btn bg-white text-black hover:bg-white"
                >
                  Proceed!
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Companies;
