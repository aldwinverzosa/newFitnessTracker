import { Link } from "react-router-dom";
import LogoutButton from "./logoutButton";

const LoggedInDashboard = () => {
  return (
    <div>
      <div>
        <nav>
          <Link className="navBarLink" to="/routines">
            Routines
          </Link>
          <Link className="navBarLink" to="/activities">
            Activities
          </Link>
        </nav>
        <LogoutButton/>

        <div className="logout2">
        </div>
        <div>
        </div>
      </div>

      <h1>Welcome</h1>
      <div>
      </div>
      <div></div>
    </div>
  );
};
export default LoggedInDashboard;
