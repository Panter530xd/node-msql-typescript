import { FieldPacket } from "mysql2/promise";
import { databaseConection } from "../config/database";

interface RegistrationData {
  id: number;
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
  position: number;
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

export async function getRegistrations() {
  const sql = "SELECT * FROM `registration`";
  try {
    const result = await databaseConection(sql);
    return result[0];
  } catch (error) {
    console.error("Error fetching registration:", error);
    throw error;
  }
}

export async function updateTeam(
  teamId: number,
  updatedTeam: RegistrationData
): Promise<void> {
  const { id, ...rest } = updatedTeam;

  const sql = `
    UPDATE registration
    SET
      first_name = ?,
      last_name = ?,
      email = ?,
      phone = ?,
      academy = ?,
      group_name = ?,
      number_months = ?,
      participation = ?,
      food_allergies = ?,
      food_preferences = ?,
      accept_terms = ?
    WHERE id = ?;
  `;

  const values = [
    rest.first_name,
    rest.last_name,
    rest.email,
    rest.phone,
    rest.academy,
    rest.group_name,
    rest.number_months,
    rest.participation,
    rest.food_allergies,
    rest.food_preferences,
    rest.accept_terms,
    id,
    teamId,
  ];

  try {
    await databaseConection(sql, values);
    console.log(`Team with ID ${teamId} updated successfully`);
  } catch (error) {
    console.error(`Error updating team with ID ${teamId}:`, error);
    throw error;
  }
}

export async function updateTeamsOrder(
  teams: RegistrationData[]
): Promise<void> {
  try {
    // Check if 'teams' is an array
    if (!Array.isArray(teams)) {
      console.error("Invalid data: 'teams' is not an array");
      return;
    }

    const updatePromises: Promise<[any, FieldPacket[]]>[] = [];

    // Loop through the teams and update their positions
    for (let index = 0; index < teams.length; index++) {
      const team = teams[index];

      // Check if 'team' has the expected properties
      if (!team || typeof team !== "object" || !("id" in team)) {
        console.error("Invalid team data:", team);
        continue; // Skip to the next iteration if data is invalid
      }

      const { id, position } = team;

      // Use 'index + 1' as the new position
      const sql = "UPDATE registration SET position = ? WHERE id = ?";
      const values = [index + 1, id];

      const updatePromise = databaseConection(sql, values);
      updatePromises.push(updatePromise);
    }

    // Wait for all update promises to resolve
    await Promise.all(updatePromises);
    console.log("Team positions updated successfully");
  } catch (error) {
    console.error("Error updating team positions:", error);
    throw error;
  }
}
