import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import moviescard from "../../Images/moviesCard.jpg";


const MovieCard = () => {
  const navigate = useNavigate()
  return (
    <div className="col-sm mb-5 ">
      <Card style={{ width: "18rem" }} className="CardColor">
        <Card.Img style={{ height: "190px" }} variant="top" src={moviescard} />
        <Card.Body>
          <Card.Title>Movies</Card.Title>
          <Card.Text>Movies Managment Page</Card.Text>
          <Button onClick={() => navigate("/movies")} variant="primary">
            Movies Page
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MovieCard