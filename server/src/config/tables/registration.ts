import { databaseConection } from "../database";

export async function createRegistrationTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS registration (
      id INT PRIMARY KEY AUTO_INCREMENT,
      first_name VARCHAR(256) NOT NULL,
      last_name VARCHAR(256) NOT NULL,
      email VARCHAR(256) NOT NULL,
      phone VARCHAR(256) NOT NULL,
      academy VARCHAR(256) NOT NULL,
      group_name VARCHAR(256) NOT NULL,
      number_months VARCHAR(256) NOT NULL,
      participation VARCHAR(256) NOT NULL,
      food_allergies VARCHAR(256),
      food_preferences VARCHAR(256),
      accept_terms BOOLEAN NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
    )
  `;

  await databaseConection(sql);

  console.log("Registration table created successfully");
}
