import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

const customize = {
  height: 400,
  legend: { hidden: true },
  margin: { top: 20 },
  stackingOrder: 'descending',
};

type TGraphData = {
  total: number[];
  recovered: number[];
  deaths: number[];
  date: string[];
};

function Graph({
  title,
  graphData,
  color,
  xAxisFormatter,
  yAxisFormatter,
  dataKey,
}: {
  title: string;
  graphData: TGraphData;
  dataKey: 'total' | 'recovered' | 'deaths';
  xAxisFormatter: (value: number) => string;
  color?: string;
  yAxisFormatter?: (value: number) => string;
}) {
  return (
    <div className="border-2 border-gray-400 rounded-lg p-5 w-full">
      <div className="text-lg font-light">{title}</div>
      <LineChart
        xAxis={[
          {
            data: graphData.date.map((date) => new Date(date)),
            valueFormatter: (date) => xAxisFormatter(date),
          },
        ]}
        yAxis={[
          {
            valueFormatter: (value) => (yAxisFormatter ? yAxisFormatter(value) : value),
          },
        ]}
        series={[
          {
            data: graphData[dataKey],
            label: title,
            color: color || '#4acaed',
          },
        ]}
        {...customize}
      />
    </div>
  );
}

export default function Covid19LineGraph() {
  const [graphData, setGraphData] = React.useState<{
    total: number[];
    recovered: number[];
    deaths: number[];
    date: string[];
  }>({
    total: [],
    recovered: [],
    deaths: [],
    date: [],
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ['chartData'],
    queryFn: () => fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=50').then((res) => res.json()),
  });

  React.useEffect(() => {
    if (data) {
      const map = new Map<string, [number, number, number]>(); // key: date, value: [cases, recovered, deaths]
      Object.keys(data.cases).forEach((date) => {
        const total = data.cases[date];
        const recovered = data.recovered[date] || 0;
        const deaths = data.deaths[date] || 0;
        map.set(date, [total, recovered, deaths]);
      });

      const graphDataArray = Array.from(map.entries()).map(([date, [total, recovered, deaths]]) => ({
        total,
        recovered,
        deaths,
        date,
      }));

      setGraphData({
        total: graphDataArray.map((d) => d.total),
        recovered: graphDataArray.map((d) => d.recovered),
        deaths: graphDataArray.map((d) => d.deaths),
        date: graphDataArray.map((d) => d.date),
      });
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="w-full flex flex-col gap-y-10">
      <Graph
        title="Total Cases"
        graphData={graphData}
        dataKey="total"
        xAxisFormatter={(date) => moment(date).format('DD/MM/YYYY')}
        yAxisFormatter={(value) => `${Math.ceil(value / 1000000)}mn`}
      />
      <div className="flex gap-10 w-full flex-col md:flex-row">
        <Graph
          title="Recovered"
          graphData={graphData}
          dataKey="recovered"
          color="green"
          xAxisFormatter={(date) => moment(date).format('DD/MM/YYYY')}
        />
        <Graph
          title="Deaths"
          graphData={graphData}
          dataKey="deaths"
          color="red"
          xAxisFormatter={(date) => moment(date).format('DD/MM/YYYY')}
          yAxisFormatter={(value) => `${Math.ceil(value / 1000)}k`}
        />
      </div>
    </div>
  );
}
