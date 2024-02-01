import { Link } from "react-router-dom";
import { footerLinks, socialMedia } from "../constants";
import { dvlogo } from "../assets";

const Footer = () => {
  return (
    <section className="flex justify-center items-center sm:py-16 py-6 flex-col  bg-[#FFFFFF] sm:px-16 px-6">
      <div className="flex justify-center items-start md:flex-row flex-col mb-8 w-full">
        <div className="flex flex-1 flex-col justify-start mr-10">
          <img
            src={dvlogo}
            alt="defivista"
            width={266}
            height={72.14}
            className="object-contain"
          />
         <p className="font-rubik text-xl font-bold leading-[30.8px] mt-4 max-w-[312px] animated-text">
  Invest in your Future.
</p>

        </div>

        <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
          {footerLinks.map((footerlink) => (
            <div
              key={footerlink.title}
              className="flex flex-col ss:my-0 my-4 min-w-[150px]"
            >
              <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-blue-950">
                {footerlink.title}
              </h4>
              <ul className="list-none mt-4">
                {footerlink.links.map((link, index) => (
                  <Link href={link.link} key={link.name}>
                    <li
                      key={link.name}
                      className={`font-poppins font-normal text-[16px] leading-[24px] text-blue-950 
                      hover:text-secondary cursor-pointer ${
                        index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                      }`}
                    >
                      {link.name}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="w-[100%] rounded-xl flex h-full justify-between items-center md:flex-row flex-col p-6 bg-[#080E26] ">
        <p className="font-poppins font-normal text-[18px] text-center text-[#FFFFFF] leading-[27px]">
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
    </section>
  );
};

export default Footer;