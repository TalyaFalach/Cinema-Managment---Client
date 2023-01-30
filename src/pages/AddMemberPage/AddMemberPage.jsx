import { Button, TextField } from "@mui/material";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/NavBar";
import { useDispatch } from "react-redux";
import axios from "axios";

const AddMemberPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({ name: "", email: "", city: "" });

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    const res = await axios
      .post(`http://localhost:5000/members`, user, {
        headers: { "x-access-token": "text/json" },
      })
      .catch(() => alert("Please Try Again"));

    if (res.status === 200) {
      const userId = res.data.userId;
      setUser({ ...user, _id: userId });
      dispatch({ type: "ADD_MEMBER", payload: {user:user, userId:userId} });
      navigate("/members");
    }
  };
  return (
    <div className="bgc" style={{height:"100vh"}}>
      <NavBar />
      <h1 className="display-4 mt-3 mb-3">Add New Member</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          className="m-2"
          name="name"
          label="Full Name"
          variant="outlined"
          onChange={handleChange}
        />{" "}
        <br />
        <TextField
          name="email"
          className="m-2"
          label="Email Address"
          variant="outlined"
          onChange={handleChange}
        />{" "}
        <br />
        <TextField
          className="m-2"
          name="city"
          label="City"
          variant="outlined"
          onChange={handleChange}
        />{" "}
        <br />
        <Button type="submit" variant="contained">
          Create
        </Button>
        <Button
          type="button"
          variant="contained"
          color="error"
          onClick={() => navigate("/members")}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default AddMemberPage;
