import { databaseConection } from "../config/database";

interface EventData {
  name_of_event: string;
  location: string;
  type_of_event: string;
  submission_deadline: string;
  start_date: string;
  end_date: string;
  academies_part: string;
  event_info: string;
  client_info: string;
}

export async function createEvent(data: EventData): Promise<void> {
  const {
    name_of_event,
    location,
    type_of_event,
    submission_deadline,
    start_date,
    end_date,
    academies_part,
    event_info,
    client_info,
  } = data;

  const sql = `
    INSERT INTO events (
      name_of_event, location, type_of_event, submission_deadline,
      start_date, end_date, academies_part, event_info, client_info
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    name_of_event,
    location,
    type_of_event,
    submission_deadline,
    start_date,
    end_date,
    academies_part,
    event_info,
    client_info,
  ];

  try {
    await databaseConection(sql, values);
    console.log("Event data inserted successfully");
  } catch (error) {
    console.error("Error inserting event data:", error);
    throw error;
  }
}

export async function eventsGet() {
  const sql = "SELECT * FROM events";
  try {
    const result = await databaseConection(sql);
    return result[0];
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}
