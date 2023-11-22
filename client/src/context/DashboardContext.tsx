import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

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
  const [eventName, setEventName] = useState("");

  useEffect(() => {
    const fetchEventName = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/academies`
        );
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

  return (
    <DashboardContext.Provider value={{ eventName, setEventName }}>
      {children}
    </DashboardContext.Provider>
  );
};
