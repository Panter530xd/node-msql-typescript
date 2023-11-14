import { useState, useEffect } from "react";
import { DotsVertical } from "tabler-icons-react";

import useERegistrationData from "../../utils/useRegistrationData";

import { generateRandomTeams } from "../../utils/utils";
import { deleteTeam } from "../../utils/handleDeleteTeam";
import AlertDialog from "../../componets/ui/AlertDialog";
import { CancelButton } from "../../componets/ui/Button";
import axios from "axios";
import toast from "react-hot-toast";
import SkeletonTeams from "../../componets/skeleton/SkeletonTeams";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

interface Team {
  id: number;
  first_name: string;
  last_name: string;
  academy: string;
}

const DashboardCreate = () => {
  const { registrationData, isError, isLoading } = useERegistrationData();
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [teams, setTeams] = useState<Team[][]>([]);
  const [editedTeam, setEditedTeam] = useState<Team | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  useEffect(() => {
    const storedTeams = localStorage.getItem("teams");

    if (registrationData && registrationData.length > 0) {
      if (storedTeams) {
        setTeams(JSON.parse(storedTeams));
      } else {
        const generatedTeams = generateRandomTeams(registrationData);
        setTeams(generatedTeams);
      }
    }
  }, [registrationData]);

  // const handleDragEnd = async (result: DropResult) => {
  //   if (!result.destination) {
  //     return;
  //   }

  //   const { source, destination } = result;
  //   const sourceTableIndex = parseInt(source.droppableId.split("-")[1]);
  //   const destinationTableIndex = parseInt(
  //     destination.droppableId.split("-")[1]
  //   );
  //   const draggedTeam = teams[sourceTableIndex][source.index];

  //   if (
  //     source.droppableId === destination.droppableId &&
  //     source.index === destination.index
  //   ) {
  //     // If the source and destination are the same, no need to update positions
  //     return;
  //   }

  //   // Remove the dragged team from the source table
  //   const updatedSourceTable = Array.from(teams[sourceTableIndex]);
  //   updatedSourceTable.splice(source.index, 1);

  //   // Add the dragged team to the destination table
  //   const updatedDestinationTable = Array.from(teams[destinationTableIndex]);
  //   updatedDestinationTable.splice(destination.index, 0, draggedTeam);

  //   // Create a copy of the teams array to update state atomically
  //   const updatedTeams = [...teams];
  //   updatedTeams[sourceTableIndex] = updatedSourceTable;
  //   updatedTeams[destinationTableIndex] = updatedDestinationTable;

  //   // Extract required fields for each team
  //   const extractTeamFields = (team: Team) => {
  //     const { id, first_name, last_name, academy } = team;
  //     return { id, first_name, last_name, academy };
  //   };

  //   // Update the teams state with extracted fields
  //   const updatedTeamsExtracted = updatedTeams.map((table) =>
  //     table.map((team) => extractTeamFields(team))
  //   );
  //   console.log(updatedTeamsExtracted);

  //   try {
  //     const response = await axios.get(`${env.NEXT_PUBLIC_API_URL}/api/teams`);
  //     const responseData = response.data;

  //     const allTeamsInState = updatedTeamsExtracted.flat();
  //     const allTeamsFromAPI = responseData.allTeams;

  //     // Filter out duplicate teams by ID
  //     const uniqueTeamsInState = allTeamsInState.filter(
  //       (team, index, self) => index === self.findIndex((t) => t.id === team.id)
  //     );

  //     if (
  //       uniqueTeamsInState.length !== allTeamsFromAPI.length ||
  //       !allTeamsFromAPI.some((team: Team) =>
  //         uniqueTeamsInState.some((stateTeam) => stateTeam.id === team.id)
  //       )
  //     ) {
  //       // If the lengths are different or there are missing/new teams, make the POST request to create/update the teams
  //       const postResponse = await axios.post(
  //         `${env.NEXT_PUBLIC_API_URL}/api/teams`,
  //         { teams: uniqueTeamsInState },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       console.log("Teams created/updated successfully");
  //     } else {
  //       // If the lengths are the same and no missing/new teams, make the PUT request to update team positions
  //       const putResponse = await axios.put(
  //         `${env.NEXT_PUBLIC_API_URL}/api/teams`,
  //         { teams: uniqueTeamsInState },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       console.log("Teams positions updated successfully");
  //     }

  //     // Set the teams state after the update
  //     setTeams(updatedTeams);
  //     localStorage.setItem("teams", JSON.stringify(updatedTeams));
  //   } catch (error) {
  //     // Handle any errors that occur during the request
  //     console.error("Failed to update teams positions:", error);
  //   }
  // };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;
    const sourceTableIndex = parseInt(source.droppableId.split("-")[1]);
    const destinationTableIndex = parseInt(
      destination.droppableId.split("-")[1]
    );
    const draggedTeam = teams[sourceTableIndex][source.index];

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      // If the source and destination are the same, no need to update positions
      return;
    }

    // Remove the dragged team from the source table
    const updatedSourceTable = Array.from(teams[sourceTableIndex]);
    updatedSourceTable.splice(source.index, 1);

    // Add the dragged team to the destination table if it's not already present
    const updatedDestinationTable = Array.from(teams[destinationTableIndex]);
    if (!updatedDestinationTable.includes(draggedTeam)) {
      updatedDestinationTable.splice(destination.index, 0, draggedTeam);
    }

    // Update the teams state
    const updatedTeams = Array.from(teams);
    updatedTeams[sourceTableIndex] = updatedSourceTable;
    updatedTeams[destinationTableIndex] = updatedDestinationTable;

    const updatedTeamsExtracted = updatedTeams.map((table) =>
      table.map((team) => {
        const { id, ...rest } = team;
        return { id, ...rest };
      })
    );
    console.log(updatedTeamsExtracted);

    // Set the teams state immediately after the drag and drop
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));

    // Update the team positions in the database
    const allTeamsInState = updatedTeams.flat();
    console.log(allTeamsInState);

    try {
      const putResponse = await axios.put(
        `/api/registration`,
        { allTeamsInState },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (putResponse.status === 200) {
        console.log("Team positions updated successfully");
        console.log({ teams: allTeamsInState });
      } else {
        console.error("Failed to update team positions");
      }
    } catch (error) {
      console.error("Failed to update team positions:", error);
    }
  };

  const handleDeleteTeam = async (teamId: number) => {
    await deleteTeam(teamId, teams, setTeams);
  };

  const handleEditTeam = (teamId: number) => {
    const teamToEdit = teams.flat().find((team) => team.id === teamId);

    if (teamToEdit) {
      setEditedTeam(teamToEdit);
      setIsEditFormOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div>
        <SkeletonTeams size={20} />
      </div>
    );
  }

  if (isError) {
    return <div>{toast.error("Error fatching data")}</div>;
  }

  const handleEditFormSubmit = async () => {
    try {
      const response = await axios.put(
        `/api/registration/${editedTeam?.id}`,
        editedTeam,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(editedTeam);

      if (response.status === 200) {
        const updatedTeams = teams.map((table) =>
          table.map((team) => (team.id === editedTeam?.id ? editedTeam : team))
        );
        setTeams(updatedTeams);
        setIsEditFormOpen(false);
        setEditedTeam(null);
        toast.success(`Updating team with ID: ${editedTeam?.id}`);
      } else {
        toast.error("Failed to update team");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditFormCancel = () => {
    setIsEditFormOpen(false);
    setEditedTeam(null);
  };

  const togglePopUp = (teamId: number) => {
    setShowPopUp((prevState) => {
      if (prevState && selectedTeamId === teamId) {
        return false;
      } else {
        setSelectedTeamId(teamId);
        return true;
      }
    });
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="pb-10 grid md:grid-cols-2 grid-cols-1 gap-10 md:w-7/12 w-11/12 max-w-screen-xl mx-auto pt-10 ">
          {teams.map((teamTable, tableIndex) => (
            <Droppable
              droppableId={`table-${tableIndex}`}
              key={`table-${tableIndex}`}
            >
              {(provided) => (
                <table
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className=""
                >
                  <tbody>
                    <tr>
                      <th
                        colSpan={2}
                        className="text-lg font-medium text-left text-gray-900 py-3"
                      >
                        Team {tableIndex + 1}
                      </th>
                    </tr>
                    {teamTable.map((team, index) => (
                      <Draggable
                        draggableId={`team-${tableIndex}-${team.id}`}
                        index={index}
                        key={`team-${tableIndex}-${team.id}-${index}`}
                      >
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="py-3 px-5 bg-white rounded-md shadow-md flex items-center justify-between border mb-4 border-black"
                          >
                            <td className="flex items-center space-x-5">
                              <div>{team.first_name}</div>
                              <div>{team.last_name}</div>
                              <div>{team.academy}</div>
                            </td>
                            <td className="flex space-x-2">
                              <button onClick={() => togglePopUp(team.id)}>
                                <DotsVertical className="w-5 h-5 text-gray-500 hover:text-gray-900" />
                              </button>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                </table>
              )}
            </Droppable>
          ))}

          {selectedTeamId !== null && !isEditFormOpen && (
            <AlertDialog
              isOpen={showPopUp}
              setIsOpen={setShowPopUp}
              onDelete={() => handleDeleteTeam(selectedTeamId)}
              onEdit={() => handleEditTeam(selectedTeamId)}
            />
          )}

          {/* Edit Form */}
          {isEditFormOpen && editedTeam && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50">
              <div className="bg-white rounded-lg p-4 md:w-full max-w-md w-11/12 mx-auto">
                <h2 className="text-lg font-medium text-gray-900">Edit Team</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEditFormSubmit();
                  }}
                >
                  <div className="mt-4 space-y-4">
                    <div>
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-purple-500 focus:outline-none sm:text-sm"
                        value={editedTeam.first_name}
                        onChange={(e) =>
                          setEditedTeam({
                            ...editedTeam,
                            first_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-purple-500 focus:outline-none sm:text-sm"
                        value={editedTeam.last_name}
                        onChange={(e) =>
                          setEditedTeam({
                            ...editedTeam,
                            last_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="academy"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Academy
                      </label>
                      <input
                        type="text"
                        id="academy"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-purple-500 focus:outline-none sm:text-sm"
                        value={editedTeam.academy}
                        onChange={(e) =>
                          setEditedTeam({
                            ...editedTeam,
                            academy: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <CancelButton onClick={handleEditFormCancel}>
                      Cancel
                    </CancelButton>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </DragDropContext>
    </>
  );
};

export default DashboardCreate;
