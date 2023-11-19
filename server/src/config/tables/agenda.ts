import { databaseConection } from "../database";

export async function createAgendaTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS agenda (
      id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
      eventDurationFrom VARCHAR(256) NOT NULL,
      eventDurationTo VARCHAR(256) NOT NULL,
      eventOpeningFrom VARCHAR(256) NOT NULL,
      eventOpeningTo VARCHAR(256) NOT NULL,
      findYourSpotFrom VARCHAR(256) NOT NULL,
      findYourSpotTo VARCHAR(256) NOT NULL,
      firstRoundSessionsFrom VARCHAR(256) NOT NULL,
      firstRoundSessionsTo VARCHAR(256) NOT NULL,
      secondRoundSessionsFrom VARCHAR(256) NOT NULL,
      secondRoundSessionsTo VARCHAR(256) NOT NULL,
      registrationFrom VARCHAR(256) NOT NULL,
      registrationTo VARCHAR(256) NOT NULL,
      presentationsFrom VARCHAR(256) NOT NULL,
      presentationsTo VARCHAR(256) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
    )
  `;

  try {
    await databaseConection(sql);
    console.log("Agenda table created successfully");
  } catch (error) {
    console.error("Error creating agenda table:", error);
    throw error;
  }
}
