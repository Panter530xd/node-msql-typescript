import { databaseConection } from "../../database";

const foodAllergiesData = [
  { name: "Gluten" },
  { name: "Nuts" },
  { name: "Milk" },
  { name: "Eggs" },
  { name: "Soy" },
  { name: "Fish" },
  { name: "None" },
];

export async function seedFoodAllergiesData() {
  const values = foodAllergiesData.map(({ name }) => [name]);
  const sql = `
      INSERT INTO food_allergies (name) VALUES ?
      ON DUPLICATE KEY UPDATE name = VALUES(name)
    `;

  await databaseConection(sql, [values]);

  console.log("Food allergies data seeded successfully");
}
