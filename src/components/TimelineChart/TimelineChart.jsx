import { useEffect, useState, useContext } from "react";
import { Scatter } from "react-chartjs-2";
import "chart.js/auto";
import { UserContext } from "../contexts/UserContext";
import * as boardService from "../services/boardService";

const TimelineChart = ({ boardId }) => {
  const { user } = useContext(UserContext);
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const data = await boardService.getTimeline(boardId);
        setTimelineData(data);
      } catch (error) {
        console.error("Error fetching timeline:", error);
      }
    };

    if (user) fetchTimeline();
  }, [user, boardId]);

  // Prepare Chart.js data
  const chartData = {
    datasets: [
      {
        label: "Card Movements",
        data: timelineData.map((event) => ({
          x: new Date(event.timestamp), // X-Axis: Timestamp
          y: event.toList, // Y-Axis: Destination List
          cardName: event.cardName,
          fromList: event.fromList,
        })),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  // Custom tooltip to display details on hover
  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day", // Adjust unit as needed
          tooltipFormat: "MMM d, yyyy HH:mm",
        },
        title: {
          display: true,
          text: "Time of Movement",
        },
      },
      y: {
        title: {
          display: true,
          text: "Destination List",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            let dataPoint = tooltipItem.raw;
            return `Card: ${dataPoint.cardName} \nMoved from: ${dataPoint.fromList} → ${dataPoint.y}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Timeline of Card Movements</h2>
      <Scatter data={chartData} options={options} />
    </div>
  );
};

export default TimelineChart;
