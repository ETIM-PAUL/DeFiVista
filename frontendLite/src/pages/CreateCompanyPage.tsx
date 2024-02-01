import React from "react";
import CreateCompany from "../component/CreateCompany";
import LoggedNav from "../component/LoggedNav";
import Footer from "../component/Footer";
import { GraphQLProvider } from "../GraphQL";

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
