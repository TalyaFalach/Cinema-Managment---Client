import "./Main.css";

import NavBar from "../../Components/Navbar/NavBar";

import movie from "../../Images/smallMovie.jpg";

import MovieCard from "../../Components/Cards/MovieCard";
import SubscriptionsCard from "../../Components/Cards/SubscriptionsCard";
import UsersCard from "../../Components/Cards/UsersCard";

const MainPage = () => {
  return (
    <div className="bgc mx-auto">
      <NavBar />

      <div className="row container mx-auto">
        <div className=" col-sm">
          <h1 className="display-2 mb-4">Welcome!</h1>
          <p className="font-weight-bold text-light fs-4 ">
            {" "}
            Manage our system, by adding the newest movies, editing and deleting
            old movies, and serve our customers in the best way we can
          </p>
          <div className="font-weight-light"> </div>
        </div>
        <div className="col-sm">
          <img className="w-100" src={movie} alt="movie" />
        </div>
      </div>
      <div className="container mx-auto row mt-5">
        <MovieCard />

        <SubscriptionsCard />

        <UsersCard />
      </div>
    </div>
  );
};

export default MainPage;

