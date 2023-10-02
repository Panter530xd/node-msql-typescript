import { databaseConection } from "../config/database";

export async function foodGet() {
  const sql = "SELECT * FROM food_allergies";
  try {
    const result = await databaseConection(sql);
    return result[0];
  } catch (error) {
    console.error("Error fetching food_allergies:", error);
    throw error;
  }
}
