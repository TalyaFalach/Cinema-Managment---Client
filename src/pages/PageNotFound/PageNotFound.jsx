import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const mainPageBtn = () => {
    if (sessionStorage["token"]) {
      navigate("/main");
    } else {
      navigate("/");
    }
  };



  return (
    <div className="" style={{height:"100vh"}}>
      <div className="display-1">404 - Page Not Found</div>
      <button onClick={mainPageBtn} className="mt-5 m-2 btn btn-primary">
        Back To Main Page
      </button>
    </div>
  );
};

export default PageNotFound;
