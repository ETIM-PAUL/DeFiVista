import React from "react";
import { shareHoldersStats } from "../constants";
import { shortenAddress } from "../utils";

type Props = {};

const ShareHolderStats = (props: Props) => {
  return (
    <div className="flex flex-col mx-24 mt-20 mb-20">
      <div className="overflow-x-auto ">
        <table className="table table-xs ">
          <thead className="font-medium text-black text-lg ">
            <tr className="">
              <th> </th>
              <th>Share Holder</th>
              <th>Number of Shares </th>
            </tr>
          </thead>
          <tbody>
            {shareHoldersStats.map((shareHolderStat) => (
              <tr className="text-black h-10 font-medium text-lg">
                <th>{shareHolderStat.id} </th>
                <td className="">{shortenAddress(shareHolderStat.address)}</td>
                <td> {shareHolderStat.numberOfShares}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShareHolderStats;
