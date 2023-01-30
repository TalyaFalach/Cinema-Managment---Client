import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();
  const url = "http://localhost:5000/auth/register";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(0);

  const handleSignUpBtn = async () => {
    const obj = { username: username, password: parseInt(password) };

    const res = await axios
      .post(url, obj, {
        Headers: {
          "content-type": "text/json",
        },
      })
      .then(() => alert("New Account Created!"))
      .then(() => navigate("/"))
      .catch(() => alert("Please Try Again"));
  };
  return (
    <div>
      <h1 className="display-4 m-3 mb-3 bgc">Create New Account</h1>
      <br />
      <TextField
       
        label="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <TextField
      
        type="password"
        label="Password"
        className="m-3"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <Button variant="contained" onClick={handleSignUpBtn} className="mt-3">
        Sign Up
      </Button>{" "}
      <br />
      <Button className="mt-3" onClick={() => navigate("/")}>
        BACK TO LOGIN PAGE
      </Button>
    </div>
  );
};

export default CreateAccount;
