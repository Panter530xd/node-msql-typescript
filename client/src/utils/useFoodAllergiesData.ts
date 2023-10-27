import { useQuery } from "@tanstack/react-query";

export type FoodAllergies = {
  id: number;
  name: string;
};

export default function useFoodAllergiesData() {
  const { data: foodsAllergiesQuery } = useQuery<FoodAllergies[]>(
    ["foodAllergies"],
    async () => {
      const response = await fetch(`http://localhost:3000/api/food-allergies`, {
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

  return foodsAllergiesQuery;
}
