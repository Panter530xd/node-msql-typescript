import { databaseConection } from "../database";

export async function createTeamsTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS teams (
      id INT PRIMARY KEY AUTO_INCREMENT,
      register_id INT NOT NULL,
      first_name VARCHAR(256) NOT NULL,
      last_name VARCHAR(256) NOT NULL,
      academy VARCHAR(256) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
      FOREIGN KEY (register_id) REFERENCES registration(id)
    )
  `;

  await databaseConection(sql);

  console.log("Teams table created successfully");
}
