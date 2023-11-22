import { useQuery } from "@tanstack/react-query";

export type Academy = {
  id: number;
  name: string;
};

export default function useAcademyData() {
  const { data: academies, error } = useQuery<Academy[]>(
    ["academies"],
    async () => {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/academies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch academies");
      }

      const data = await response.json();
      return data;
    }
  );

  if (error) {
    console.error("Error fetching academies:", error);
  }

  return academies;
}
