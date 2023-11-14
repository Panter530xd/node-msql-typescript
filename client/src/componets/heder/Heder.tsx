import Logo from "../../images/svg/logo.svg";

export default function Heder() {
  return (
    <div className="w-11/12 max-w-screen-xl mx-auto pt-10 ">
      <a href={"/"}>
        <img
          src={Logo}
          alt={"Logo"}
          width={80}
          height={80}
          className="ml-auto lg:w-20 w-16 h-auto"
        />
      </a>
    </div>
  );
}
