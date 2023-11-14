// import { useEffect, useState } from "react";

// import { ChartData } from "chart.js";

// import EventsChart from "../../componets/charts/EventsChart";
// import EventTypeChart from "../../componets/charts/EventTypeChart";
// import GroupsChart from "../../componets/charts/GroupsChart";
// import useRegistrationData from "../../utils/useRegistrationData";
// import FoodChartPreferences from "../../componets/charts/FoodChartPreferences";
// import FoodChartAlergies from "../../componets/charts/FoodChartAlergies";
// import LoadingSkeleton from "../../componets/charts/Loading/LoadingSkeleton";

// import toast from "react-hot-toast";

// const DashboardCreate = () => {
//   const { academiesPartStats, eventTypeStats, isLoading, isError } =
//     useEventsData();

//   const { foodAlergiesPartStats, foodPreferencesStats, registrationData } =
//     useRegistrationData();

//   const [numStudentsApplied, setNumStudentsApplied] = useState(0);

//   useEffect(() => {
//     if (registrationData) {
//       setNumStudentsApplied(registrationData.length);
//     }
//   }, [registrationData]);

//   if (isLoading) {
//     return <LoadingSkeleton size={6} />;
//   }

//   if (isError) {
//     <div>{toast.error("Error fatching data")}</div>;
//   }

//   const academiesPartChartData: ChartData<"pie", number[], string> = {
//     labels: academiesPartStats.map((data, index) => data.name),
//     datasets: [
//       {
//         data: academiesPartStats.map((data) => data.count),
//         backgroundColor: academiesPartStats.map((_, index) => {
//           const colors = [
//             "rgba(202, 73, 140, 1)",
//             "rgba(185, 119, 172, 1)",
//             "rgba(207, 155, 189, 1)",
//             "rgba(230, 191, 206, 1)",
//             "rgba(253, 227, 223, 1)",
//           ];
//           return colors[index % colors.length];
//         }),
//       },
//     ],
//   };

//   const eventTypeChartData: ChartData<"pie", number[], string> = {
//     labels: eventTypeStats.map((data) => `${data.name} presence`),
//     datasets: [
//       {
//         data: eventTypeStats.map((data) => data.count),
//         backgroundColor: eventTypeStats.map((_, index) =>
//           index % 2 === 0 ? "rgba(103, 197, 135, 1)" : "rgba(234, 246, 237, 1)"
//         ),
//       },
//     ],
//   };

//   const foodAlergieChartData: ChartData<"pie", number[], string> = {
//     labels: foodAlergiesPartStats.map((data) => data.name),
//     datasets: [
//       {
//         data: foodAlergiesPartStats.map((data) => data.count),
//         backgroundColor: foodAlergiesPartStats.map((_, index) => {
//           const colors = [
//             "rgba(202, 73, 140, 1)",
//             "rgba(185, 119, 172, 1)",
//             "rgba(207, 155, 189, 1)",
//             "rgba(230, 191, 206, 1)",
//             "rgba(253, 227, 223, 1)",
//           ];
//           return colors[index % colors.length];
//         }),
//       },
//     ],
//   };

//   const foodPreferencesChartData: ChartData<"pie", number[], string> = {
//     labels: foodPreferencesStats.map((data) => data.name),
//     datasets: [
//       {
//         data: foodPreferencesStats.map((data) => data.count),
//         backgroundColor: foodPreferencesStats.map((_, index) =>
//           index % 2 === 0 ? "rgba(103, 197, 135, 1)" : "rgba(234, 246, 237, 1)"
//         ),
//       },
//     ],
//   };

//   return (
//     <>
//       <main className="lg:w-7/12 w-11/12 mx-auto max-w-screen-xl font-exoFont pb-10">
//         <div className="  mx-auto flex pt-5 gap-10 items-center justify-between">
//           {numStudentsApplied ? (
//             <div className=" grid lg:grid-cols-2 grid-cols-1 lg:gap-10 gap-0">
//               <h4>Number of students applied</h4>
//               <span>{numStudentsApplied}</span>
//             </div>
//           ) : (
//             <div>No data available</div>
//           )}
//           <div>
//             <link
//               className=" bg-greenis text-black py-2 px-[52px] rounded-lg font-semibold lg:text-lg text:base whitespace-nowrap"
//               href={"/dashboard/teams"}
//             >
//               Generate teams
//             </link>
//           </div>
//         </div>
//         <section className="lg:flex lg:flex-row flex-col space-y-5 lg:space-y-0 justify-center lg:py-10 py-5 items-center gap-10">
//           {!isError && academiesPartChartData ? (
//             <div className="border border-gray-300 rounded-lg py-3 px-5 flex items-center justify-center">
//               <div className="flex-col">
//                 <h2 className="font-exoFont font-semibold">
//                   Division by academy
//                 </h2>
//                 <div className="lg:w-[400px] lg:h-[400px]">
//                   <EventsChart chartData={academiesPartChartData} />
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div>No data available</div>
//           )}
//           {!isError && eventTypeChartData ? (
//             <div className="border border-gray-300 rounded-lg py-3 px-5 flex items-center justify-center">
//               <div className="flex-col">
//                 <h2 className=" font-exoFont font-semibold">
//                   Division by online / live
//                 </h2>
//                 <div className="lg:w-[400px] lg:h-[400px]">
//                   <EventTypeChart chartData={eventTypeChartData} />
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div>No data available</div>
//           )}
//         </section>

//         <div className="border border-gray-300 rounded-lg py-10 px-10">
//           <GroupsChart />
//         </div>

//         <div className="lg:flex lg:flex-row flex-col space-y-5 lg:space-y-0 justify-center lg:py-10 py-5 items-center gap-10">
//           {!isError && foodAlergieChartData ? (
//             <div className="border border-gray-300 rounded-lg py-3 px-5 flex items-center justify-center">
//               <div className="flex-col">
//                 <h2 className=" font-exoFont font-semibold">
//                   Division by food alergies
//                 </h2>
//                 <div className="lg:w-[400px] lg:h-[400px]">
//                   <FoodChartAlergies chartData={foodAlergieChartData} />
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div>No data available</div>
//           )}
//           {!isError && foodPreferencesChartData ? (
//             <div className="border border-gray-300 rounded-lg py-3 px-5 flex items-center justify-center">
//               <div className="flex-col">
//                 <h2 className=" font-exoFont font-semibold">
//                   Division by food preferences
//                 </h2>
//                 <div className="lg:w-[400px] lg:h-[400px]">
//                   <FoodChartPreferences chartData={foodPreferencesChartData} />
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div>No data available</div>
//           )}
//         </div>
//       </main>
//     </>
//   );
// };

// export default DashboardCreate;
// function useEventsData(): {
//   academiesPartStats: any;
//   eventTypeStats: any;
//   isLoading: any;
//   isError: any;
// } {
//   throw new Error("Function not implemented.");
// }
