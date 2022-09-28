import { Link } from "react-router-dom";
import Login from "./login";

const Dashboard = () => {
  return (
    <div>
      <div>
        <nav>
          <Link className="navBarLink" to="/allroutines">
            Routines
          </Link>
          <Link className="navBarLink" to="/allactivities">
            Activities
          </Link>
        </nav>
        <div className="logout2">
        </div>
        <div>
        </div>
      </div>

      <h1>Fitness Tracker</h1>
      <div>
        <Login/>
      </div>
      <div></div>
    </div>
  );
};
export default Dashboard;
