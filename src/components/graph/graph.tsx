import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { UserHistory } from '../../models/user';

interface WeightGraphProps {
  data: UserHistory[];
}

type CustomXAxisType = 'datetime' | 'category' | 'numeric';

const WeightGraph: React.FC<WeightGraphProps > = ({ data }) => {
  // Extracting weight values and date labels from the data array
  const weights = data.map(item => item.weight);
  const dates = data.map(item => new Date(item.date).getTime());

  // Creating the chart options and series
  const chartOptions = {
    chart: {
      id: 'weight-chart',
    },
    xaxis: {
      type: 'datetime' as CustomXAxisType,
      categories: dates,
    },
  };

  const chartSeries = [
    {
      name: 'Weight',
      data: weights,
    },
  ];

  return (
    <div>
      <h2>Weight Graph</h2>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={350}
      />
    </div>
  );
};

export default WeightGraph;
