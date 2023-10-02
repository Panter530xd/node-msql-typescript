import { databaseConection } from "../../../config/database";

export async function createFoodAllergyTable() {
  const sql = `CREATE TABLE IF NOT EXISTS food_allergies(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(256) NOT NULL
  )`;

  await databaseConection(sql);
  console.log("food_allergies table created successfully");
}
