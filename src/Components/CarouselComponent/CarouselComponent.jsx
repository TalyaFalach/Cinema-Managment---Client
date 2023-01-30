import { useState, useEffect } from "react";
import "./CarouselComponent.css"

import Carousel from "react-bootstrap/Carousel";
import { useSelector } from "react-redux";
const CarouselComponent = () => {
  const movies = useSelector((state) => state.movies);

  const [lastMovies, setLastMovies] = useState([]);
  useEffect(() => {
    const last3Movies = movies.slice(-3);
    setLastMovies([...last3Movies]);
    console.log(lastMovies);
  }, [movies]);

  return (
    <>
      
      <Carousel className="shadow p-3 mb-5 rounded bgc">
        {lastMovies.map((movie, index) => {
          return (
            <Carousel.Item key={index}>
              <div className="row">
                <div className="col-sm-6">
                  <div class="wrapper two">
                    <div class="neon" >
                      <h3>New!</h3>
                      <h3>{movie.name}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <img
                    style={{ height: "500px", width: "100%" }}
                    className="d-block"
                    src={movie.image}
                    alt="First slide"
                  />
                </div>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
};
export default CarouselComponent;
