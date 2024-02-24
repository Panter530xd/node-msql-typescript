import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout, user } = useAuth();

  return (
    <nav className="flex justify-between items-center bg-indigo-500 py-5 text-white px-4">
      <div>
        <Link to="/" className="font-semibold">
          Node Express Typescript Mysql React
        </Link>
      </div>
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
