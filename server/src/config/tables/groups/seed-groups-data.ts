import { databaseConection } from "../../database";

const groupData = [
  // Groups for UX/UI Дизајн (Academy ID: 1)
  { name: "Group 1", academyId: 1 },
  { name: "Group 2", academyId: 1 },
  { name: "Group 3", academyId: 1 },

  // Groups for Дигитален Маркетинг (Academy ID: 2)
  { name: "Group 4", academyId: 2 },
  { name: "Group 5", academyId: 2 },
  { name: "Group 6", academyId: 2 },

  // Groups for Графички Дизајн (Academy ID: 3)
  { name: "Group 7", academyId: 3 },
  { name: "Group 8", academyId: 3 },
  { name: "Group 9", academyId: 3 },

  // Groups for Project and Product Management (Academy ID: 4)
  { name: "Group 10", academyId: 4 },
  { name: "Group 11", academyId: 4 },
  { name: "Group 12", academyId: 4 },

  // Groups for Data Science (Academy ID: 5)
  { name: "Group 13", academyId: 5 },
  { name: "Group 14", academyId: 5 },
  { name: "Group 15", academyId: 5 },

  // Groups for Човечки Ресурси (Academy ID: 6)
  { name: "Group 16", academyId: 6 },
  { name: "Group 17", academyId: 6 },
  { name: "Group 18", academyId: 6 },

  // Groups for Full-Stack програмирање (Academy ID: 7)
  { name: "Group 19", academyId: 7 },
  { name: "Group 20", academyId: 7 },
  { name: "Group 21", academyId: 7 },

  // Groups for Front-end програмирање (Academy ID: 8)
  { name: "Group 22", academyId: 8 },
  { name: "Group 23", academyId: 8 },
  { name: "Group 24", academyId: 8 },

  // Groups for Software testing (Academy ID: 9)
  { name: "Group 25", academyId: 9 },
  { name: "Group 26", academyId: 9 },
  { name: "Group 27", academyId: 9 },

  // Groups for Leadership and Management (Academy ID: 10)
  { name: "Group 28", academyId: 10 },
  { name: "Group 29", academyId: 10 },
  { name: "Group 30", academyId: 10 },
];

export async function seedGroupsData() {
  const values = groupData.map(({ name, academyId }) => [name, academyId]);
  const sql = `
    INSERT INTO \`groups\` (name, academyId) VALUES ?
    ON DUPLICATE KEY UPDATE name = VALUES(name)
  `;

  await databaseConection(sql, [values]);

  console.log("Groups data seeded successfully");
}
