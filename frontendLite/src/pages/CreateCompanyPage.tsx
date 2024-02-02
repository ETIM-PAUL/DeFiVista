import React from "react";

import LoggedNav from "../component/LoggedNav";
import Footer from "../component/Footer";
import { GraphQLProvider } from "../GraphQL";
import CreateCompany from "../component/CreateCompany";

type Props = {};

const CreateCompanyPage = (props: Props) => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <LoggedNav />

        <GraphQLProvider>
          <CreateCompany />
        </GraphQLProvider>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CreateCompanyPage;
