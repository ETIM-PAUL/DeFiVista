const { ethers } = require("ethers");
const company_action = require("./company");

const rollup_server = process.env.ROLLUP_HTTP_SERVER_URL;
console.log("HTTP rollup_server url is " + rollup_server);

async function handle_advance(data) {
  console.log("Received advance request data " + JSON.stringify(data));
  const payload = data.payload;
  let JSONpayload = {};
  try {
    if (
      String(data.metadata.msg_sender).toLowerCase() ===
      DAPP_ADDRESS_REALY.toLowerCase()
    ) {
      console.log("setting Dapp address:", payload);
      DAPP_ADDRESS = payload;
    }

    console.log("payload:" + JSON.stringify(payload));
    const payloadStr = ethers.toUtf8String(payload);
    JSONpayload = JSON.parse(payloadStr);
    console.log(`received request ${JSON.stringify(JSONpayload)}`);

  } catch (e) {

    console.log("error is:", e);
    console.log(`Adding notice with binary value "${payload}"`);
    await fetch(rollup_server + "/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: payload }),
    });
    return "reject";
  }

  let advance_req;

  try {
    //{"method":"company_create","name":"web3Bridge","companyLogo":"X7sdsa8ycn","pricePerShare":"0.01","minShare":"3","country":"Nigeria","regNum":"8726252"}
    if (JSONpayload.method === "company_create") {
      console.log("creating company....");
      const createdCompany = company_action.company_create(
        JSONpayload.name,
        data.metadata.msg_sender,
        JSONpayload.companyLogo,
        JSONpayload.pricePerShare,
        JSONpayload.minShare,
        JSONpayload.country,
        JSONpayload.regNum,
      );
      console.log("created country is:", createdCompany);

      const result = JSON.stringify({ createdCompany: createdCompany });
      // convert result to hex
      const hexresult = stringToHex(result);
      console.log("The result is :", hexresult);
      advance_req = await fetch(rollup_server + "/notice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload: hexresult }),
      });

      //{"method":"update_company_status", "company": "1","new_status":"1"}
    } else if (JSONpayload.method === "update_company_status") {
      let updatedCompanyStatus = company_action.update_company_status(JSONpayload.company_id, JSONpayload.new_status, data.metadata.msg_sender);
      console.log("updating company status....");
      console.log("updated company: " + JSON.stringify(updatedCompanyStatus));

      //{"method":"shares_purchase", "company": "1","new_status":"1"}
    } else if (JSONpayload.method === "shares_purchase") {
      let sharesAcquisition = company_action.shares_purchase(data.metadata.msg_sender, JSONpayload.company_id, JSONpayload.amount_of_shares, JSONpayload.amount);
      console.log("buying company status....");
      console.log("shares bought: " + JSON.stringify(sharesAcquisition));
    }
    //{"method":"shares_withdraw", "msg_sender":"your address","company": "1"}
    else if (JSONpayload.method === "shares_withdraw") {
      let sharesWithdrawal = company_action.shares_withdraw(data.metadata.msg_sender, JSONpayload.company_id);
      console.log("withdrawing company status....");
      console.log("shares withdrawn: " + JSON.stringify(sharesWithdrawal));
    }
    //{"method":"company_get", "company": "1"}
    else if (JSONpayload.method === "company_get") {
      let companyDetails = company_action.company_get(JSONpayload.company_id);
      console.log("getting company details....");
      console.log("company details: " + JSON.stringify(companyDetails));
    }
    //{"method":"company_shareholders", "company": "1"}
    else if (JSONpayload.method === "company_shareholders") {
      let companyShareholders = company_action.company_shareholders(JSONpayload.company_id);
      console.log("getting company shareholders....");
      console.log("company shareholders: " + JSON.stringify(companyShareholders));
    }
    //{"method":"companies_get_admin"}
    else if (JSONpayload.method === "companies_get_admin") {
      let allCompanies = company_action.companies_get_admin();
      console.log("getting all company....");
      console.log("companies in the dapp: " + JSON.stringify(allCompanies));
    }
    //{"method":"get_companies"}
    else if (JSONpayload.method === "get_companies") {
      let activeCompanies = company_action.get_companies();
      console.log("getting all active company....");
      console.log("active companies in the dapp: " + JSON.stringify(activeCompanies));
    }
    //{"method":"get_user_shares"}
    else if (JSONpayload.method === "get_user_shares") {
      let myShares = company_action.get_user_shares(data.metadata.msg_sender);
      console.log("getting all your shares balance....");
      console.log("your shares balance across companies in the dapp: " + JSON.stringify(myShares));
    }

  } catch (e) {
    console.log("error is:", e);
    await fetch(rollup_server + "/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: stringToHex(JSON.stringify({ error: e })),
      }),
    });
    return "reject";
  }
  const json = await advance_req.json();
  console.log(
    "Received  status " +
    advance_req.status +
    " with body " +
    JSON.stringify(json)
  );
  return "accept";

}


async function handle_inspect(data) {
  console.log("Received inspect request data " + JSON.stringify(data));
  const payload = data["payload"];
  try {
    const payloadStr = ethers.toUtf8String(payload);
    console.log(`Adding report "${payloadStr}"`);
  } catch (e) {
    console.log(`Adding report with binary value "${payload}"`);
  }
  const inspect_req = await fetch(rollup_server + "/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ payload }),
  });
  console.log("Received report status " + inspect_req.status);
  return "accept";
}

var handlers = {
  advance_state: handle_advance,
  inspect_state: handle_inspect,
};

var finish = { status: "Shares Acquisition Started" };

(async () => {
  while (true) {
    const finish_req = await fetch(rollup_server + "/finish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "accept" }),
    });

    console.log("Received finish status " + finish_req.status);

    if (finish_req.status == 202) {
      console.log("No pending rollup request, trying again");
    } else {
      const rollup_req = await finish_req.json();

      var typeq = rollup_req.request_type;
      var handler;
      if (typeq === "inspect_state") {
        handler = handlers.inspect_state;
      } else {
        handler = handlers.advance_state;
      }
      var output = await handler(rollup_req.data);
      finish.status = "accept";
      if (output instanceof Error_out) {
        finish.status = "reject";
      }
      await send_request(output);
    }
  }
})();