import Covid19LineGraph from '../components/charts-and-maps/covid-19-line-graph';
import CovidMap from '../components/charts-and-maps/covid-map';
import Statistics from '../components/charts-and-maps/statistics';
import Page from '../components/common/page';

const ChartsAndMaps: React.FC = () => {
  return (
    <Page className="flex-col">
      <div className="text-xl font-semibold pb-2 text-primary border-b-[1px] border-b-dark-secondary/30 mb-10">
        COVID 19 Reports
      </div>
      <Statistics />
      <Covid19LineGraph />
      <CovidMap />
    </Page>
  );
};

export default ChartsAndMaps;
