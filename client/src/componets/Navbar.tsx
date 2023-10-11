import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout, user } = useAuth();

  return (
    <nav className="flex justify-between items-center bg-indigo-500 py-5 text-white px-4">
      <div>
        <a href="/" className="font-semibold">
          Node Express Typescript Mysql React
        </a>
      </div>
      <div>
        <ul className="flex justify-around gap-3 font-semibold items-center">
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
          <li>
            {user && (
              <button
                onClick={logout}
                className="px-3 py-2 bg-indigo-700 text-white rounded-lg"
              >
                Logout
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
