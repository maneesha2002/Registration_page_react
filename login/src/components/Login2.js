import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { database, txtDB } from '../Firebase/Firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

function Login2() {
    const[email,setemail]=useState("")
    const[password,setpassword]=useState("")
    const[alertMessage,setAlertMessage]=useState("");
    const navigate=useNavigate();

    const triggerAlert=(message)=>{
        setAlertMessage(message);
        setTimeout(()=>{
            setAlertMessage("");
        },3000)
    }

    const signin=()=>{
        signInWithEmailAndPassword(database,email,password)
        .then(async(data)=>{
            console.log(data,"authdata");

            const userQuery=query(collection(txtDB,`users`),where('email','==',email));
            const querySnapshot=await getDocs(userQuery);
            if(!querySnapshot.empty){
                const userData=querySnapshot.docs[0].data();
                localStorage.setItem('users',JSON.stringify(userData));

                triggerAlert("login success");
                setTimeout(()=>{
                    navigate("/home")
                },1000)
            }else{
                triggerAlert("User data not found")
            }
        }).catch((err)=>{
            triggerAlert("check your email password")
        })
    }
  return (
    <LoginWrapper>
        {alertMessage &&(
            <AlertOverlay>
                <AlertPopup>
                    {alertMessage}
                </AlertPopup>
            </AlertOverlay>
        )}
        <FormWrapper>
            <h2>Login</h2>
            <h3>Email:</h3>
           <Input type='text' value={email} onChange={(e)=>setemail(e.target.value)}
           /><br/><br/>
           <h3>Password:</h3>
           <Input type='password' value={password} onChange={(e)=>setpassword(e.target.value)}/><br/><br/>
           <ResetPassword>
            Forgot password?
           </ResetPassword>
           <LoginButton onClick={signin}>Login</LoginButton>
           
        </FormWrapper>
    </LoginWrapper>
  )
}

export default Login2
const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const FormWrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
  max-width: 500px; // Increased max-width for larger form
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin-bottom: 1.5rem; // Increased margin for more spacing
    font-size: 2rem; // Larger font size for the heading
  }

  label {
    font-size: 1.25rem; // Increased font size for labels
    margin-bottom: 1rem; // More space below the labels
  }
`;


const Input = styled.input`
  padding: 1rem; // Increased padding for larger text boxes
  width: 100%;
  margin-bottom: 1.5rem; // More space between inputs
  border: 1px solid #ccc;
  border-radius: 6px; // Slightly rounded corners
  font-size: 1.25rem; // Larger font size for input text
`;



const AlertOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);  // Semi-transparent background
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;  // Ensures it stays on top
`;

const AlertPopup = styled.div`
  background-color: #fff;
  padding: 3rem;  // Increased padding for a bigger pop-up
  border-radius: 15px;  // Increased border-radius for a smoother look
  text-align: center;
  font-size: 1.5rem;  // Larger font size for more emphasis
  font-weight: bold;
  color: #155724;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);  // Increased shadow for depth
  max-width: 500px;  // Max width for the pop-up
  width: 90%;  // Responsive width
  border: 2px solid #155724;  // Optional border for emphasis
`;

const ResetPassword = styled.p`
  cursor: pointer;
  color: blue;
  text-decoration: underline;
  margin-bottom: 1rem;
`;



const LoginButton = styled.button`
  background-color: #4CAF50; /* Green background */
  border: none; /* Remove borders */
  color: white; /* White text */
  padding: 15px 32px; /* Add some padding */
  text-align: center; /* Center the text */
  text-decoration: none; /* Remove underline */
  display: inline-block; /* Make the button inline */
  font-size: 16px; /* Increase font size */
  margin: 10px 2px; /* Some space around the button */
  cursor: pointer; /* Pointer cursor on hover */
  border-radius: 4px; /* Rounded corners */
  transition: background-color 0.3s ease-in-out; /* Smooth transition */

  &:hover {
    background-color: #45a049; /* Darker green on hover */
  }

  &:focus {
    outline: none; /* Remove outline on focus */
  }
`;

