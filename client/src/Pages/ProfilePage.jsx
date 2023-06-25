import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacePage from "./placePage";
import AccountNavPage from "../components/accountNav";

const ProfilePage = () => {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const logout = async () => {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
  };

  if (!ready) {
    return "Loding...";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }


  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
        <AccountNavPage/>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          logged in as {user.username} ({user.email})<br />
          <button
            onClick={logout}
            className="primary max-w-sm mt-2 rounded-full"
          >
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <div>{<PlacePage />}</div>}
    </div>
  );
};

export default ProfilePage;
