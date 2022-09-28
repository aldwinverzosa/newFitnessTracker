import { Link } from "react-router-dom";

const LoggedInDashboard = (props) => {

  const currentUser = props.currentUser;

  return (
    <div>
       <h1>Welcome To Fitness Tracker: {currentUser}</h1>
    </div>
    
  );
};
export default LoggedInDashboard;
