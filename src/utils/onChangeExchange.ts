
import { IExchangeRateData } from '../types';

function onChangeExchange() {
  // Разделить массив в зависимости от валюты для отрисовки графика
  function groupedData(
    exchangeData: IExchangeRateData[]
  ): Record<string, IExchangeRateData[]> {
    return exchangeData.reduce((acc, obj) => {
      if (!acc[obj.indicator]) {
        acc[obj.indicator] = [];
      }

      acc[obj.indicator].push(obj);
      return acc;
    }, {} as Record<string, IExchangeRateData[]>);
  }

  // Функиця для создания массива со значениями value объекта для каждой валюты
  // для оси Y
  function getExchangeValues(exchange: IExchangeRateData[]): number[] {
    const values = exchange.map((item) => {
      return item.value;
    });

    return values;
  }

  return {
    groupedData,
    getExchangeValues
  }
}

export default onChangeExchange;
