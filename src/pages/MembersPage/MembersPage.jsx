import { useEffect, useState } from "react";
import "./MembersPage.css";
import NavBar from "../../Components/Navbar/NavBar";
import { useSelector } from "react-redux";
import MemberComponent from "../../Components/MemberComponent/Member";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SubscriptionsPage = () => {
  const members = useSelector((state) => state.members);
  const user = useSelector((state) => state.currentUser);
  const navigate = useNavigate();
  const [AllMembers, setAllMembers] = useState([]);
  const [isAllowed, setIsAllowed] = useState(false);
  const [createSubscription, setCreateSubscription] = useState(false);
  const [deleteSubscription, setDeleteSubscription] = useState(false);

  useEffect(() => {
    const permissions = user.permissions;
    console.log(permissions);
    if (user.hasOwnProperty("admin")) {
      setIsAllowed(true)
      setCreateSubscription(true)
      setDeleteSubscription(true)
    }else{
      for (let i = 0; i >= permissions.length; i++) {
        if (permissions[i] === "View Subscriptions") {
          return;
        } else {
          navigate("/pagenotfound");
        }
        if (permissions[i] === "Create Subscriptions") {
          return setCreateSubscription(true);
        }
        if (permissions[i] === "Delete Subscriptions") {
          setDeleteSubscription(true);
          console.log("deleteSubscription", deleteSubscription);
        }
      }
    }
  }, []);

  useEffect(() => {
    setAllMembers([...members]);
  }, [members]);

  return (
    <div className="bgc">
      <NavBar />
      <div className="myborder mt-4 mb-4 mx-auto container">
        <div className="display-4 mt-3 mb-3">Members Page</div>
        <p>
          {" "}
          Managing and serving our customers, and connecting to the movies they
          subscribe to{" "}
        </p>
      </div>
      {createSubscription ? (
        <Button
          className=" mb-3 w-75 myBtn"
          onClick={() => navigate("/addmember")}
          variant="contained"
        >
          Add New Member
        </Button>
      ) : (
        <Button disabled>Add New Member</Button>
      )}
     

      <div className="row mx-auto container">
        {members.map((member, index) => {
          return (
            <div key={index} className="col ">
              <MemberComponent
                deleteSubscription={deleteSubscription}
                member={member}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionsPage;
