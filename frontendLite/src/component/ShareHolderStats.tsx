import React from "react";
import { shareHoldersStats } from "../constants";
import { shortenAddress } from "../utils";

type Props = {
  shareHolders: []
};

const ShareHolderStats = (shareHolders: any) => {
  console.log(shareHolders.shareHolders)
  return (
    <div className="flex flex-col mx-24 mt-20 mb-20">

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {shareHolders.shareHolders === false ?
            <div className="w-full bg-gray-800">
              <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Our Shareholders
                <p className="mt-1 text-sm font-normal text-red-500 dark:red-gray-400">Ooooopss.......We don't have shareholders yet</p>
              </caption><thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Shareholder
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Number of shares
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Worth
                  </th>
                </tr>
              </thead>
            </div>

            :
            <div className="w-full bg-gray-800">
              <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800 w-full">
                Our Shareholders
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse through our list of shareholders and see what is the worth of their shares.</p>
              </caption>
              <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400 w-full">
                <tr className="w-full dark:bg-gray-700">
                  <th scope="col" className="px-6 py-3">
                    Shareholder
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Number of shares
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Worth
                  </th>
                </tr>
              </thead>
              <tbody>
                {shareHolders.shareHolders.length > 0 && shareHolders.shareHolders.map((share: any, index: number) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {shortenAddress(share?.msg_sender)}
                    </th>
                    <td className="px-6 py-4">
                      {share?.amount_of_shares}
                    </td>
                    <td className="px-6 py-4">
                      {share?.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </div>
          }
        </table>
      </div>

      {/* <div classNameName="overflow-x-auto ">
        <table classNameName="table table-xs borde">
          <thead classNameName="font-medium text-black ">
            <tr classNameName="">
              <th>Id</th>
              <th>Share Holder</th>
              <th>Number of Shares </th>
            </tr>
          </thead>
          <tbody>
            {shareHoldersStats.map((shareHolderStat) => (
              <tr classNameName="text-black h-10 font-medium text-lg">
                <th>{shareHolderStat.id} </th>
                <td classNameName="">{shortenAddress(shareHolderStat.address)}</td>
                <td> {shareHolderStat.numberOfShares}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default ShareHolderStats;
