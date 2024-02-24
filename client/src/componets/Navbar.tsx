import { Link } from "react-router-dom";
import { useLogout } from "../utils/useLogout";
import { useUser } from "../utils/useUser";

export default function Navbar() {
  const logoutMutation = useLogout();
  const { data: user } = useUser();

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };

  return (
    <nav className="flex justify-between items-center bg-indigo-500 py-5 text-white px-4">
      <Link to="/" className="font-semibold">
        Node Express Typescript Mysql React
      </Link>
      {user ? (
        <div>
          <button
            onClick={logout}
            className="px-3 py-2 bg-indigo-700 text-white rounded-lg"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <ul className="flex justify-around gap-3 font-semibold items-center">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
