// Получение элементов DOM
const tableBody = document.getElementById("tableBody");
const chartContainer = document.getElementById("chartContainer");

// Функция для расчета процентного изменения
function calculatePercentageChange(current, yesterday) {
  if (yesterday === 0) {
    return current === 0 ? "0%" : "∞"; // Обработка деления на ноль и 0/0
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
    if (percentageChange.startsWith("+")) {
      changeClass = "positive-change";
    } else if (percentageChange.startsWith("-")) {
      changeClass = "negative-change";
    }
    tr.innerHTML = `
    <td>${row.indicator}</td>
    <td>${formatNumber(row.currentDay)}</td>
    <td class="${changeClass}">${formatNumber(
      row.yesterday
    )} <span style="float: right;">${percentageChange}</span></td>
    <td>${formatNumber(row.thisDayLastWeek)}</td>
    `;
    tr.addEventListener("click", () => handleRowClick(row.data, row.indicator));
    tableBody.appendChild(tr);
  });
}

// Функция для обработки клика по строке таблицы и отображения графика.
function handleRowClick(data, indicator) {
  chartContainer.style.display = "block";
  if (chart) {
    chart.destroy();
  }
  chart = Highcharts.chart(chartContainer, {
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
        type: "line",
      },
    ],
  });
}

createTableRows();
