import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTrim, createNewItem, getMovies } from "../../utils/utils";
import NavBar from "../../Components/Navbar/NavBar";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";

const AddMovie = () => {
  const user = useSelector((state) => state.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newMovie, setNewMovie] = useState({
    name: "",
    genres: [],
    image: "",
    premiered: "",
  });
  useEffect(() => {
console.log(sessionStorage["Create Movies"]);    
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(!isLoading);
    const res = createNewItem("movies", newMovie)
      .then(async () =>
        dispatch({ type: "SET_MOVIES_DATA", payload: await getMovies() })
      )
      .then(() => setIsLoading(!isLoading))

      .then(() => alert("Created !"))
      .then(() => navigate("/movies"));

    console.log(res);
  };
  const setGenres = (e) => {
    let genresArray = deleteTrim(e);
    setNewMovie({ ...newMovie, genres: [...genresArray] });
  };
  return (
    <div className="bgc" style={{height:"100vh"}}>
      <NavBar />
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div>
          <div className="display-4 mt-2 mb-2">Add New Movie</div>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              className="m-2"
              label="Movie Name"
              onChange={(e) =>
                setNewMovie({ ...newMovie, name: e.target.value })
              }
            />{" "}
            <br />
            <TextField
              className="m-2"
              label="Genres"
              onChange={setGenres}
              required
            />
            <TextField
              required
              className="m-2"
              label="Image URL"
              onChange={(e) =>
                setNewMovie({ ...newMovie, image: e.target.value })
              }
            />{" "}
            <br />
            Premiered <br />
            <TextField
              required
              type="date"
              className="m-2"
              onChange={(e) =>
                setNewMovie({ ...newMovie, premiered: e.target.value })
              }
            />{" "}
            <br />
            <button className="btn btn-success m-2">Save</button>
          </form>
          <button
            onClick={() => navigate("/movies")}
            className="btn btn-danger m-2"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default AddMovie;
