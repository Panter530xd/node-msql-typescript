import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { createAcademiesTable } from "../config/tables/academies/academies";
import { seedAcademiesData } from "../config/tables/academies/seed-academies-data";
import { createGroupsTable } from "./tables/groups/groups";
import { seedGroupsData } from "./tables/groups/seed-groups-data";
import { createFoodAllergyTable } from "./tables/food-allergies/food_allergies";
import { seedFoodAllergiesData } from "./tables/food-allergies/seed-food-data";
import { createRegistrationTable } from "./tables/registration";
import { createTeamsTable, insertTeamData } from "./tables/teams";
import { createUsersTable } from "./tables/users";
import { TeamData } from "../../src/config/tables/teams";
import refreshToken from "./tables/refresh_token";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export async function databaseConection(sql: string, values?: any) {
  const connection = await pool.getConnection();
  try {
    const result = await connection.query(sql, values);
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  } finally {
    connection.release();
  }
}

export async function initializeDatabase() {
  try {
    await createTeamsTable();
    await refreshToken();
    const selectSql = `
      SELECT r.id as register_id, u.id as user_id, r.first_name, r.last_name, r.academy
      FROM registration r
      JOIN users u ON r.email = u.email
    `;
    console.log("SQL Query:", selectSql);

    const [rawTeamData] = await databaseConection(selectSql);

    const teamData: TeamData[] = Array.isArray(rawTeamData)
      ? rawTeamData.map((row: any) => ({
          user_id: row.user_id,
          register_id: row.register_id,
          first_name: row.first_name,
          last_name: row.last_name,
          academy: row.academy,
        }))
      : [];

    for (const data of teamData) {
      await insertTeamData(data);
    }

    console.log("Database initialized successfully with data");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

initializeDatabase();

// await seedAcademiesData();

// await createGroupsTable();
// await seedGroupsData();

// await createFoodAllergyTable();
// await seedFoodAllergiesData();
// await createRegistrationTable();
// await createUsersTable();
//
// await insertDataIntoTeams(1, 1);
