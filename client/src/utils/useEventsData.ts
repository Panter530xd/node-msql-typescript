// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useState } from "react";

// interface EventData {
//   id: number;
//   name_of_event: string;
//   location: string;
//   type_of_event: string;
//   submission_deadline: string;
//   start_date: string;
//   end_date: string;
//   academies_part: string;
//   event_info: string;
//   client_info: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface EventStat {
//   name: string;
//   count: number;
// }

// export default function useEventsData() {
//   const [academiesPartStats, setAcademiesPartStats] = useState<EventStat[]>([]);
//   const [eventTypeStats, setEventTypeStats] = useState<EventStat[]>([]);

//   const { isLoading, isError } = useQuery<EventData[], Error>(
//     ["events"],
//     async () => {
//       const response = await axios.get(`/api/events`);
//       const data: EventData[] = response.data.allEvents;

//       const academiesPartStatsCounts: { [key: string]: number } = data.reduce(
//         (counts, event) => {
//           const academiesPart: string = event.academies_part;

//           counts[academiesPart as keyof typeof counts] =
//             (counts[academiesPart as keyof typeof counts] || 0) + 1;

//           return counts;
//         },
//         {} as { [key: string]: number }
//       );

//       const academiesPartStats: EventStat[] = Object.keys(
//         academiesPartStatsCounts
//       ).map((academyPart) => ({
//         name: academyPart,
//         count: academiesPartStatsCounts[academyPart],
//       }));

//       const eventTypeStatsCounts: { [key: string]: number } = data.reduce(
//         (counts, event) => {
//           const eventType: string = event.type_of_event;

//           counts[eventType as keyof typeof counts] =
//             (counts[eventType as keyof typeof counts] || 0) + 1;

//           return counts;
//         },
//         {} as { [key: string]: number }
//       );

//       const eventTypeStats: EventStat[] = Object.keys(eventTypeStatsCounts).map(
//         (type) => ({
//           name: type,
//           count: eventTypeStatsCounts[type],
//         })
//       );

//       setAcademiesPartStats(academiesPartStats);
//       setEventTypeStats(eventTypeStats);

//       return data;
//     }
//   );

//   return {
//     academiesPartStats,
//     eventTypeStats,
//     isLoading,
//     isError,
//   };
// }
