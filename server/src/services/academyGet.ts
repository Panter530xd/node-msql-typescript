import { databaseConection } from "../config/database";

export async function getAcademy() {
  const sql = "SELECT * FROM  academies";
  try {
    const result = await databaseConection(sql);
    return result[0];
  } catch (error) {
    console.error("Error fetching academies:", error);
    throw error;
  }
}
