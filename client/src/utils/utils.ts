interface Team {
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
}

export function generateRandomTeams(registrationData: Team[]): Team[][] {
  const shuffledData = shuffleArray(registrationData);
  const numTables = Math.ceil(shuffledData.length / 10);
  const generatedTeams: Team[][] = [];

  for (let i = 0; i < numTables; i++) {
    const startIndex = i * 10;
    const endIndex = startIndex + 10;
    const teamsForTable = shuffledData.slice(startIndex, endIndex);
    generatedTeams.push(teamsForTable);
  }

  return generatedTeams;
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}
