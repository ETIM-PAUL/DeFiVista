import { Link } from "react-router-dom";
import { footerLinks, socialMedia } from "../constants";
import { dvlogo } from "../assets";

const Footer = () => {
  return (
    // <section className="flex justify-center items-cente flex-col  bg-[#FFFFFF]">

    <div className="w-[100%] rounded- flex h-full justify-between items-center md:flex-row flex-col p-6 bg-[#080E26] ">
      <p className="font-poppins font-normal text-xs text-center text-[#FFFFFF] leading-[27px]">
        Copyright Ⓒ 2024 defivista. All Rights Reserved.
      </p>

      <div className="flex flex-row md:mt-0 mt-6">
        {socialMedia.map((media, index) => (
          <img
            key={media.id}
            src={media.icon}
            alt={media.id}
            width={24}
            height={24}
            className={`object-contain cursor-pointer 
                  ${index !== socialMedia.length - 1 ? "mr-6" : "mr-0"}`}
            onClick={() => window.open(media.link)}
          />
        ))}
      </div>
    </div>
    // </section>
  );
};

export default Footer;