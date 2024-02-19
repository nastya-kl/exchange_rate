interface IOptionsProps {
  currentExchangeValue: number[];
  exchangeMonth: Date[];
  chartTitle: string;
  tooltipInfo: string;
}

function getExchangeOptions({
  currentExchangeValue,
  exchangeMonth,
  chartTitle,
  tooltipInfo,
}: IOptionsProps) {
  const options = {
    color: '#F38B00',
    // Заголовок
    title: {
      text: chartTitle,
      textStyle: {
        color: '#002033',
        fontWeight: 700,
        fontFamily: 'Inter',
        fontSize: 20,
        lineHeight: 30,
      },
    },
    grid: {
      top: 60,
    },
    // Окно с инф-цией
    tooltip: {
      trigger: 'axis',
      hideDelay: 0,
      transitionDuration: 0.2,
      axisPointer: {
        type: 'line',
      },
      position: function (point: number[]) {
        return [point[0] + 20, point[1] - 30];
      },
      textStyle: {
        color: '#002033',
        fontFamily: 'Inter',
        fontWeight: 700,
        fontSize: 12,
        lineHeight: 16.8,
      },
      extraCssText: 'box-shadow: 0 10px 14px rgba(0, 32, 51, 0.3)',
    },
    xAxis: {
      type: 'category',
      data: exchangeMonth,
      // Отступы по бокам
      boundaryGap: false,
      axisLine: {
        onZero: true,
        show: false,
        lineStyle: {},
      },
      // Засечки на линии
      axisTick: {
        show: false,
      },
      // Текст делений
      axisLabel: {
        margin: 34,
        color: 'rgba(0, 32, 51, 0.6)',
        fontWeight: 400,
        fontSize: 10,
        lineHeight: 15,
      },
    },
    yAxis: {
      type: 'value',
      splitNumber: 3,
      scale: true,
      axisLabel: {
        margin: 24,
        color: 'rgba(102, 121, 133, 1)',
        fontWeight: 400,
        fontSize: 10,
        lineHeight: 15,
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: 'rgba(0, 65, 102, 0.2)',
          type: [5, 20],
          dashOffset: -16,
        },
        length: 38,
      },
    },
    series: [
      {
        name: tooltipInfo,
        type: 'line',
        data: currentExchangeValue,
        symbol: 'none',
        smooth: 0.08,
      },
    ],
  };

  return options;
}

export default getExchangeOptions;
