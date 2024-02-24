import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { useUser } from "../utils/useUser";
import { useNavigate } from "react-router-dom";

type DashboardContextProps = {
  eventName: string;
  setEventName: (eventName: string) => void;
};

export const DashboardContext = createContext<DashboardContextProps>({
  eventName: "",
  setEventName: () => {},
});

type DashboardProviderProps = {
  children: ReactNode;
};

export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { data: user, status } = useUser();
  const [eventName, setEventName] = useState("");

  useEffect(() => {
    const fetchEventName = async () => {
      try {
        const response = await axios.get(`/api/events`);
        const data = response.data;

        if (data && data.allEvents && data.allEvents.length > 0) {
          const lastEvent = data.allEvents[data.allEvents.length - 1];
          const eventName = lastEvent.name_of_event || "Default Event Name";
          setEventName(eventName);
          localStorage.setItem("eventName", eventName);
        }
      } catch (error) {
        console.error("Error occurred while fetching event name:", error);
      }
    };

    fetchEventName();
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "success" && !user) {
    navigate("/login");
  }

  return (
    <DashboardContext.Provider value={{ eventName, setEventName }}>
      {children}
    </DashboardContext.Provider>
  );
};
