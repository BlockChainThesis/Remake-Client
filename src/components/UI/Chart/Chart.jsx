import { Line } from 'react-chartjs-2';
import { forwardRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { sensorStyleKit } from '../../Interface/Sensors/Sensor';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
ChartJS.defaults.borderColor = '#9DC08B';
ChartJS.defaults.color = '#000000';
ChartJS.defaults.font.size = '18';
ChartJS.defaults.font.family = 'Monaco, "Lucida Console", monospace';
ChartJS.defaults.font.weight = '350';
ChartJS.defaults.layout.padding.top = '16';
ChartJS.defaults.layout.padding.right = '16';

// eslint-disable-next-line react/display-name
const CustomChart = forwardRef(({ options, data }, ref) => {
  return <Line ref={ref} options={options} data={data} />;
});

const Chart = ({ stationType, data }) => {
  if (!data || !stationType) return;

  const chartData = {
    labels: data.map((item) => new Date(item.timestamp).toLocaleString()),
    datasets: [
      {
        label: 'Sensor Data',
        data: data.map((item) => item.value),
        fill: true,
        backgroundColor: sensorStyleKit(stationType, 'chart-background'),
        borderColor: sensorStyleKit(stationType, 'chart-border'),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: `VALUE (unit)`,
          font: {
            size: 12,
            weight: 700,
          },
          color: '#EDF1D6',
        },
        ticks: {
          display: false,
          font: {
            size: 12,
          },
        },
      },
      x: {
        time: {
          unit: 'second',
        },
        title: {
          display: true,
          text: 'TIMESTAMP',
          font: {
            size: 12,
            weight: 700,
          },
          color: '#EDF1D6',
        },
        ticks: {
          display: false,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <>
      <p className={`font-bold text-lg uppercase ${sensorStyleKit(stationType, 'text', 0)}`}>
        {stationType} sensor history
      </p>
      <CustomChart data={chartData} options={chartOptions} />
    </>
  );
};

export default Chart;
