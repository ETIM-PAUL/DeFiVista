import React from "react";
import CompanyDetails from "../component/CompanyDetails";
import { GraphQLProvider } from "../GraphQL";
import LoggedNav from "../component/LoggedNav";
import Footer from "../component/Footer";

type Props = {};

const CompanyDetailsPage = (props: Props) => {
  return (
    <div className="flex flex-col justify-between h-scree bg-white">
      <div className="bg-white h-full">
        <LoggedNav />

        <GraphQLProvider>
          <CompanyDetails />
        </GraphQLProvider>
      </div>
      <div>
        <Footer />
      </div>

    </div>
  );
};

export default CompanyDetailsPage;
