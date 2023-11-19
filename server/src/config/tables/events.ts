import { databaseConection } from "../database";

export async function createEventsTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS events (
      id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
      name_of_event VARCHAR(256) NOT NULL,
      location VARCHAR(256) NOT NULL,
      type_of_event VARCHAR(256) NOT NULL,
      submission_deadline VARCHAR(256) NOT NULL,
      start_date VARCHAR(256) NOT NULL,
      end_date VARCHAR(256) NOT NULL,
      academies_part VARCHAR(256) NOT NULL,
      event_info VARCHAR(256) NOT NULL,
      client_info VARCHAR(256) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
    )
  `;

  try {
    await databaseConection(sql);
    console.log("Events table created successfully");
  } catch (error) {
    console.error("Error creating events table:", error);
    throw error;
  }
}
