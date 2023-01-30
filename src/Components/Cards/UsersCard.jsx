
import React from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import membersImg from "../../Images/members.jpg";
const UsersCard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.currentUser);
  return (
    <div className="col-sm">
      <Card style={{ width: "18rem" }} className="CardColor">
        <Card.Img variant="top" src={membersImg} />
        <Card.Body>
          <Card.Title>Users</Card.Title>
          <Card.Text>Manage Our Users.</Card.Text>
          {user.hasOwnProperty("admin") ? (
            <Button onClick={() => navigate("/users")} variant="primary">
              Users Page
            </Button>
          ) : (
            <Button disabled>Users Page</Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default UsersCard;
