import React, { useState } from "react";
import LoggedNav from "./LoggedNav";
import Footer from "./Footer";

type Props = {};

const UserDetail = (props: Props) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [age, setAge] = useState<number>();
  const [experience, setExperience] = useState();
  const [investedBefore, setInvestedBefore] = useState();

  return (
    <>
      <div className="bg-white p-10 mt-20 mb-28">
        <form
          action=""
          className=" mx-auto block w-fit border shadow-md px-4 text-sm bg-white rounded-lg pt-6 pb-6 text-black"
        >
          <span className="block text-center text-xl font-bold">
            User Details
          </span>
          <div className="space-y-6 pt-10">
            <div className="flex flex-row  gap-14   ">
              <div className="flex flex-col space-y-1 w-full">
                <label htmlFor="firstName">First Name</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="First Name"
                  required
                  className="rounded h-[40px] bg-transparent border border-[#999999] outline-none p-3 w-full"
                />
              </div>

              <div className="flex flex-col space-y-1 w-full">
                <label htmlFor="lastName">Last Name</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Last Name"
                  required
                  className="rounded  h-[40px] bg-transparent border border-[#999999]  outline-none p-3 w-full"
                />
              </div>
            </div>

            {/*  */}

            <div className="flex flex-row  gap-14   ">
              <div className="flex flex-col space-y-1 w-full">
                <label htmlFor="country">Country</label>
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  type="text"
                  name="country"
                  id="country"
                  placeholder="Your Country"
                  required
                  className="rounded  h-[40px] bg-transparent border border-[#999999]  outline-none p-3 "
                />
              </div>

              <div className="flex flex-col space-y-1 w-full">
                <label htmlFor="phoneNumber">Age</label>
                <input
                  value={age}
                  onChange={(e: any) => setAge(e.target.value)}
                  type="tel"
                  placeholder="Your Age"
                  required
                  className="rounded  h-[40px] bg-transparent border border-[#999999]  outline-none p-3 "
                />
              </div>
            </div>

            {/*  */}

            <div className="flex flex-row  gap-14">
              <div className="flex flex-col space-y-1 ">
                <label htmlFor="experience">
                  Level of Experience in Crypto
                </label>

                <select
                  value={experience}
                  onChange={(e: any) => setExperience(e.target.value)}
                  required
                  className="rounded w-[240px]  h-[40px] bg-transparent border border-[#999999]  outline-none p-3 "
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="professional">Professional</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1 ">
                <label htmlFor="investedBefore">
                  Have you invested in Crypto before?
                </label>

                <select
                  value={investedBefore}
                  onChange={(e: any) => setInvestedBefore(e.target.value)}
                  placeholder="Price Per Share"
                  required
                  className="rounded w-[240px]  h-[40px] bg-transparent border border-[#999999]  outline-none p-3 "
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="justify-center text-white items-center mt-12 w-full btn text-md font-bold"
          >
            Generate AI Suggestion
          </button>
        </form>
      </div>
    </>
  );
};

export default UserDetail;

// Country, age, howmuch are you willing to invest
// level of knowledge in crypto investment
// radio
