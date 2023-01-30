import { Button } from "@mui/material";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userImg from "../../Images/user.png";
import { deleteItem } from "../../utils/utils";
import SubscribeComponent from "../SubscribeComponent/SubscribeComponent";

const MemberComponent = ({ member, deleteSubscription }) => {
  const navigate = useNavigate();
  const user = useSelector(state => state.currentUser)
  const dispatch = useDispatch();

  const handleEditUserBtn = () => {
    navigate("/editmember", { state: { prop: member } });
  };

  const handleDeleteBtn = async () => {
    console.log(member._id);
    const res = deleteItem("members", member._id)
      .then(() => dispatch({ type: "DELETE_MEMBER", payload: member._id }))
      .then(() => alert("Deleted"))
      .catch((e) => alert("Please Try Again"));
  };

  return (
    <div className="container">
      <Card className="CardColor" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={userImg} />
        <Card.Body>
          <Card.Title className="shadow p-3 mb-3 rounded">
            {member.name}
          </Card.Title>
          <Card.Text>
            Email: {member.email}
            <br />
            City: {member.city}
            <br />
            <Button
              onClick={handleEditUserBtn}
              className="m-4"
              variant="contained"
              color="primary"
            >
              Edit
            </Button>
            {deleteSubscription ? <Button
              onClick={handleDeleteBtn}
              className="m-4"
              variant="contained"
              color="error"
            >
              Delete
            </Button>: <Button disabled>Delete</Button>}
            
            <SubscribeComponent member={member} />
          </Card.Text>
        </Card.Body>
      </Card>
      {console.log(user)}
    </div>
  );
};

export default MemberComponent;
