import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

type TCountryData = {
  countryName: string;
  longitude: number;
  latitude: number;
  activeCases: number;
  recoveredCases: number;
  deaths: number;
};

export default function CovidMap() {
  const [countryData, setCountryData] = React.useState<TCountryData[]>([]);

  const { data, error, isLoading } = useQuery({
    queryKey: ['countryData'],
    queryFn: () => fetch('https://disease.sh/v3/covid-19/countries').then((res) => res.json()),
  });

  React.useEffect(() => {
    if (data) {
      setCountryData(
        data.map((countryDetails: any) => ({
          countryName: countryDetails.country,
          longitude: countryDetails.countryInfo.long,
          latitude: countryDetails.countryInfo.lat,
          activeCases: countryDetails.active,
          recoveredCases: countryDetails.recovered,
          deaths: countryDetails.deaths,
        }))
      );
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="w-full flex flex-col my-5">
      <div className="text-xl font-light mb-5">Country Statistics</div>
      {countryData.length > 0 && (
        <MapContainer center={[51.505, -0.09]} zoom={5} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {countryData.map((country) => (
            <Marker key={country.countryName} position={[country.latitude, country.longitude]}>
              <Popup>
                <div className="flex flex-col gap-y-2">
                  <div className="text-xl font-semibold">{country.countryName}</div>
                  <div className="text-dark-secondary font-light">Active Cases: {country.activeCases}</div>
                  <div className="text-dark-secondary font-light">Recovered Cases: {country.recoveredCases}</div>
                  <div className="text-dark-secondary font-light">Deaths: {country.deaths}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}
