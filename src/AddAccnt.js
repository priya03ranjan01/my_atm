import { Card, Typography,Button } from "@material-tailwind/react";
import React, { useState } from "react";
const TABLE_HEAD = ["Account Number", "Card Number", "Balance", "Edit Pin","Delete","Withdraw Cash"];
 
 
export default function AddAccnt(accountDetails, modal, showModal) 
{
  const [total, setTotal] = useState(0);

  const toggleModal = () => {
    showModal(!modal);
  };
      
    // accountDetails.map((item) => {
    //   setTotal(total + item.balance)
    // })


  return (<>
                
<Button
                    className="mt-4 mx-10 z-0 "
                    type="button"
                    onClick={toggleModal}
                  >
                    Add Account
                  </Button>
    {accountDetails.length > 0 && !modal ? (
        <>
         {accountDetails.map((item) => {
            return (
              <>


                  {modal ? (
                    
                      <div className="flex items-center justify-center w-full top-0 right-0 left-0 inset-0 fixed  ">
                        <div
                          onClick={toggleModal}

                          className="bg-[rgba(49,49,49,0.8)] absolute w-full h-full inset-0 "
                        ></div>             
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
              <tr key={item.accNo}>
                <td >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                  {item.accNo}
                  </Typography>
                </td>
                <td>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                  {item.cardNo}
                  </Typography>
                </td>
                <td >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                  {item.balance}
                  </Typography>
                </td>
               
                <td >
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  Edit Pin
                </Typography>
              </td>
              <td >
              <Typography
                as="a"
                href="#"
                variant="small"
                color="blue-gray"
                className="font-medium"
              >
                Delete
              </Typography>
            </td>
            <td >
            <Typography
              as="a"
              href="#"
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              Withdraw
            </Typography>
          </td>
              </tr>
            
        </tbody>
      </table>
    </Card>
    </div>
    ) : null} </>)})}</>):<></>}
    </>)}
