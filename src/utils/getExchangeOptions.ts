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
      padding: [0, 0, 0, 30],
      textStyle: {
        color: '#002033',
        fontWeight: 700,
        fontFamily: 'Inter',
        fontSize: 20,
        lineHeight: 30,
      },
    },
    grid: {
      top: 80,
    },
    // Окно с инф-цией
    tooltip: {
      trigger: 'axis',
      hideDelay: 0,
      transitionDuration: 0.2,
      axisPointer: {
        type: 'line',
      },
      position: function (point: number[], rect: any) {
        console.log(rect);
        
        return [point[0] + 20, point[1] - 30];
      },
      // Стилизация тултипа при наведении мыши на графике
      formatter: function (params: any) {
        const colorCircle = `<span style="display:inline-block;margin-right:6px;margin-bottom:-2px;border-radius:50%;width:12px;height:12px;background-color:${params[0].color};"></span>`;
        const valueText = `<span style="font-weight:bold">${params[0].value} ₽</span>`;
        const monthText = `<span style="font-weight:bold;display:inline-block;margin-bottom:8px;padding:0">${params[0].name}</span>`;
        const exchangeNameText = `<span style="color:#667985;margin-right:39px">${params[0].seriesName}</span>`;

        return `${monthText}<br />${colorCircle}${exchangeNameText} ${valueText}`;
      },
      padding: 5.5,
      textStyle: {
        color: '#002033',
        fontFamily: 'Inter',
        fontSize: 12,
        lineHeight: 16.8,
      },
      extraCssText: 'box-shadow: 0 10px 14px rgba(0, 32, 51, 0.3);',
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
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 65, 102, 0.2)',
          type: [1, 4],
          dashOffset: 5,
        },
      },
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
