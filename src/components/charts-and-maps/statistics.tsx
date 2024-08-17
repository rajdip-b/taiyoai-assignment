import { useQuery } from '@tanstack/react-query';
import React from 'react';

function Card({ title, quantity }: { title: string; quantity: number }) {
  return (
    <div className="border-gray-400 flex flex-col gap-y-4 border-2 rounded-lg p-5 w-1/3">
      <div className="text-primary font-semibold text-2xl">{quantity}</div>
      <div className="text-dark-secondary font-light text-xl">{title}</div>
    </div>
  );
}

export default function Statistics() {
  const [items, setItems] = React.useState<
    {
      quantity: number;
      title: string;
    }[]
  >([]);

  const { data, error, isLoading } = useQuery({
    queryKey: ['statsData'],
    queryFn: () => fetch('https://disease.sh/v3/covid-19/all').then((res) => res.json()),
  });

  React.useEffect(() => {
    if (data) {
      const { cases, deaths, recovered } = data;

      setItems([
        { quantity: cases, title: 'Total Cases' },
        { quantity: recovered, title: 'Total Recovered' },
        { quantity: deaths, title: 'Total Deaths' },
      ]);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="w-full flex flex-col mb-5">
      <div className="text-xl font-light mb-5">Statistics</div>
      <div className="w-full flex-row flex gap-5">
        {items.map((item, i) => (
          <Card key={i} title={item.title} quantity={item.quantity} />
        ))}
      </div>
    </div>
  );
}
