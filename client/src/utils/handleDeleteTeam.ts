import axios from "axios";

import { toast } from "react-hot-toast";

interface Team {
  id: number;
  first_name: string;
  last_name: string;
  academy: string;
}

export const deleteTeam = async (
  teamId: number,
  teams: Team[][],
  setTeams: React.Dispatch<React.SetStateAction<Team[][]>>
) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/registration`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: { teamId },
      }
    );

    if (response.status === 200) {
      const updatedTeams = teams.map((table) =>
        table.filter((team) => team.id !== teamId)
      );
      setTeams(updatedTeams);
      localStorage.setItem("teams", JSON.stringify(updatedTeams));
      toast.success(`Deleting team with ID: ${teamId}`);
    } else {
      toast.error("Failed to delete team");
    }
  } catch (error) {
    console.error(error);
  }
};
