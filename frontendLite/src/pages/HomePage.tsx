import React from "react";
import MainNav from "../layout/MainNav";
import { Link } from "react-router-dom";
import HeroCard from "../component/Herocard";
import Footer from "../component/Footer";
const HomePage = () => {
  return (
    <>
      <section className="flex md:flex-row flex-col sm:py-16 py-6 sm-px-16 px-6 gap-16 bg-white mt-20">

        <div className="flex-1 flex items-center justify-center md:my-0 my-10 relative">
          <HeroCard />
        </div>

        <div className="flex flex-1 items-start justify-center flex-col xl:px-0 sm:px-16 px-6">
          <h1 className="font-roboto font-semibold sm:text-[50px] text-[42px] text-[#080E26] sm:leading-[75px] leading-[55px] w-full">
            Embark on a Journey to build a Generational Wealth
          </h1>
          <p className="font-poppins font-normal text-[#666666] text-xl leading-[30.8px] max-w-[470px] mt-5">
            Companies can register and create profiles, offering users the
            opportunity to buy shares. Our advanced AI system analyzes user
            profiles, preferences, and market trends to suggest personalized
            investment opportunities.
          </p>
          <div className="flex mt-4 gap-4">
            <div className="bg-[#082621] text-white flex items-center justify-center rounded-lg w-36 h-12 p-4 shadow-lg cursor-pointer">
              <Link to='/create-company'>
                Register
              </Link>
            </div>
            <div className="bg-[#FFFFFF] hover:bg-[#212529] border hover:border-none border-[#080E26] text-[#080E26] flex items-center justify-center rounded-lg w-36 h-12 p-4 shadow-lg cursor-pointer hover:text-[#FFFFFF]">
              <Link to='/companies'>
                Buy
              </Link>
            </div>
          </div>
        </div>

      </section>
    </>


  );
};

export default HomePage;

