import express, { Request, Response } from "express";
import {
  createRegistration,
  getRegistrations,
  updateTeam,
  updateTeamsOrder,
} from "../services/registrationUsers";
import { databaseConection } from "../config/database";

const router = express.Router();

router.post("/registration", async (req: Request, res: Response) => {
  const registrationData = req.body;

  try {
    await createRegistration(registrationData);
    res.json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/registration", async (req: Request, res: Response) => {
  try {
    const registrations = await getRegistrations();
    res.json(registrations);
  } catch (error) {
    console.error("Error getting registrations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/registration", async (req: Request, res: Response) => {
  const { teamId } = req.body;

  const sql = "DELETE FROM `registration` WHERE id = ?";
  const values = [teamId];

  try {
    await databaseConection(sql, values);
    console.log(`Team with ID ${teamId} deleted successfully`);
    res.status(200).send("Team deleted successfully");
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/registration", async (req: Request, res: Response) => {
  try {
    const { allTeamsInState } = req.body;

    // Ensure that the 'allTeamsInState' data is valid
    if (!Array.isArray(allTeamsInState)) {
      return res.status(400).json({ error: "Invalid data format" });
    }

    await updateTeamsOrder(allTeamsInState);

    res.json({ message: "Team positions updated successfully" });
  } catch (error) {
    console.error("Error during team positions update:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/registration/:id", async (req: Request, res: Response) => {
  let teamId;

  try {
    teamId = req.params.id;
    const updatedTeam = req.body;
    await updateTeam(parseInt(teamId), updatedTeam);

    res.json({
      message: `Team with ID ${teamId} updated successfully`,
      data: updatedTeam,
    });
  } catch (error) {
    console.error(`Error during team update for ID ${teamId}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
