import React, { useRef, useState } from 'react'
import { database, imgDB, txtDB } from '../Firebase/Firebase';
import styled from 'styled-components';
import { FcAddImage } from 'react-icons/fc';
import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

function Login() {
  
  
  const [emailReg, setEmailReg] = useState("");
  const [name, setName] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [mobile, setmobile] = useState("");
  const [alertMessage, setAlertMessage] = useState(""); 
  const [profileImage, setProfileImage] = useState(null); 
  const [imagePreview, setImagePreview] = useState(null); 

  const fileInputRef = useRef(null); 

  const triggerAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage("");
    }, 3000); 
  };

  const signup = async () => {
    if (profileImage) {
      // Upload profile image to Firebase Storage
      const imageRef = ref(imgDB, `profileImages/${emailReg}`);
      await uploadBytes(imageRef, profileImage);
      const downloadURL = await getDownloadURL(imageRef);
      //setImageURL(downloadURL);

      createUserWithEmailAndPassword(database, emailReg, passwordReg)
        .then((data) => {
          console.log(data, "authdata");
          triggerAlert("Registration Successful! Please login.");
        })
        .catch((err) => {
          alert(err.code);
        });

      const valRef = collection(txtDB, 'users');
      await addDoc(valRef, {
        username: name,
        email: emailReg,
        password: passwordReg,
        contact: mobile,
        profileImage: downloadURL // Save the image URL in Firestore
      });

      alert("Data Added Successfully");
    } else {
      triggerAlert("Please upload a profile image.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file); // Store the selected image file in state

    // Create a preview URL to display the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Store the preview URL
    };
    reader.readAsDataURL(file);
  };

  const handleIconClick = () => {
    fileInputRef.current.click(); // Trigger the file input when the icon is clicked
  };

  return (
    <RegWrapper>
       {alertMessage && (
        <AlertOverlay>
          <AlertPopup>{alertMessage}</AlertPopup>
        </AlertOverlay>
      )}
  <FormWrapper>
      <h2>Register</h2>

      {/* Image Upload Section */}
      <ProfileImageWrapper onClick={handleIconClick}>
        {imagePreview ? (
          <ProfileImage src={imagePreview} alt="Profile Preview" />
        ) : (
          <FcAddImage size={80} />
        )}
      </ProfileImageWrapper>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef} // Bind the ref to the file input
        onChange={handleImageChange}
        style={{ display: 'none' }} // Hide the actual file input
      /><br /><br />

      <label>Email:</label>
      <Input
        type="text"
        value={emailReg}
        onChange={(e) => setEmailReg(e.target.value)}
      /><br /><br />
      <label>Password:</label>
      <Input
        type="password"
        value={passwordReg}
        onChange={(e) => setPasswordReg(e.target.value)}
      /><br /><br />
      <label>Name:</label>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br /><br />
      <label>Contact:</label>
      <Input
        type="text"
        value={mobile}
        onChange={(e) => setmobile(e.target.value)}
      /><br /><br />
      <LoginButton onClick={signup}>Register</LoginButton>
    </FormWrapper>
    </RegWrapper>
  )
}

export default Login
const RegWrapper = styled.div`
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

const ProfileImageWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px; // Increased width for larger image box
  height: 150px; // Increased height for larger image box
  border: 2px dashed #ccc;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1.5rem; // Added margin below the image box
`;


const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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

