import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { createAcademiesTable } from "../config/tables/academies/academies";
import { seedAcademiesData } from "../config/tables/academies/seed-academies-data";
import { createGroupsTable } from "./tables/groups/groups";
import { seedGroupsData } from "./tables/groups/seed-groups-data";
import { createFoodAllergyTable } from "./tables/food-allergies/food_allergies";
import { seedFoodAllergiesData } from "./tables/food-allergies/seed-food-data";
import { createRegistrationTable } from "./tables/registration";
import { createTeamsTable } from "./tables/teams";
import { createUsersTable } from "./tables/users";
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

// export async function initializeDatabase() {
//   // await createAcademiesTable();
//   // await seedAcademiesData();

//   // await createGroupsTable();
//   // await seedGroupsData();

//   // await createFoodAllergyTable();
//   // await seedFoodAllergiesData();
//   // await createRegistrationTable();
//   await createTeamsTable();
//   // await createUsersTable();
//   console.log("Database initialized successfully");
// }
