import { useQuery } from "@tanstack/react-query";

export type FoodAllergies = {
  id: number;
  name: string;
};

export default function useFoodAllergiesData() {
  const { data: foodsAllergiesQuery } = useQuery<FoodAllergies[]>(
    ["foodAllergies"],
    async () => {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/food-allergies`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch academies");
      }

      const data = await response.json();
      return data;
    }
  );

  return foodsAllergiesQuery;
}
