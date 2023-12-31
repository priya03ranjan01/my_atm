
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react";
import axios from 'axios';
import { useForm } from "react-hook-form";



export const Login = () => {
    const navigate = useNavigate();
    const [loginCredentials, setloginCredentials] = useState({
        username: "",
        password: ""
    })
    // const [validloginCredentials, setvalidloginCredentials] = useState({
    //     username: "",
    //     password: ""
    // })

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setloginCredentials({ ...loginCredentials, [e.target.name]: e.target.value });
        if (e.target.id === "password")
        { 
       if (e.target.value.length < 8) {
         setErrorMessage("Password length should not be less than 8.")};
         if (e.target.value.length > 8) {
            setErrorMessage("")};
        }
      
    };



    const handleClick = (e) => {
        if (e.target.value.length === 0) {
            // console.log(e.target,"here")
            setErrorMessage("Both username and password are required ")};
           
        if (loginCredentials.username === "" || loginCredentials.password === "") {

        }
        else {
            e.preventDefault();
            // console.log(loginCredentials);
            // axios.post('http://localhost:5165/api/admin/signUp', loginCredentials).then(res => {
            //     // console.log(res.data);
            //     setvalidloginCredentials(res.data);
            // console.log(validloginCredentials);

            axios.post('http://localhost:5165/api/admin/login', loginCredentials).then(response => {
                // console.log(response.data);
                sessionStorage.setItem('jwtToken', response.data)

                if (response.data) {
                    navigate('customer');
                      console.log(response.data);
                    //   if (response.data) 
                }
            }).catch(function (error) {
                if (error.response) {
                    if (error.response.status) {
                       console.log(error.response);
                        setErrorMessage("Invalid Credentials. Please Try again");
                    }
                }
            })

        }

    }
    // })
    return (<>
        {/* <div className="h-screen flex justify-center items-center"> */}
        <div className="relative min-h-screen flex items-center justify-center bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1532423622396-10a3f979251a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80')", }}>
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
            <Card className="w-96 ">
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className=" mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Sign In
                    </Typography>
                </CardHeader>
                <form>
                
                    <CardBody className="flex flex-col gap-4">
                        <Input label="Username" size="lg" id="username" onChange={handleChange}
                            required
                            name="username"
                            type="username"
                            autoComplete="email"
                        />
                       <div> <Input label="Password" size="lg" onChange={handleChange}
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                         required
                           
                            />
                            <div className='text-red-600 mt-4 text-sm'> {errorMessage} </div>
                            </div>
                            
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" fullWidth onClick={handleClick}>
                            Sign In
                        </Button>
                        <Typography variant="small" className="mt-6 flex justify-center">
                            {/* Don&apos;t have an account? */}
                            Forgot Password?
                            <Typography
                                as="a"
                                href="#signup"
                                variant="small"
                                color="blue-gray"
                                className="ml-1 font-bold"
                            >
                                Click here
                            </Typography>
                        </Typography>
                    </CardFooter>
                </form>
            </Card>
        </div>
    </>)

}

