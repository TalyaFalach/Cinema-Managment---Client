import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import subscriptions from "../../Images/subscriptions.jpg";

const SubscriptionsCard = () => {
  const navigate = useNavigate()
  return (
    <div className="col-sm">
      <Card style={{ width: "18rem" }} className="CardColor">
        <Card.Img variant="top" src={subscriptions} />
        <Card.Body>
          <Card.Title>Subscriptions</Card.Title>
          <Card.Text>All Subscriptions Data</Card.Text>
          <Button onClick={() => navigate("/members")} variant="primary">
            Subscriptions Page
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SubscriptionsCard;
