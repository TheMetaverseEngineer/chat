import React,  { useState , useEffect } from 'react';
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import {ToastContainer , toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';



function Login() {
    const navigate = useNavigate()
    const toastOptions =
        {
            position: "bottom-right",
            autoClose : 10000,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",

        }
    
    const [values, setValues]= useState({

        username : "",
        password:"",
       

    }
       
    );
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handlevalidation()){

            const { password, username } = values ;
            const {data}= await axios.post(loginRoute, {
                username ,
                
                password ,
            });
            if(data.status===false) {
                toast.error(data.msg , toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem('chat-app-user' , JSON.stringify(data.user));
                navigate("/");
            }
           
        }
    };

    const handlevalidation = () => {
        const { password, username } = values ;
        if (password === "" ) {
            toast.error("password is empty",toastOptions);
            return false;
        } else if (username.length === "") {
            toast.error("Username is empty" ,toastOptions);
            return false;
        } 
            


            return true;
    };
    const handleChange = (event) => {     

        setValues({...values,[event.target.name]:event.target.value});
    };

  return (
    <>
    
    <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
            <div className="brand">
                <img src={Logo} alt="logo" />
                <h1>Login </h1>


            </div>
            <input 
            type="text" 
            placeholder="Username" 
            name="username" 
            onChange={(e)=>handleChange(e)}
            min="3"
            />
           
            <input 
            type="password" 
            placeholder="Password" 
            name="password" 
            onChange={(e)=>handleChange(e)}
            />
            

            <button type="submit"> Login </button>
            <span> 
                Don't Have Account  ? <Link to="/register"> Register </Link> 
            </span>
        </form>
    </FormContainer>
    <ToastContainer />
    
    </>
  )
}


const FormContainer = styled.div`
    height: 120vh;
    weight: 120vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap : 1rem;
    align-items: center;
    background-color: #131324;
    .brand {
        display: flex;
        align-items: center;
        gap = 1rem;
        jusitf-content: center;
        img {
            height : 5rem;
        }
        h1 {
            color : white;
            text-transform : uppercase;
        }
        
    }
    form {
        display: flex;
        flex-direction : column;
        gap: 2rem;
        background-colo: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input {
            background-color: transparent;
            padding: 1rem ;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size : 1rem;
            :focus {
                border: 0.1rem solid #997af0;
                outline : none;
            }
        }

        button {
            background-color : #997af0;
            color : white;
            padding : 1rem 2rem;
            border : none;
            font-weight : bold ;
            cursor : pointer ; 
            border-radius : 0.4rem;
            font-size : 1rem;
            transition : 0.5s ease-in-out;
            :hover {
                background-color: #4e0eff;
            }
        }
        span {
            color:white;
            text-transform : uppercase ;
            a {
                color : #4e0ff;
                text-decoration : none;
                font-weight : bold ; 
            }
        }
    }
` ; 
export default Login;