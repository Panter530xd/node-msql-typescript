import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from "chart.js";
import useRegistrationData from "../../utils/useRegistrationData";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = () => {
  const { registrationData, isLoading, isError } = useRegistrationData();

  useEffect(() => {
    if (!isLoading && !isError) {
      renderChart();
    }
  }, [isLoading, isError, registrationData]);

  const renderChart = () => {
    if (!registrationData) {
      return null;
    }

    const groupedData: { [key: string]: number } = {};

    registrationData.map((registration) => {
      const academy = registration.academy;
      const group = registration.group;

      const key = `${academy}-${group}`;
      groupedData[key] = (groupedData[key] || 0) + 1;
    });

    const labels = Object.keys(groupedData);
    const data = Object.values(groupedData);

    const backgroundColors = data.map((_, index) => {
      return index % 2 === 0
        ? "rgba(253, 150, 11, 1)"
        : "rgba(255, 204, 135, 1)";
    });

    const chartConfig = {
      type: "bar",
      labels: labels,
      datasets: [
        {
          label: "Group and Academy Counts",
          data: data,
          backgroundColor: backgroundColors,
        },
      ],
    };

    const options = {
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
        },
      },
    };

    return <Bar data={chartConfig} options={options} />;
  };

  if (isLoading) {
    return <p>Loading chart...</p>;
  }

  if (isError) {
    return <p>Error occurred while fetching data.</p>;
  }

  return (
    <div>
      <h2 className=" font-exoFont font-semibold">
        Division by groups and academies
      </h2>
      {registrationData && registrationData.length > 0 ? (
        renderChart()
      ) : (
        <p>No registration data available.</p>
      )}
    </div>
  );
};

export default ChartComponent;
