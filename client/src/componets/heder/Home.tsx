import HeroImg from "../../public/img/hero-img.png";
import { Link, useLocation } from "react-router-dom";
export default function Home() {
  const location = useLocation();

  return (
    <div className="w-10/12 mx-auto py-5 max-w-screen-xl ">
      <nav className=" w-8/12 mx-auto hidden md:block">
        <ul className="flex justify-between items-center ">
          <li>
            <Link
              to="/"
              className={` font-exoFont text-lg ${
                location.pathname === "/"
                  ? "font-bold text-greenis  border-b-4 border-[#8A8787]"
                  : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={` font-exoFont text-lg ${
                location.pathname === "/about"
                  ? "font-bold text-greenis  border-b-4 border-[#8A8787]"
                  : ""
              }`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={` font-exoFont text-lg ${
                location.pathname === "/Partnerup"
                  ? "font-bold text-greenis  border-b-4 border-[#8A8787]"
                  : ""
              }`}
            >
              Partner Up
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className={` font-exoFont text-lg ${
                location.pathname === "/blog"
                  ? "font-bold text-greenis  border-b-4 border-[#8A8787]"
                  : ""
              }`}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              to="/faq"
              className={` font-exoFont text-lg ${
                location.pathname === "/faq"
                  ? "font-bold text-greenis  border-b-4 border-[#8A8787]"
                  : ""
              }`}
            >
              FAQ
            </Link>
          </li>
          <li className="mb-5">
            <Link
              to="/admin-login"
              className=" font-exoFont text-lg text-white font-semibold bg-greenis  py-2 px-7 rounded-lg "
            >
              Log in
            </Link>
          </li>
        </ul>
        <hr className="border-b-1 border-[#8A8787] " />
      </nav>
      <div className=" md:flex md:flex-row  flex flex-col-reverse justify-between items-center md:py-10 md:gap-10  md:w-8/12 w-11/12 mx-auto">
        <div className="text-greenis font-exoFont  font-bold md:text-5xl text-3xl md:leading-normal">
          <h1 className="p-0">HackMatch</h1>
          <div className="flex flex-col md:flex-row md:gap-5 gap-2">
            <Link
              to="/admin-login"
              className="bg-white font-exoFont text-greenis  py-1 px-2 rounded-lg md:mt-5 mt-3 text-lg  border-greenis  border-2"
            >
              Get Update
            </Link>
          </div>
        </div>
        <div>
          <img
            width={1000}
            height={150}
            src={HeroImg}
            alt={"Hero Banners"}
            className="w-[500px] h-auto"
          />
        </div>
      </div>
    </div>
  );
}
