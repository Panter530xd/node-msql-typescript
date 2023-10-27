import { databaseConection } from "../../../config/database";

export async function createFoodAllergyTable() {
  const sql = `CREATE TABLE IF NOT EXISTS food_allergies(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(256) NOT NULL
  )`;

  try {
    await databaseConection(sql);
    console.log("Food_allergies table created successfully");
  } catch (error) {
    console.error("Error creating food_allergies table:", error);
    throw error;
  }
}
