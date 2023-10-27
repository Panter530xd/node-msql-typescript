import { databaseConection } from "../../config/database";

export default async function refreshToken() {
  const sql = `CREATE TABLE IF NOT EXISTS refresh_tokens(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UNIQUE (token),
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`;
  try {
    await databaseConection(sql);
    console.log("refresh_tokens table created successfully");
  } catch (error) {
    console.error("Error creating refresh_tokens table:", error);
    throw error;
  }
}
