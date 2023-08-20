import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../pages/Navbar";
import { useLocation } from "react-router-dom";
import About from "./About";
import AccntDetails from "../services/AccntDetails";
import LeftProfileCard from "./LeftProfileCard";

export default function Profile() {
  const location = useLocation();
  const customerData = location.state.data1;
  const custId = customerData.custId;
  const [accountDetails, setAccountDetails] = useState([]);

  const accountInitialValues = {
    accNo: 0,
    cardNo: 0,
    balance: 0,
    pin: 0,
  };

  const jwtToken = sessionStorage.getItem("jwtToken");
  useEffect(() => {
    axios
      .get(`http://localhost:5165/api/customer/${custId}/account`, {
        headers: {
          Authorization: "bearer " + jwtToken,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setAccountDetails(res.data);
        // customerData = res.data;
        // setcustomerData(res.data);
      });

    // accountDetails.map((item) => {
    //   setTotal(total + item.balance)
    // })
  });
  

  

  return (
    <>
      <div className="bg-gray-100 h-screen ">
        <Navbar />
        

        <div className="container mx-auto my-5 p-0">
          <div className="md:flex no-wrap md:-mx-2 ">
            {/* <!-- Left Side --> */}
            <div className="w-full md:w-3/12 md:mx-2">

              <LeftProfileCard/>

            </div>
            {/* <!-- Right Side --> */}
            <div className="w-full md:w-9/12 mx-2 h-64">

              <About
                customerData={customerData}
                custId={custId}
                jwtToken={jwtToken}
              />
              
              <div className="my-4 "></div>

              {/* <AccntDetails
                customerData={customerData}
                custId={custId}
                jwtToken={jwtToken}
                accountDetails={accountDetails}
              /> */}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
