import { useEffect, useState } from 'react';
import { ReactECharts } from './Echarts/ReactECharts';
import { getExchangeRate } from './api/api';
import { IExchangeRateData } from './types';

function App() {
  const [data, setData] = useState<IExchangeRateData | null>(null);
  // Добавить прелоадер
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await getExchangeRate();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  console.log(data);

  // Пример с сайта ECharts
  const option = {
    title: {
      text: 'ECharts Getting Started Example',
    },
    tooltip: {},
    legend: {
      data: ['sales'],
    },
    xAxis: {
      data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks'],
    },
    yAxis: {},
    series: [
      {
        name: 'sales',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  };

  return (
    <div>
      <ReactECharts
        option={option}
        style={{ width: '100%', height: '400px' }}
      />
    </div>
  );
}

export default App;
