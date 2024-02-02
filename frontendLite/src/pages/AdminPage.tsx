import React from "react";
import Admin from "../component/Admin";
import { GraphQLProvider } from "../GraphQL";
import LoggedNav from "../component/LoggedNav";
import Footer from "../component/Footer";

type Props = {};

const AdminPage = (props: Props) => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="bg-white h-full">
        <LoggedNav />

        <GraphQLProvider>
          <Admin />
        </GraphQLProvider>
      </div>
      <div>
        <Footer />
      </div>

    </div>
  );
};

export default AdminPage;
