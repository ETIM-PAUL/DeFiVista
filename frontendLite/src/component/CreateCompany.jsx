import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dvlogo } from "../assets";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Notices } from "../Notices";
import { Vouchers } from "../Vouchers";
import axios from 'axios'
import { useRollups } from "../useRollups";
import { ethers } from "ethers";
import { toast } from "react-toastify";

const CreateCompany = (prop) => {
  const [fileUrl, updateFileUrl] = useState('');
  const [newFile, updateNewFile] = useState();
  const [ipfsLoading, setIpfsLoading] = useState(false);
  const [ipfsUpload, setIpfsUpload] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const navigate = useNavigate();
  const rollups = useRollups("0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C");


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
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function uploadIPFS() {
    const file = newFile
    try {
      if (file !== undefined) {
        setIpfsLoading(true)
        const formData = new FormData();
        formData.append('file', file);
        const pinataBody = {
          options: {
            cidVersion: 1,
          },
          metadata: {
            name: file.name,
          }
        }
        formData.append('pinataOptions', JSON.stringify(pinataBody.options));
        formData.append('pinataMetadata', JSON.stringify(pinataBody.metadata));
        const url = `${pinataConfig.root}/pinning/pinFileToIPFS`;
        const response = await axios({
          method: 'post',
          url: url,
          data: formData,
          headers: pinataConfig.headers
        })
        updateFileUrl(`ipfs/${response.data.IpfsHash}/`)
        setIpfsUpload(`ipfs://${response.data.IpfsHash}/`)
        queryPinataFiles();
      } else {
        // toast.error("Please upload a document detailing the project outlines, aims and objectives");
        setIpfsLoading(false)
        return;
      }
      setIpfsLoading(false)
    } catch (error) {
      setIpfsLoading(false)
      console.log(error)
    }
  }

  const queryPinataFiles = async () => {
    try {
      const url = `${pinataConfig.root}/data/pinList?status=pinned`;
      const response = await axios.get(url, pinataConfig);
    } catch (error) {
      console.log(error)
    }
  };

  const pinataConfig = {
    root: 'https://api.pinata.cloud',
    headers: {
      'pinata_api_key': "e98332f4fcdf7aa677fa",
      'pinata_secret_api_key': "ddba77116b8064d68c18b734f8b2fe484b18349b8a1c7af90006689e944ff59a"
    }
  };

  const testPinataConnection = async () => {
    try {
      const url = `${pinataConfig.root}/data/testAuthentication`
      const res = await axios.get(url, { headers: pinataConfig.headers });
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    testPinataConnection()
  });

  const onSubmit = async (data) => {
    setIsSubmitLoading(true)
    try {
      if (rollups) {
        try {
          let str = `{"method":"company_create","name":"${data?.name}","description":"${data?.description}","companyLogo":"${fileUrl}","pricePerShare":"${data?.pricePerShare}","minShare":"${data?.minShare}","country":"${data?.country}","state":"${data?.state}","regNum":"${data.regNum}"}`
          let payload = ethers.utils.toUtf8Bytes(str);

          const result = await rollups.inputContract.addInput("0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C", payload);
          console.log("waiting for confirmation...");
          const receipt = await result.wait(1);
          reset();
          // Search for the InputAdded event
          const event = receipt.events?.find((e) => e.event === "InputAdded");
          setIsSubmitLoading(true)
          toast("Company Created, Awaiting Admin Approval");
          navigate("/")
        } catch (e) {
          console.log(`${e}`);
        }
      }
      setIsSubmitLoading(false)
    } catch (error) {
      setIsSubmitLoading(false)
      console.log("Error", error);
      setError("name", {
        type: "manual",
        message: error.message,
      });
    }
  };

  return (
    <>
      <div className="bg-white p-10 mt-20">
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
                onChange={(e) => updateNewFile(e.target.files[0])}
                type="file"
                accept="image/x-png,image/gif,image/jpeg"
                alt="Company Logo"
                className="w-full rounded border px-1 py-2"
                placeholder="Upload Logo Company Logo to IPFS"
              />
              <button
                disabled={ipfsLoading}
                onClick={() => uploadIPFS()}
                className="btn w-fit">{ipfsLoading ? "Uploading" : "IPFS Upload"}</button>
            </div>
          </div>

          {fileUrl !== "" &&
            <div className="grid space-y-2 w-full mt-4">
              <label>Uploaded Logo Link</label>
              <input
                value={ipfsUpload}
                disabled
                type="text"
                className="input input-bordered text-black  border-[#696969] w-full max-w-full bg-white disabled:bg-white"
              />
            </div>
          }

          <div className="flex flex-col space-y-1 mt-6 ">
            <label htmlFor="companyLogo">A Short Description</label>
            <div className="flex justify-center gap-3">
              <textarea {...register("description")} rows={4} className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border bg-white" placeholder="Leave a comment..."></textarea>
            </div>
          </div>


          <button
            type="submit"
            disabled={!ipfsUpload || isSubmitLoading}
            className={`${(ipfsUpload || !isSubmitLoading) ? "opacity-none btn bg-black cursor-pointer" : "opacity-50 cursor-not-allowed text-black"} justify-center text-white items-center mt-12 w-full btn text-md font-bold`}
          >
            {isSubmitLoading ? "Processing" : "Create Company"}
          </button>
        </form>

      </div>
    </>
  );
};

export default CreateCompany;
