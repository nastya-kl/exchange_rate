import { useCallback, useEffect, useState } from 'react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { ReactECharts } from '../../Echarts/ReactECharts';
import { getExchangeRate } from '../../api/api';
import { IExchangeRateData } from '../../types';
import getExchangeOptions from '../../utils/getExchangeOptions';
import './ExchangeChart.scss';
import onChangeExchange from '../../utils/onChangeExchange';

function ExchangeChart() {
  const [exchangeData, setExchangeData] = useState<IExchangeRateData[]>([]);
  // Булевые переменные состояния для отрисовки графика в зависимости
  // от выбранной валюты на переключателе
  const [isDollar, setIsDollar] = useState<boolean>(true);
  const [isEuro, setIsEuro] = useState<boolean>(false);
  const [isYuan, setIsYuan] = useState<boolean>(false);

  // Заголовок графика
  const [chartTitle, setChartTitle] = useState<string>('КУРС ДОЛЛАРА, $/₽');
  // Название валюты в тултипе при наведении мыли на график
  const [tooltipInfo, setTooltipInfo] = useState<string>('Курс доллара');

  // Символы валют для переключателя
  type IIcon = string;
  const icons: IIcon[] = ['$', '€', '¥'];
  const [value, setValue] = useState<IIcon | null>(icons[0]);

  // Переменная, куда будет записываться значение курса валюты
  // в зависимости от переключателя
  const [currentExchangeValue, setCurrentExchangeValue] = useState<number[]>(
    []
  );
  // Добавить прелоадер
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const { groupedData, getExchangeValues } = onChangeExchange();

  useEffect(() => {
    (async () => {
      try {
        // setIsLoading(true);
        const data = await getExchangeRate();
        setExchangeData(data);
        // Разделяем массив на 3 части в зависимсти от названия валюты
        const separatedData = groupedData(data);
        // При первоначальной отрисовке записываем значения курса доллара
        // (как выбрано на переключателе)
        const dollarExchangeData = separatedData['Курс доллара'];
        if (dollarExchangeData) {
          setCurrentExchangeValue(getExchangeValues(dollarExchangeData));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // } finally {
        //   setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Перерисовка графика в зависимости от выбранной валюты на переключателе
  useEffect(() => {
    if (exchangeData.length === 0) return;

    const separatedData = groupedData(exchangeData);

    if (isDollar) {
      const dollarExchangeData = separatedData['Курс доллара'];
      setCurrentExchangeValue(getExchangeValues(dollarExchangeData));
      setChartTitle('КУРС ДОЛЛАРА, $/₽');
      setTooltipInfo('Курс доллара');
    } else if (isEuro) {
      const euroExchangeData = separatedData['Курс евро'];
      setCurrentExchangeValue(getExchangeValues(euroExchangeData));
      setChartTitle('КУРС ЕВРО, €/₽');
      setTooltipInfo('Курс евро');
    } else if (isYuan) {
      const yuanExchangeData = separatedData['Курс юаня'];
      setCurrentExchangeValue(getExchangeValues(yuanExchangeData));
      setChartTitle('КУРС ЮАНЯ, ¥/₽');
      setTooltipInfo('Курс юаня');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDollar, isEuro, isYuan]);

  // Функция, которая отслеживает состояние переключателя валюты
  const onChandge = useCallback(
    ({ value }: { value: string }) => {
      setValue(value);
      if (value === icons[0]) {
        setIsDollar(true);
        setIsEuro(false);
        setIsYuan(false);
      } else if (value === icons[1]) {
        setIsEuro(true);
        setIsDollar(false);
        setIsYuan(false);
      } else if (value === icons[2]) {
        setIsYuan(true);
        setIsDollar(false);
        setIsEuro(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!exchangeData) return;

  // Создаем массив с месяцами (убираем повторы) для отрисовки на оси Х
  const exchangeMonth = Array.from(
    new Set(exchangeData.map((item) => item.month))
  );

  // Функция для определения среднего значения курса за все месяцы
  function calculateAverage(nums: number[]) {
    if (nums.length === 0) {
      return 0;
    }

    const sum = nums.reduce((acc, num) => acc + num, 0);
    const average = sum / nums.length;

    return average.toFixed(1);
  }

  const midscore = calculateAverage(currentExchangeValue);

  return (
    <Theme preset={presetGpnDefault}>
      <Card shadow={false} className="chart">
        <ReactECharts
          option={getExchangeOptions({
            currentExchangeValue,
            exchangeMonth,
            chartTitle,
            tooltipInfo,
          })}
          style={{
            maxWidth: '1000px',
            height: '400px',
          }}
        />
        <Card shadow={false} className="chart__wrapper">
          <ChoiceGroup
            value={value}
            // испр. ошибку типизации
            onChange={onChandge}
            items={icons}
            getItemLabel={(item: string) => item}
            multiple={false}
            className="chart__switcher"
            size="xs"
            name={'Exchange'}
          />
          <Card shadow={false} className="chart__data-container">
            <Text as="p" className="chart__midscore-info">
              Среднее за период
            </Text>
            <Text as="p" className="chart__midscore-num">
              {midscore} <span className="chart__midscore-rub">₽</span>
            </Text>
          </Card>
        </Card>
      </Card>
    </Theme>
  );
}

export default ExchangeChart;
