import { databaseConection } from "../../database";

export async function createAcademiesTable() {
  const sql = `CREATE TABLE IF NOT EXISTS academies(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(256) NOT NULL
)`;
  try {
    await databaseConection(sql);
    console.log("Academies table created successfully");
  } catch (error) {
    console.error("Error creating academies table:", error);
    throw error;
  }
}
