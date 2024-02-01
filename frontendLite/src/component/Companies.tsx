import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNoticesQuery } from "../generated/graphql";
import { Link } from "react-router-dom";
import { allCompanyData } from "../constants";
import { dvlogo } from "../assets";


type Props = {};

type Notice = {
  id: string;
  index: number;
  input: any, //{index: number; epoch: {index: number; }
  payload: string;
};

function hexToString(hex: any) {
  // Remove the '0x' prefix
  const strippedHexString = hex.slice(2);

  // Convert the hex string to a buffer
  const buffer = Buffer.from(strippedHexString, 'hex');

  // Convert the buffer to a string
  const resultString = buffer.toString('utf-8');
  return resultString;
}

const Companies: React.FC = (props: Props) => {
  const [showModal, setModal] = useState(false)

  const [loading, setLoading] = useState<boolean>()
  const [result, reexecuteQuery] = useNoticesQuery();
  const { data, fetching, error } = result;


  const notices: any = data && data.notices.edges.map((node: any) => {
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
      // id: `${n?.id}`,
      // index: parseInt(n?.index),
      payload: JSON.parse(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify((hexToString(JSON.parse(payload).createdCompany.payload))))))),
      input: n ? { index: n.input.index, payload: inputPayload } : {},
    };
  }).sort((b: any, a: any) => {
    if (a.input.index === b.input.index) {
      return b.index - a.index;
    } else {
      return b.input.index - a.input.index;
    }
  });

  return (
    <div className="bg-white p-10 mt-20">
      {/* CompaniesData */}
      <div className="font-bold txt-black flex justify-between items-center">
        <span>All Active Companies</span>
        <label htmlFor="my_modal_6" onClick={() => setModal(true)} className="btn">Suggest Investment</label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
        {notices && notices.length > 0 && notices.map((item: any, index: number) => (
          <div key={item} className="border rounded-md shadow-md">
            <div
              key={index}
              className=" px-4 py-3 text-black"
            >
              <div className="flex flex-row items-center justify-between">
                <img
                  src={dvlogo}
                  alt="Company-Logo"
                  width={100} />

                <div className="flex flex-col text-sm">
                  <h2 className="font-medium text-md">{item?.payload?.companyName}</h2>
                  <h2>{item?.payload?.regNum}</h2>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <p>Country: {item?.payload?.country} </p>
                <p>Price Per Share: {item?.payload?.pricePerShare}ETH</p>
                <p>Minimum Purchase Share: {item?.payload?.minShare}Shares </p>
              </div>
            </div>
            <Link
              to={`/company-details/${item?.payload?.id}`}
              className="flex items-center justify-center bg-black border-t rounded-b-md p-3 text-xs font-bold mt-1"
            >
              View More
            </Link></div>
        ))}
      </div>

      {showModal &&
        <><input type="checkbox" checked id="my_modal_6" className="modal-toggle" /><div className="modal" role="dialog">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Welcome to our Shares AI!</h3>
            <p className="py-4">This AI will take your bio data and will suggest companies that suits your profile for you to invest in!</p>
            <div className="modal-action">
              <label onClick={() => setModal(false)} htmlFor="my_modal_6 bg-" className="btn">Close!</label>
              <button className="btn bg-white text-black hover:bg-white">Proceed!</button>
            </div>
          </div>
        </div></>
      }
    </div>
  );
};

export default Companies;