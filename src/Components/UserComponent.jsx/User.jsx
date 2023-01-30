import React, { useState } from "react";
import { Button } from "@mui/material";
import { deleteItem } from "../../utils/utils";
import { Card } from "react-bootstrap";
import userImg from "./../../Images/user.png";
import { useNavigate } from "react-router-dom";

const User = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const handleEditUserBtn = () => {
    navigate("/edituser", { state: { prop: user } });
  };

  const handleDelete = async () => {
    setIsLoading(true)
    const userId = user.id;
    const res = await deleteItem("users", userId)
      .then(() => alert("User Deleted!")).then(()=>setIsLoading(false))
      .then(()=>navigate("/main"))
      
      .catch(() => alert("Oops, Please Try Again"));
  };

  return (
    <div className="">
      {isLoading ? (
        <div>
          <div class="spinner-border" role="status">
          </div>
            <span class="sr-only">Loading... Please Wait</span>
        </div>
      ) : (
        <Card className="CardColor">
          <Card.Img variant="top" src={userImg} />
          <Card.Body>
            <Card.Title className="border-dark rounded p-3 shadow">
              {user.firstName + " " + user.lastName}
            </Card.Title>

            <div className="text-muted">
              {" "}
              Username: {user.username}
              <br />
              sessionTimeOut: {user.sessionTimeOut} <br />
              Created Date: {user.createdDate} <br />
              <u>permisions: </u>
              <ul>
                {user.permissions.map((per, index) => {
                  return <li key={index}>{per}</li>;
                })}
              </ul>
            </div>

            <Button className="m-1" color="primary" onClick={handleEditUserBtn}>
              Edit User
            </Button>
            <Button
              type="button"
              className="m-1"
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default User;
