import { Link } from "react-router-dom";

export default function RegisterUser() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 h-[90vh]">
      <h3 className="text-4xl text-indigo-400">
        Error 404 Sorry we don't have this Page
      </h3>
      <Link
        className=" bg-indigo-500 text-white py-2 px-3 rounded uppercase"
        to="/"
      >
        Back to Home
      </Link>
    </div>
  );
}
