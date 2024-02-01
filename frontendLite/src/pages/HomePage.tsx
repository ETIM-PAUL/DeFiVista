import React from "react";
import MainNav from "../layout/MainNav";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="flex mt-10 ">
      <p className=" leading-10 space-y-10 text-center justify-center items-center mx-auto mt-10 text-xl font-normal text-black  ">
        <span className="font-semibold"> DeFiVista</span>, the revolutionary
        platform that brings together companies and investors in the world of
        cryptocurrency. <br /> Companies can register and create profiles,
        offering users the opportunity to buy shares. <br /> Our advanced AI
        system analyzes user profiles, preferences, and market trends to suggest
        personalized investment opportunities
      </p>
    </div>
  );
};

export default HomePage;
