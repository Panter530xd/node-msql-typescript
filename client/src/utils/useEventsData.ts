import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

interface EventData {
  id: number;
  name_of_event: string;
  location: string;
  type_of_event: string;
  submission_deadline: string;
  start_date: string;
  end_date: string;
  academies_part: string;
  event_info: string;
  client_info: string;
  createdAt: string;
  updatedAt: string;
}

interface EventStat {
  name: string;
  count: number;
}

export default function useEventsData() {
  const [academiesPartStats, setAcademiesPartStats] = useState<EventStat[]>([]);
  const [eventTypeStats, setEventTypeStats] = useState<EventStat[]>([]);

  const queryClient = useQueryClient();

  const fetchEventData = async () => {
    const response = await axios.get(`http://localhost:3000/api/events`);
    const data: EventData[] = response.data;

    const academiesPartStatsCounts: { [key: string]: number } = data.reduce(
      (counts, event) => {
        const academiesPart: string = event.academies_part;

        counts[academiesPart as keyof typeof counts] =
          (counts[academiesPart as keyof typeof counts] || 0) + 1;

        return counts;
      },
      {} as { [key: string]: number }
    );

    const academiesPartStats: EventStat[] = Object.keys(
      academiesPartStatsCounts
    ).map((academyPart) => ({
      name: academyPart,
      count: academiesPartStatsCounts[academyPart],
    }));

    const eventTypeStatsCounts: { [key: string]: number } = data.reduce(
      (counts, event) => {
        const eventType: string = event.type_of_event;

        counts[eventType as keyof typeof counts] =
          (counts[eventType as keyof typeof counts] || 0) + 1;

        return counts;
      },
      {} as { [key: string]: number }
    );

    const eventTypeStats: EventStat[] = Object.keys(eventTypeStatsCounts).map(
      (type) => ({
        name: type,
        count: eventTypeStatsCounts[type],
      })
    );

    setAcademiesPartStats(academiesPartStats);
    setEventTypeStats(eventTypeStats);

    return data;
  };

  const mutation = useMutation({
    mutationFn: fetchEventData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const {
    isLoading,
    isError,
    data: eventData,
  } = useQuery<EventData[], Error>(["events"], fetchEventData);

  const refreshEventData = () => {
    mutation.mutate();
  };

  useEffect(() => {
    refreshEventData();
  }, []);

  return {
    academiesPartStats,
    eventTypeStats,
    eventData,
    isLoading,
    isError,
  };
}
