import { deleteItem } from "../../utils/utils";
import { Button } from "@mui/material";
import Dropdown from "react-bootstrap/Dropdown";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./MovieComponent.css";
import { useState } from "react";
const MovieComponent = ({ movie, deleteMovie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleEditMovie = () => {
    navigate("/editmovie", { state: { prop: movie } });
  };

  const deleteMovies = async () => {
    setIsLoading(true);
    const movieId = movie._id;
    const res = await deleteItem("movies", movieId).catch(() =>
      alert("Please Try Again")
    );
    if (res.status === 200) {
      dispatch({ type: "DELETE_MOVIES", payload: movieId });
      alert("Movie Deleted!");
      setIsLoading(false);
      navigate("/movies");
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="border h-100 rounded p-5">
          <div class="spinner-border" role="status"></div>
          <span class="sr-only h3">Loading...</span>
        </div>
      ) : (
        <Card className="myCard CardColor">
          <Card.Img variant="top" src={movie.image} />
          <Card.Body>
            <h3>{movie.name}</h3>
            <h6>Premiered: {movie.premiered}</h6>

            <Card.Text>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  Genres
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {movie.genres.map((g, index) => {
                    return <Dropdown.Item key={index}>{g}</Dropdown.Item>;
                  })}
                </Dropdown.Menu>
              </Dropdown>

              <div className="col">subscriptions Watched</div>
            </Card.Text>
            <Button className="m-2" onClick={handleEditMovie}>
              Edit
            </Button>
            {deleteMovie ? (
              <Button className="m-2" color="error" onClick={deleteMovies}>
                Delete
              </Button>
            ) : (
              <Button disabled>Delete</Button>
            )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default MovieComponent;
