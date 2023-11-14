import React, { useEffect, useRef, useState } from "react";
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";
import { ChartData } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(PieController, ArcElement, Tooltip, Legend);

interface EventTypeChartProps {
  chartData: ChartData<"pie", number[], string>;
}

const EventTypeChart: React.FC<EventTypeChartProps> = ({ chartData }) => {
  const chartRef = useRef<Chart<"pie", number[], string> | null>(null);
  const [chartInstance, setChartInstance] = useState<Chart<
    "pie",
    number[],
    string
  > | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const newChartInstance = chartRef.current;

      setChartInstance(newChartInstance);
    }
  }, [chartData]);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.data = chartData;
      chartInstance.update();
    }
  }, [chartData, chartInstance]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "left" as const,

        labels: {
          usePointStyle: true,
          pointStyle: "rect",
          padding: 10,
          textAlign: "left" as const,
          color: "black",
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return <Pie ref={chartRef} data={chartData} options={options} />;
};
export default EventTypeChart;
