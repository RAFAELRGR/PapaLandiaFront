import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function RequireAuth() {
  try {
    const userloged = cookies.get("userloged");
    if (userloged) {
      return <Outlet></Outlet>;
    } else {
      return <Navigate to="/login" replace></Navigate>;
    }
  } catch (error) {
    cookies.set("userloged", false);
    return <Navigate to="/login" replace></Navigate>;
  }
}

export default RequireAuth;
