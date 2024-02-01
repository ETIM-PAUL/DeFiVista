import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dvlogo } from "../assets";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Notices } from "../Notices";
import { Vouchers } from "../Vouchers";


const CreateCompany = (prop) => {
  const [ipfsUpload, setIpfsUpload] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const navigate = useNavigate();

  const schema = yup
    .object({
      name: yup.string(),
      state: yup.string(),
      regNum: yup.string(),
      country: yup.string(),
      pricePerShare: yup.string(),
      minShare: yup.string(),
      description: yup.string(),
      companyLogo: yup.string(),
    })
    .required();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
  };

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data)
    setIsSubmitLoading(true)
    // try {
    //   if (!result) {
    //     navigate("/");
    //   } else {
    //     if (result.validation) {
    //       const keys = Object.keys(result.validation);
    //       for (let i = 0; i < keys.length; i++) {
    //         const field = keys[i];
    //         setError(field, {
    //           type: "manual",
    //           message: result.validation[field],
    //         });
    //       }
    //     }
    //   }
    //   setIsSubmitLoading(false)
    // } catch (error) {
    //   setIsSubmitLoading(false)
    //   console.log("Error", error);
    //   setError("name", {
    //     type: "manual",
    //     message: error.message,
    //   });
    // }
  };

  return (
    <>
      <div className="bg-white p-10 mt-20">
        <Notices />
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto block w-fit border shadow-md px-4 text-sm bg-white rounded-lg py-4 text-black"
        >
          <span className="block text-center text-xl font-bold">Company Details</span>
          <div className="space-y-6 pt-10">
            <div className="flex flex-row  gap-14   ">
              <div className="flex flex-col space-y-1 ">
                <label htmlFor="companyName">Company Name</label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Company Name"
                  required
                  className="rounded h-[40px] bg-transparent border border-[#999999] outline-none p-3 "
                />
              </div>

              <div className="flex flex-col space-y-1 ">
                <label htmlFor="regNumber">Registration Number</label>
                <input
                  {...register("regNum")}
                  type="text"
                  placeholder="Registration Number"
                  required
                  className="rounded  h-[40px] bg-transparent border border-[#999999]  outline-none p-3 "
                />
              </div>
            </div>

            {/*  */}

            <div className="flex flex-row  gap-14   ">
              <div className="flex flex-col space-y-1 ">
                <label htmlFor="country">Country</label>
                <input
                  {...register("country")}
                  type="text"
                  name="country"
                  id="country"
                  placeholder="Country where company is registered"
                  required
                  className="rounded  h-[40px] bg-transparent border border-[#999999]  outline-none p-3 "
                />
              </div>

              <div className="flex flex-col space-y-1 ">
                <label htmlFor="companyAdminAddr">State</label>
                <input
                  {...register("state")}
                  type="text"
                  placeholder="state where company is located"
                  required
                  className="rounded  h-[40px] bg-transparent border border-[#999999]  outline-none p-3 "
                />
              </div>
            </div>

            {/*  */}

            <div className="flex flex-row  gap-14   ">
              <div className="flex flex-col space-y-1 ">
                <label htmlFor="pricePerShare">Price per share</label>
                <input
                  {...register("pricePerShare")}
                  type="number"
                  name="pricePerShare"
                  id="pricePerShare"
                  placeholder="Price Per Share"
                  required
                  className="rounded  h-[40px] bg-transparent border border-[#999999]  outline-none p-3 "
                />
              </div>

              <div className="flex flex-col space-y-1 ">
                <label htmlFor="minShare">Minimum Share</label>
                <input
                  {...register("minShare")}
                  type="number"
                  name="minShare"
                  id="minShare"
                  placeholder="Minimum Share"
                  required
                  className="rounded  h-[40px] bg-transparent border border-[#999999]  outline-none p-3 "
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-1 mt-6 ">
            <label htmlFor="companyLogo">Upload Company Logo to IPFS</label>
            <div className="flex justify-center gap-3">
              <input
                type="file"
                src=""
                alt="Company Logo"
                className="w-full rounded border px-1 py-2"
                placeholder="Upload Logo Company Logo to IPFS"
              />
              <button className="btn">IPFS Upload</button>
            </div>
          </div>

          <div className="flex flex-col space-y-1 mt-6 ">
            <label htmlFor="companyLogo">A Short Description</label>
            <div className="flex justify-center gap-3">
              <textarea {...register("description")} rows={4} className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border bg-white" placeholder="Leave a comment..."></textarea>
            </div>
          </div>


          <button
            type="submit"
            // disabled={!ipfsUpload}
            className={`${ipfsUpload ? "opacity-none btn bg-black cursor-wait" : "opacity-50 cursor-not-allowed text-black"} justify-center text-white items-center mt-12 w-full btn text-md font-bold`}
          >
            Create Company
          </button>
        </form>

      </div>
    </>
  );
};

export default CreateCompany;
