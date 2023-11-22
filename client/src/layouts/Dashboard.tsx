import Footer from "../componets/Footer";
import Heder from "../componets/heder/Heder";
import { Link, useLocation, useOutlet } from "react-router-dom";
import Menu2 from "../images/svg/Menu2.svg";
import { useState } from "react";
import { CSVLink } from "react-csv";
import React, { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";
import useERegistrationData from "../utils/useRegistrationData";

type DashboardLinkProps = {
  to?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

function DashboardLink({ to, onClick, children }: DashboardLinkProps) {
  const location = useLocation();

  if (to) {
    return (
      <Link
        to={to}
        className={`flex  items-center text-lg ${
          location.pathname === to
            ? " font-bold text-greenis border-b-2 border-greenis"
            : ""
        }`}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`flex items-center  rounded-lg `}>
      {children}
    </button>
  );
}

export default function DashboardLayout() {
  const { registrationData } = useERegistrationData();
  const { eventName, setEventName } = useContext(DashboardContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const outlet = useOutlet();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!registrationData) {
    return;
  }
  const registrationTeams = registrationData.map((table) => table);
  return (
    <div className="bg-dashboard relative">
      <Heder />
      <main className="min-h-screen w-full ">
        <div className="md:w-7/12 w-11/12 md:py-7 pt-2 mx-auto max-w-screen-xl">
          <input
            type="text"
            placeholder="Name of the event"
            className="bg-gray-50 border border-black text-gray-900 text-base rounded-lg block p-2.5 placeholder:w-full px-4 font-exoFont w-1/2"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <nav className=" font-exoFont">
          <div className=" flex items-center ">
            <div className="hidden md:flex items-center gap-6 md:w-7/12 w-11/12 mx-auto max-w-screen-xl ">
              <DashboardLink
                to="/dashboard/description"
                onClick={() => setEventName(eventName)}
              >
                Description
              </DashboardLink>
              <DashboardLink to="/dashboard/agenda">Agenda</DashboardLink>
              <DashboardLink to="/dashboard/teams">Teams</DashboardLink>
              <DashboardLink to="/dashboard/statistics">
                Statistics
              </DashboardLink>
              <DashboardLink to="/dashboard/results">Results</DashboardLink>

              <div className="ml-auto">
                <DashboardLink>
                  <CSVLink
                    data={registrationTeams}
                    className="bg-orange text-black py-2 px-10 rounded-lg whitespace-nowrap font-semibold"
                  >
                    Export as Excel sheet
                  </CSVLink>
                </DashboardLink>
              </div>
            </div>

            <div className="md:hidden">
              {isMenuOpen ? (
                <div className="absolute left-0 top-0 h-full w-full  bg-white z-50">
                  <div className="flex items-center justify-between px-4 py-2">
                    <h3 className="text-xl font-semibold">Menu</h3>
                    <button
                      onClick={toggleMenu}
                      className="text-gray-600 focus:outline-none"
                    >
                      Close
                    </button>
                  </div>
                  <div className="flex flex-col gap-4 p-4">
                    <DashboardLink
                      to="/dashboard/description"
                      onClick={toggleMenu}
                    >
                      Description
                    </DashboardLink>
                    <DashboardLink to="/dashboard/agenda" onClick={toggleMenu}>
                      Agenda
                    </DashboardLink>
                    <DashboardLink to="/dashboard/teams" onClick={toggleMenu}>
                      Teams
                    </DashboardLink>
                    <DashboardLink
                      to="/dashboard/statistics"
                      onClick={toggleMenu}
                    >
                      Statistics
                    </DashboardLink>
                    <DashboardLink to="/dashboard/results" onClick={toggleMenu}>
                      Results
                    </DashboardLink>
                    <div>
                      <DashboardLink>
                        <div
                          className="bg-orange text-black py-2 px-10 rounded-lg whitespace-nowrap font-semibold"
                          onClick={toggleMenu}
                        >
                          Export as Excel sheet
                        </div>
                      </DashboardLink>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={toggleMenu}
                  className="flex items-center rounded-lg absolute top-[75px] left-5"
                >
                  <img src={Menu2} alt="menu mobile" width={35} />
                </button>
              )}
            </div>
          </div>
        </nav>
        <section className="w-full">{outlet}</section>
      </main>
      <Footer />
    </div>
  );
}
