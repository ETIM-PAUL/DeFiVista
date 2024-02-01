import React from "react";
import { shareHoldersStats } from "../constants";
import { shortenAddress } from "../utils";

type Props = {
  shareHolders: []
};

const ShareHolderStats = ({ shareHolders }: Props) => {
  return (
    <div className="flex flex-col mx-24 mt-20 mb-20">
      <span className="font-bold text-black block text-center">List of shareholders in the company</span>
      <div className="overflow-x-auto ">
        <table className="table table-xs borde">
          <thead className="font-medium text-black ">
            <tr className="">
              <th>Id</th>
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
