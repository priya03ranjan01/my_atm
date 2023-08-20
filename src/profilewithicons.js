import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./../pages/Navbar";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";


import UserProfile from "../img/UserProfile.png";


import { useLocation } from "react-router-dom";
import DeleteCustomer from "../services/DeleteCustomer";
import AccntTable from "./AccntTable";

export default function Profile() {


  const location = useLocation();
  const customerData = location.state.data1;
  const custId = customerData.custId;

  const [total, setTotal] = useState(0);


  const accountInitialValues = {
    accNo: 0,
    cardNo: 0,
    balance: 0,
    pin: 0,
  };
  const [accountData, setaccountData] = useState(accountInitialValues);
  const [accountDetails, setAccountDetails] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState("Edit");
  const [updatedData, setUpdatedData] = useState(customerData);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
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

  const handleAccountChange = (e) => {
    setaccountData({ ...accountData, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };
  const SubmitAccount = (event) => {
    if (
      accountData.accNo === "" ||
      accountData.cardNo === "" ||
      accountData.balance === "" ||
      accountData.pin === 0
    ) {
    } else {
      event.preventDefault();
      try {
        axios
          .post(
            `http://localhost:5165/api/customer/${custId}/account`,
            accountData,
            {
              headers: {
                Authorization: "bearer " + jwtToken,
              },
            }
          )
          .then((res) => {
            console.log(res.data);

            if (res.data) {
              alert(
                `Account Details Added successfully for ${customerData.name}`
              );
            }
          });
      } catch (error) {
        console.log(error);
        alert(error);
      }
      // console.log(accountData);
    }
  };

  const handleClick = () => { };

  return (
    <>
      <div className="bg-gray-100 ">
        <Navbar />
        <div className="w-full text-white bg-main-color">
          <h1 class="text-xl text-black font-semibold tracking-wide uppercase mt-6 px-4 max-w-screen-xl  mx-auto md:items-center md:justify-between md:flex-row md:px-6 ">
            Customer Profile
          </h1>
        </div>

        <div className="container mx-auto my-5 p-0">
          <div className="md:flex no-wrap md:-mx-2 ">
            {/* <!-- Left Side --> */}
            <div className="w-full md:w-3/12 md:mx-2">
              {/* <!-- Profile Card --> */}
              <div className="bg-white p-3 border-t-4 border-gray-800">
                <div className="image overflow-hidden"></div>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-fit h-fit "
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg> */}
                <img
                  src={UserProfile}
                  alt="user_profile_icon"
                  className="rounded-full"
                />

                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Bank Balance</span>
                    <span className="ml-auto">
                      <span className="bg-gray-100 py-1 px-2 rounded text-sm text-gray-800">
                        {total}
                      </span>
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto text-sm">Jul XX, 20XX</span>
                  </li>
                </ul>
              </div>
              {/* <!-- End of profile card --> */}
            </div>
            {/* <!-- Right Side --> */}
            <div className="w-full md:w-9/12 mx-2 h-64">
              {/* <!-- Profile tab --> */}
              {/* <!-- About Section --> */}

              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide text-lg text-gray-800">
                    About
                  </span>
                  <span>
                  <button onClick={() => {
                        // console.log(location.state.data1);
                        setDisabled(false);
                        setName("Done");
                        if (name === "Done") {
                          axios
                            .put(
                              `http://localhost:5165/api/Customer/${custId}`,
                              updatedData,
                              {
                                headers: {
                                  Authorization: "bearer " + jwtToken,
                                },
                              }
                            )
                            .then((res) => {
                              console.log(res.data);
                              setUpdatedData(res.data);
                              setDisabled(true);
                              setName("Edit");
                              alert("Customer Details Updated Successfully");
                              // delete customerData['custId'];
                              // customerData = res.data;
                              // setcustomerData(res.data);
                            });
                          // console.log(updatedData)
                        }
                      }}
                      ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 hover:scale-105 text-blue-900 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg></button>
  </span>
  <span> <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-red-900 hover:scale-105 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
            </button></span>
                </div>


                <form className="mt-6 flex flex-col gap-y-4 ">
                  <div className="grid lg:grid-cols-2 text-base px-4">
                    <div className="grid grid-cols-2 gap-y-2">
                      <div
                        className="px-4 py-2 font-semibold"
                        disabled={disabled}
                        onChange={handleChange}
                        name="name"
                      >
                        Name
                      </div>
                      <Input className=""
                        disabled={disabled}
                        onChange={handleChange}
                        name="name"
                        label="Name"
                        value={updatedData.name}
                      />
                      <div
                        className="px-4 py-2 font-semibold"
                        disabled={disabled}
                        type="email"
                        label=""
                        onChange={handleChange}
                        name="email"
                      >
                        Email
                      </div>
                      <Input className="w-fit"
                        disabled={disabled}
                        type="email"
                        label="Email Address"
                        onChange={handleChange}
                        name="email"
                        value={updatedData.email}
                      />

                      <div
                        className="px-4 py-2 font-semibold"
                        disabled={disabled}
                        onChange={handleChange}
                        name="address"
                      >
                        Address
                      </div>
                      <Input className="w-fit"
                        disabled={disabled}
                        label="Address"
                        onChange={handleChange}
                        name="address"
                        value={updatedData.address}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 my-2 lg:ml-4">
                      <div
                        className="px-4 py-2 font-semibold"
                        disabled={disabled}
                        onChange={handleChange}
                        name="contact"
                      >
                        Contact No.
                      </div>
                      <Input className="w-fit"
                        disabled={disabled}
                        label="Contact Number"
                        onChange={handleChange}
                        name="contact"
                        value={updatedData.contact}
                      />

                      <div
                        className="px-4 py-2 font-semibold"
                        disabled={disabled}
                        onChange={handleChange}
                        name="city"
                      >
                        City
                      </div>
                      <Input className="w-fit"
                        disabled={disabled}
                        label="City"
                        onChange={handleChange}
                        name="city"
                        value={updatedData.city}
                      />

                      <div
                        className="px-4 py-2 font-semibold"
                        disabled={disabled}
                        label="Pincode"
                        onChange={handleChange}
                        name="pincode"
                      >
                        Pincode
                      </div>
                      <Input className="w-fit"
                        disabled={disabled}
                        label="Pincode"
                        onChange={handleChange}
                        name="pincode"
                        value={updatedData.pincode}
                      />
                    </div>
                  </div>
                  <div className="justify-items-center mb-4">


                  

                   
                    <DeleteCustomer />

                  </div>
                </form>
              </div>

              {/* <!-- End of about section --> */}
              <div className="my-4 "></div>

              {/* <!-- Start of Account section --> */}
              <div className="bg-white shadow-sm rounded-sm w-full p-6">
                <div className="w-full">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 ">
                    <span clas="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide text-lg text-gray-800">
                      Account Details
                    </span>
                  </div>

                  <Button
                    className="mt-4 mx-10 z-0 "
                    type="button"
                    onClick={() => setShowModal(true)}
                  >
                    Add Account
                  </Button>
                  {showModal ? (
                    <>
                      <div className="flex items-center justify-center w-full top-0 right-0 left-0 inset-0 fixed  ">
                        <div
                          onClick={() => setShowModal(false)}

                          className="bg-[rgba(49,49,49,0.8)] absolute w-full h-full inset-0 "
                        ></div>

                        <Card className="m-2 p-2 lg:max-w-[35rem]  sm:w-1/2 ">
                          <CardHeader
                            color="gray"
                            className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
                          >

                            <Typography variant="h4" color="white">
                              Add Account
                            </Typography>
                          </CardHeader>
                          <CardBody className="px-20">
                            {/* Add Account */}

                            <form className="mt-8 flex flex-col gap-y-4 w-full ">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-medium"
                              >
                                Account Details
                              </Typography>

                              <Input className="w-min"
                                onChange={handleAccountChange}
                                name="accNo"
                                label="Account Number"
                                value={accountData.name}
                              />

                              <Input className="w-fit"
                                onChange={handleAccountChange}
                                name="cardNo"
                                label="Card Number"
                                value={accountData.name}
                              />

                              <Input className="w-fit"
                                onChange={handleAccountChange}
                                name="balance"
                                label="Balance"
                                value={accountData.name}
                              />

                              <Input className="w-fit"
                                onChange={handleAccountChange}
                                name="pin"
                                label="Pin"
                                type="password"
                                value={accountData.name}
                              />
                              <div className="flex items-center justify-center">
                                <Button onClick={SubmitAccount && toggleModal} className="mt-4 mx-10 hover:scale-105 px-4">
                                  Add
                                </Button>
                                <Button
                                  className="mt-4 mx-10 bg-gray-400   shadow-lowshade hover:scale-105 hover:bg-gray-500 cursor-pointer 
              text-gray-900 "
                                  onClick={toggleModal}
                                >
                                  Close
                                </Button>
                              </div>
                            </form>
                          </CardBody>
                        </Card>
                      </div>   </>
                  ) : null}

                  
                   
                  <AccntTable accountDetails={accountDetails} showModal={showModal}/>


                </div>
              </div>

              {/* <!-- End of profile tab --> */}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
