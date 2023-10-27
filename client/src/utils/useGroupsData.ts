import { useQuery } from "@tanstack/react-query";

export type Group = {
  id: number;
  name: string;
  academyId: number;
};

export default function useGroupsData() {
  const { data: groupsQuery } = useQuery<Group[]>(["groups"], async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/groups`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch groups");
      }

      const groupsData = await response.json();

      return groupsData;
    } catch (error) {
      console.error("Error fetching groups:", error);
      throw error;
    }
  });

  return groupsQuery;
}
