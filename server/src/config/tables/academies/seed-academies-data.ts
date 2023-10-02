import { databaseConection } from "../../database";

const academyData = [
  { id: 1, name: "UX/UI Дизајн" },
  { id: 2, name: "Дигитален Маркетинг" },
  { id: 3, name: "Графички Дизајн" },
  { id: 4, name: "Project and Product Management" },
  { id: 5, name: "Data Science" },
  { id: 6, name: "Човечки Ресурси" },
  { id: 7, name: "Full-Stack програмирање" },
  { id: 8, name: "Front-end програмирање" },
  { id: 9, name: "Software testing" },
  { id: 10, name: "Leadership and Management" },
];

export async function seedAcademiesData() {
  const values = academyData.map(({ id, name }) => [id, name]);
  const sql = `
    INSERT INTO academies (id, name) VALUES
    ? ON DUPLICATE KEY UPDATE name = VALUES(name)
  `;

  await databaseConection(sql, [values]);
}
