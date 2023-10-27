import { databaseConection } from "../config/database";

interface RegistrationData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  academy: string;
  group_name: string;
  number_months: string;
  participation: string;
  food_allergies?: string;
  food_preferences?: string;
  accept_terms: boolean;
}

export async function createRegistration(
  data: RegistrationData
): Promise<void> {
  const {
    first_name,
    last_name,
    email,
    phone,
    academy,
    group_name,
    number_months,
    participation,
    food_allergies,
    food_preferences,
    accept_terms,
  } = data;

  const sql = `
    INSERT INTO registration (
      first_name, last_name, email, phone, academy, group_name,
      number_months, participation, food_allergies, food_preferences, accept_terms
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    first_name,
    last_name,
    email,
    phone,
    academy,
    group_name,
    number_months,
    participation,
    food_allergies,
    food_preferences,
    accept_terms,
  ];

  try {
    await databaseConection(sql, values);
    console.log("Registration data inserted successfully");
  } catch (error) {
    console.error("Error inserting registration data:", error);
    throw error;
  }
}
