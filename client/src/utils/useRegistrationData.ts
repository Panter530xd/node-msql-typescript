import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { useEffect, useState } from "react";

export interface RegistrationData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  academy: string;
  group: string;
  number_months: string;
  participation: string;
  food_allergies: string;
  food_preferences: string;
  accept_terms: boolean;
  createdAt: string;
  updatedAt: string;
  position: number;
}

interface RegisterStat {
  name: string;
  count: number;
}

export default function useERegistrationData() {
  const [foodAlergiesPartStats, setFoodAlergiesPartStats] = useState<
    RegisterStat[]
  >([]);
  const [foodPreferencesStats, setFoodPreferencesStats] = useState<
    RegisterStat[]
  >([]);

  const queryClient = useQueryClient();

  const fetchRegistrationData = async () => {
    const response = await axios.get(`http://localhost:3000/api/registration`);
    const data: RegistrationData[] = response.data;

    const foodAlergiesCount: { [key: string]: number } = data.reduce(
      (counts, event) => {
        const foodPart: string = event.food_allergies;

        counts[foodPart as keyof typeof counts] =
          (counts[foodPart as keyof typeof counts] || 0) + 1;

        return counts;
      },
      {} as { [key: string]: number }
    );

    const computedFoodAlergiesPartStats: RegisterStat[] = Object.keys(
      foodAlergiesCount
    ).map((foodPart) => ({
      name: foodPart,
      count: foodAlergiesCount[foodPart],
    }));

    const foodPreferencesStatsCounts: { [key: string]: number } = data.reduce(
      (counts, event) => {
        const eventType: string = event.food_preferences;

        counts[eventType as keyof typeof counts] =
          (counts[eventType as keyof typeof counts] || 0) + 1;

        return counts;
      },
      {} as { [key: string]: number }
    );

    const computedFoodPreferencesStats: RegisterStat[] = Object.keys(
      foodPreferencesStatsCounts
    ).map((type) => ({
      name: type,
      count: foodPreferencesStatsCounts[type],
    }));

    setFoodAlergiesPartStats(computedFoodAlergiesPartStats);
    setFoodPreferencesStats(computedFoodPreferencesStats);

    return data;
  };
  const mutation = useMutation({
    mutationFn: fetchRegistrationData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrationData"] });
    },
  });

  const {
    isLoading,
    isError,
    data: registrationData,
  } = useQuery<RegistrationData[], Error>(
    ["registrationData"],
    fetchRegistrationData
  );
  const refreshRegistrationData = () => {
    mutation.mutate();
  };

  useEffect(() => {
    refreshRegistrationData();
  }, []);

  return {
    foodAlergiesPartStats,
    foodPreferencesStats,
    registrationData,
    isLoading,
    isError,
    refreshRegistrationData,
  };
}
