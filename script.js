const tableBody = document.getElementById("tableBody");
let currentlyOpenChartRow = null;
let chart = null;

// Имитация загрузки данных с сервера
async function fetchData() {
  const response = await fetch("./data/data.json");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

// Функция для создания Highcharts графика
function createChart(containerId, data, indicator) {
  return Highcharts.chart(containerId, {
    chart: {
      type: "line",
      height: "400px",
    },
    title: {
      text: `График для показателя "${indicator}"`,
    },
    xAxis: {
      categories: [
        "День 1",
        "День 2",
        "День 3",
        "День 4",
        "День 5",
        "День 6",
        "День 7",
      ],
    },
    yAxis: {
      title: {
        text: "Значение",
      },
    },
    series: [
      {
        name: indicator,
        data: data,
      },
    ],
  });
}

// Функция для расчета процентного изменения
function calculatePercentageChange(current, yesterday) {
  if (yesterday === 0) {
    return current === 0 ? "0%" : "∞";
  }
  const change = ((current - yesterday) / yesterday) * 100;
  return `${change > 0 ? "+" : ""}${change.toFixed(0)}%`;
}

// Функция для форматирования чисел
function formatNumber(number) {
  return new Intl.NumberFormat("ru-RU").format(number);
}

// Функция для создания строк таблицы на основе данных из data
function createTableRows(data) {
  data.forEach((row, index) => {
    const tr = document.createElement("tr");
    const percentageChange = calculatePercentageChange(
      row.currentDay,
      row.yesterday
    );
    let changeClass = "no-change";
    let percentageClass = "";

    if (percentageChange.startsWith("+")) {
      changeClass = "positive-change";
      percentageClass = "percentage-positive";
    } else if (percentageChange.startsWith("-")) {
      changeClass = "negative-change";
      percentageClass = "percentage-negative";
    } else {
      percentageClass = "percentage-cell";
    }

    tr.innerHTML = `
    <td>${row.indicator}</td>
    <td>${formatNumber(row.currentDay)}</td>
    <td class="${changeClass}">
        <span class="number-cell">${formatNumber(row.yesterday)}</span>
        <span style="float: right;" class="${percentageClass}">${percentageChange}</span>
    </td>
    <td>${formatNumber(row.thisDayLastWeek)}</td>
  `;

    tr.dataset.chartIndex = index; // Сохранение индекса в data атрибуте
    tr.addEventListener("click", () => {
      handleRowClick(row, index);
    });

    tableBody.appendChild(tr);
  });
}

// Функция для обработки клика по строке и отображения графика
function handleRowClick(row, index) {
  const chartContainerId = `chart-container-${index}`;
  const chartContainerDiv = document.createElement("tr");

  chartContainerDiv.innerHTML = `<td colspan="4"><div id="${chartContainerId}" class="chart-container" style="display: none"></div></td>`;
  // Управление открытой строкой
  if (currentlyOpenChartRow) {
    const previousChartIndex = currentlyOpenChartRow.dataset.chartIndex;
    if (previousChartIndex === String(index)) {
      currentlyOpenChartRow.nextElementSibling.remove();
      currentlyOpenChartRow = null;
      return;
    } else {
      currentlyOpenChartRow.nextElementSibling.remove();
    }
  }
  const clickedRow = tableBody.querySelector(`tr[data-chart-index="${index}"]`);

  clickedRow.insertAdjacentElement("afterend", chartContainerDiv); // Вставка строки с графиком после строки
  const chartContainer = chartContainerDiv.querySelector(".chart-container");
  chartContainer.style.transition = "max-height 0.3s ease-out";
  chartContainer.style.display = "block";
  chartContainer.style.opacity = 0;
  chartContainer.style.transition = "opacity 0.5s";

  if (chart) {
    chart.destroy();
  }
  chart = createChart(chartContainerId, row.data, row.indicator);

  setTimeout(() => {
    chartContainer.style.opacity = 1;
  }, 0);

  currentlyOpenChartRow = clickedRow;
}

// Загрузка данных
fetchData().then((data) => {
  createTableRows(data);
});
