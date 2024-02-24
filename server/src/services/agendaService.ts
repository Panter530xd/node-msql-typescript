import { databaseConection } from "../config/database";

interface AgendaData {
  eventDurationFrom: string;
  eventDurationTo: string;
  eventOpeningFrom: string;
  eventOpeningTo: string;
  findYourSpotFrom: string;
  findYourSpotTo: string;
  firstRoundSessionsFrom: string;
  firstRoundSessionsTo: string;
  secondRoundSessionsFrom: string;
  secondRoundSessionsTo: string;
  registrationFrom: string;
  registrationTo: string;
  presentationsFrom: string;
  presentationsTo: string;
}

export async function createAgenda(data: AgendaData): Promise<void> {
  const {
    eventDurationFrom,
    eventDurationTo,
    eventOpeningFrom,
    eventOpeningTo,
    findYourSpotFrom,
    findYourSpotTo,
    firstRoundSessionsFrom,
    firstRoundSessionsTo,
    secondRoundSessionsFrom,
    secondRoundSessionsTo,
    registrationFrom,
    registrationTo,
    presentationsFrom,
    presentationsTo,
  } = data;

  const sql = `
    INSERT INTO agenda (
      eventDurationFrom,
      eventDurationTo,
      eventOpeningFrom,
      eventOpeningTo,
      findYourSpotFrom,
      findYourSpotTo,
      firstRoundSessionsFrom,
      firstRoundSessionsTo,
      secondRoundSessionsFrom,
      secondRoundSessionsTo,
      registrationFrom,
      registrationTo,
      presentationsFrom,
      presentationsTo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    eventDurationFrom,
    eventDurationTo,
    eventOpeningFrom,
    eventOpeningTo,
    findYourSpotFrom,
    findYourSpotTo,
    firstRoundSessionsFrom,
    firstRoundSessionsTo,
    secondRoundSessionsFrom,
    secondRoundSessionsTo,
    registrationFrom,
    registrationTo,
    presentationsFrom,
    presentationsTo,
  ];

  try {
    await databaseConection(sql, values);
    console.log("Agenda item created successfully");
  } catch (error) {
    console.error("Error creating agenda item:", error);
    throw error;
  }
}
