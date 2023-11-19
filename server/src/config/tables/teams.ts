import { databaseConection } from "../database";

export interface TeamData {
  user_id: number;
  register_id: number;
  first_name: string;
  last_name: string;
  academy: string;
}

export async function createTeamsTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS teams (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      register_id INT NOT NULL,
      first_name VARCHAR(256) NOT NULL,
      last_name VARCHAR(256) NOT NULL,
      academy VARCHAR(256) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
      FOREIGN KEY (register_id) REFERENCES registration(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;

  try {
    await databaseConection(sql);
    console.log("Teams table created successfully");
  } catch (error) {
    console.error("Error creating teams table:", error);
    throw error;
  }
}

export async function insertTeamData(data: TeamData) {
  // Check if the data already exists
  const checkDuplicateSql = `
    SELECT id
    FROM teams
    WHERE user_id = ? AND register_id = ?
  `;

  const [existingData] = await databaseConection(checkDuplicateSql, [
    data.user_id,
    data.register_id,
  ]);

  // If the data already exists, don't insert it again
  if (Array.isArray(existingData) && existingData.length > 0) {
    console.log("Data already exists in teams table, skipping insertion");
    return;
  }

  // If the data doesn't exist, proceed with the insertion
  const insertSql = `
    INSERT INTO teams (user_id, register_id, first_name, last_name, academy)
    VALUES (?, ?, ?, ?, ?)
  `;

  try {
    await databaseConection(insertSql, [
      data.user_id,
      data.register_id,
      data.first_name,
      data.last_name,
      data.academy,
    ]);
    console.log("Data inserted into teams table successfully");
  } catch (error) {
    console.error("Error inserting data into teams table:", error);
    throw error;
  }
}
