import { Button, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { updateItem, deleteTrim } from "../../utils/utils";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/NavBar";
import { useDispatch } from "react-redux";
import { FormLabel } from "react-bootstrap";

const EditMoviePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const prop = location.state.prop;

    setMovie({ ...prop });
    console.log(prop);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const res = await updateItem("movies", movie._id, movie)
      .then(() => dispatch({ type: "UPDATE_MOVIE", payload: movie }))
      .then(()=>setIsLoading(false))
      .then(() => navigate("/movies"));
  };

  const handleGenres = (e) => {
    let genres = deleteTrim(e);
    setMovie({ ...movie, genres: [...genres] });
  };
  return (
    <div className="bgc" style={{ height: "100vh" }}>
      <NavBar />


      <div className="display-3  mt-3 mb-5 ">Edit Movie</div>
      {
        isLoading ?<div className="border h-100 rounded p-5">
          <div class="spinner-border" role="status"></div>
          <span class="sr-only h3">Loading...</span>
        </div> :<form onSubmit={handleSubmit}>
        <FormLabel>Movie Name</FormLabel>
        <input
          defaultValue={movie.name}
          variant="outlined"
          className="form-control mx-auto"
          style={{ maxWidth: "300px" }}
          onChange={(e) => setMovie({ ...movie, name: e.target.value })}
        />
        <FormLabel className="font-weight-bold">Genres</FormLabel>
        <input
          defaultValue={movie.genres}
          className="form-control mx-auto"
          style={{ maxWidth: "300px" }}
          label={movie.genres}
          variant="outlined"
          onChange={handleGenres}
        />
        <FormLabel>Image URL</FormLabel>
        <input
          className="form-control mx-auto"
          style={{ maxWidth: "300px" }}
          defaultValue={movie.image}
          variant="outlined"
          onChange={(e) => setMovie({ ...movie, image: e.target.value })}
        />{" "}
        <FormLabel>Premiered</FormLabel>
        <input
          className="form-control mx-auto"
          style={{ maxWidth: "300px" }}
          defaultValue={movie.premiered}
          variant="outlined"
          onChange={(e) => setMovie({ ...movie, premiered: e.target.value })}
        />{" "}
        <br />
        <Button className="m-2" type="submit" variant="contained">
          Edit
        </Button>
      </form>
      }
      
      <Button
        className="m-2"
        onClick={() => navigate("/movies")}
        type="button"
        variant="contained"
        color="error"
      >
        Cancel
      </Button>
    </div>
  );
};

export default EditMoviePage;
