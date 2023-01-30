import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovies } from "../../utils/utils";
import NavBar from "../../Components/Navbar/NavBar";
import MovieComponent from "../../Components/MovieComponent/MovieComponent";
import { TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CarouselComponent from "../../Components/CarouselComponent/CarouselComponent";

const MoviesPage = () => {
  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const [allMovies, setAllMovies] = useState([]);
  const [deleteMovie, setDeleteMovie] = useState(false);
  const [createMovie, setCreateMovie] = useState(false);
  const [viewMovie, setViewMovie] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredSearchMovies, setFilteredSearchMovies] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    console.log(user.permissions);
    user.permissions.map((per) => {
      if (per === "Delete Movies") {
        setDeleteMovie(true);
      }
      if (per === "Create Movies") {
        setCreateMovie(true);
        sessionStorage["Create Movies"] = true;
      }
      if (per === "View Movies") {
        setViewMovie(true);
      }
    });
  }, []);

  useEffect(() => {
    if (sessionStorage["token"] === undefined) {
      navigate("/pagenotfound");
    }
  }, []);

  useEffect(() => {
    setAllMovies([...movies]);
  }, [movies]);

  useEffect(() => {
    if (movies.length === 0) {
      const fetchData = async () => {
        const data = await getMovies();
        dispatch({ type: "SET_MOVIES_DATA", payload: data });
        setAllMovies([...data]);
      };
      
      fetchData();
    }
  }, []);

  useEffect(() => {
    setAllMovies([...movies]);
  }, []);

  const handleSearchBtn = (e) => {
    setSearchInput(e.target.value);

    let copyMovies = [...allMovies];
    if (searchInput.length > 0) {
      let filteredMovies = copyMovies.filter((m) =>
        m.name.toLowerCase().includes(searchInput)
      );
      setFilteredSearchMovies([...filteredMovies]);
    }
  };
  return (
    <div className=" bgc">
      <NavBar />
      <div className="display-4 mb-3">Movies</div>
      <TextField
        
        className=" container w-100 mt-2 mb-2 shadow "
        onChange={handleSearchBtn}
        label="Search"
        variant="outlined"
      />
      {createMovie ? (
        <Button
          size="large"
          className="mt-3 mb-3 w-75 "
          onClick={() => navigate("/addmovie")}
          variant="contained"
        >
          Create New Movie
        </Button>
      ) : (
        <Button variant="contained" disabled>
          Create New Movie
        </Button>
      )}

      <br />

      

      {searchInput.length !== 0 ? (
        <div className="row">
          {filteredSearchMovies.map((movie, index) => {
            return (
              <div className="col-sm-3" key={index}>
                <MovieComponent
                  deleteMovie={deleteMovie}
                  viewMovie={viewMovie}
                  createMovie={createMovie}
                  movie={movie}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="row">
          <CarouselComponent />
          {allMovies?.map((movie, index) => {
            return (
              <div className="col-sm-3" key={index}>
                <MovieComponent
                  deleteMovie={deleteMovie}
                  viewMovie={viewMovie}
                  createMovie={createMovie}
                  movie={movie}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
