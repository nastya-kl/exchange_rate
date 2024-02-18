import { useEffect, useState } from 'react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { ReactECharts } from '../../Echarts/ReactECharts';
import { getExchangeRate } from '../../api/api';
import { IExchangeRateData } from '../../types';
import options from '../../utils/ExchangeRateOptions';
import './ExchangeChart.scss';

function ExchangeChart() {
  const [exchangeData, setExchangeData] = useState<IExchangeRateData | null>(
    null
  );
  // Добавить прелоадер
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  type Item = string;
  const items: Item[] = ['$', '€', '¥'];
  const [value, setValue] = useState<Item | null>(items[0]);

  useEffect(() => {
    (async () => {
      try {
        // setIsLoading(true);
        const data = await getExchangeRate();
        setExchangeData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // } finally {
        //   setIsLoading(false);
      }
    })();
  }, []);

  console.log(exchangeData);

  return (
    <Theme preset={presetGpnDefault}>
      <Card shadow={false} className="chart">
        <ReactECharts
          option={options}
          style={{
            maxWidth: '1000px',
            height: '400px',
          }}
        />
        <Card shadow={false} className="chart__wrapper">
          <ChoiceGroup
            value={value}
            // испр. ошибку типизации
            onChange={({ value }) => setValue(value)}
            items={items}
            getItemLabel={(item: string) => item}
            multiple={false}
            className="chart__switcher"
            name={'Exchange'}/>
          <Card shadow={false} className="chart__data-container">
            <Text as="p" className="chart__midscore-info">
              Среднее за период
            </Text>
            <Text as="p" className="chart__midscore-num">
              65,6 <span className="chart__midscore-rub">₽</span>
            </Text>
          </Card>
        </Card>
      </Card>
    </Theme>
  );
}

export default ExchangeChart;
