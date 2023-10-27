import { databaseConection } from "../../database";

export async function createGroupsTable() {
  const sql = `
      CREATE TABLE IF NOT EXISTS \`groups\` (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(256) NOT NULL,
        academyId INT,
        FOREIGN KEY (academyId) REFERENCES academies(id)
      )
    `;

  try {
    await databaseConection(sql);
    console.log("Groups table created successfully");
  } catch (error) {
    console.error("Error creating groups table:", error);
    throw error;
  }
}
