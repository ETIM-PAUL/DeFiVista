import { getAddress } from 'viem'
import { Wallet } from "./wallet";
import { Error_out, Log, Notice, Output } from "./outputs";

// Function to find a specific player from players list
function findCompany(allCompanies, companyAddress) {
  console.log("allCompanies: ", allCompanies, "companyAddress: ", companyAddress);
  const foundPlayer = allPlayers.find(player => player.walletAddress === playerAddress);
  return foundPlayer;
}

class DeFiVistaAdmin {
  defiVestAdmins = [getAddress("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"), getAddress("0xf3b74384445fD0CE94b1aecBa1791eE0c1Ca49AA")];
  companies = new Map();
  wallet;
  constructor(wallet) {
    this.companies = new Map();
    this.wallet = wallet;
  }

  company_create = (
    companyName,
    companyAdminAddress,
    companyLogo,
    totalShares,
    pricePerShare,
    minShare,
    country,
    regNum,
  ) => {
    try {
      if (!this.is_company_complete(
        companyName,
        companyAdminAddress,
        companyLogo,
        totalShares,
        pricePerShare,
        minShare,
        country,
        regNum)) {
        throw new EvalError(
          `company profile not completed`
        );
      }

      let company = new CompanyShares(
        companyName,
        companyAdminAddress,
        companyLogo,
        description,
        totalShares,
        minShare,
        pricePerShare,
        country,
        regNum
      );
      this.companies.set(company.id, company);
      let company_json = JSON.stringify(company);
      const notice_payload = `{{"type":"company_create","content":${company_json}}}`;
      console.log(
        `Company ${company.id} created for buying and selling of shares, awaiting admin's approval`
      );
      return new Notice(notice_payload);
    } catch (e) {
      const error_msg = `Failed to create company ${e}`;
      console.debug(error_msg);

      return new Error_out(error_msg);
    }
  }

  update_company_status = (
    company_id,
    new_status,
    msg_sender
  ) => {
    try {
      if (!this.isDappAdminAction(
        msg_sender)) {
        throw new EvalError(
          `not DeFiVista admin`
        );
      }
      if (!this.company_exist(
        msg.sender)) {
        throw new EvalError(
          `company doesn't exist`
        );
      }

      // Access and update the object in the map
      let keyToUpdate = company_id;
      if (myMap.has(keyToUpdate)) {
        let updatedObject = myMap.get(keyToUpdate);
        updatedObject.status = new_status;

        // Update the object in the map
        myMap.set(keyToUpdate, updatedObject);
        console.log('Updated Map:', myMap);
      }

      let company_json = JSON.stringify(company);
      const notice_payload = `{{"type":"update_company_status","content":${company_json}}}`;
      console.log(
        `Company ${company.id} status updated`
      );
      return new Notice(notice_payload);
      //   if (!this.seller_owns_item(seller, item)) {
      //     throw new EvalError(
      //       `Seller ${seller} must own item ${item.erc721} id:${item.token_id} to auction it`
      //     );
      //   }
    } catch (e) {
      const error_msg = `Failed to create company ${e}`;
      console.debug(error_msg);

      return new Error_out(error_msg);
    }
  }

  company_get(company_id) {
    try {
      let company_json = JSON.stringify(this.companies.get(company_id));
      return new Log(company_json);
    } catch (e) {
      return new Error_out(`Company id ${auction_id} not found`);
    }
  }

  companies_getAll_admin() {
    if (!this.isDappAdminAction(
      msg_sender)) {
      throw new EvalError(
        `not DeFiVista admin`
      );
    }
    let companies_json = JSON.stringify(this.companies);
    return new Log(companies_json);
  }

  isDappAdminAction(msg_sender) {
    this.defiVestAdmins.forEach((admin, key) => {
      if (admin != msg_sender) {
        return false;
      }
    });
    return true;
  }

  company_exist(company_id) {
    let company_json = JSON.stringify(this.companies.get(company_id));
    if (company_json) {
      return true;
    } else {
      return false;
    }
  }

  is_company_complete(
    companyName,
    description,
    companyAdminAddress,
    companyLogo,
    totalShares,
    pricePerShare,
    minShare,
    country,
    regNum) {
    if (!companyName, !description, !companyAdminAddress, !companyLogo, !totalShares, !pricePerShare, !minShare, !country, !regNum) {
      return false
    } else {
      return true;
    }
  }
}

export { DeFiVistaAdmin }