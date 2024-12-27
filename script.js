// Получение элементов DOM
const tableBody = document.getElementById("tableBody");
const chartContainer = document.getElementById("chartContainer");
let chart = null;

// Функция для создания Highcharts графика
function createChart(containerId, data, indicator) {
  return Highcharts.chart(containerId, {
    chart: {
      type: "line",
      height: "300px",
    },
    title: {
      text: `График для показателя "${indicator}"`,
    },
    xAxis: {
      categories: ["День 1", "День 2", "День 3", "День 4", "День 5", "День 6"],
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

// Функция для создания строк таблицы на основе данных из tableData
function createTableRows() {
  tableData.forEach((row, index) => {
    const tr = document.createElement("tr");
    // Условное добавление классов к ячейкам для отображения цвета
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
    }
    const chartContainerId = `chart-container-${index}`; // Уникальный ID для каждого графика
    tr.innerHTML = `
    <td>${row.indicator}</td>
    <td>${formatNumber(row.currentDay)}</td>
    <td class="${changeClass}">${formatNumber(
      row.yesterday
    )} <span style="float: right;" class="${percentageClass}">${percentageChange}</span></td>
    <td>${formatNumber(row.thisDayLastWeek)}</td>
  `;
    const chartContainerDiv = document.createElement("tr");
    chartContainerDiv.innerHTML = `<td colspan="4"><div id="${chartContainerId}" class="chart-container" style="display: none"></div></td>`;

    tr.addEventListener("click", () => {
      handleRowClick(row, chartContainerId);
    });
    tableBody.appendChild(tr);
    tableBody.appendChild(chartContainerDiv);
  });
}

// Функция для обработки клика по строке
function handleRowClick(row, index) {
  tableBody.style.transition = "max-height 0.3s ease-out";
  tableBody.style.maxHeight = "0px";
  setTimeout(() => {
    showChart(row, index);
  }, 0);
}

// Функция для отображения графика
function showChart(row, containerId) {
  const chartContainer = document.getElementById(containerId);
  chartContainer.style.display = "block";
  chartContainer.style.opacity = 0;
  chartContainer.style.transition = "opacity 0.5s";

  if (chart) {
    chart.destroy();
  }
  chart = createChart(row.data, row.indicator);

  setTimeout(() => {
    chartContainer.style.opacity = 1;
  }, 0);
}

createTableRows();
