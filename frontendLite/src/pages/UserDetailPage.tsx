import React from "react";
import UserDetail from "../component/UserDetail";
import LoggedNav from "../component/LoggedNav";
import { GraphQLProvider } from "../GraphQL";
import Footer from "../component/Footer";

type Props = {};

const UserDetailPage = (props: Props) => {
  return (
    <div className="flex flex-col justify-between h-scree bg-white">
      <div className="bg-white h-full">
        <LoggedNav />

        <GraphQLProvider>
          <UserDetail />
        </GraphQLProvider>
      </div>
      <div>
        <Footer />
      </div>

    </div>
  );
};

export default UserDetailPage;
