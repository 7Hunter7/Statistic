// Получение элементов DOM
const tableBody = document.getElementById("tableBody");
const chartContainer = document.getElementById("chartContainer");

// Функция для создания строк таблицы на основе данных из tableData
function createTableRows() {
  tableData.forEach((row, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${row.indicator}</td>
            <td>${row.currentDay}</td>
            <td>${row.yesterday}</td>
            <td>${row.thisDayLastWeek}</td>
        `;
    tr.addEventListener("click", () => handleRowClick(row.data, row.indicator));
    tableBody.appendChild(tr);
  });
}

// Функция для обработки клика по строке таблицы и отображения графика.
function handleRowClick(data, indicator) {
  chartContainer.style.display = "block";
  Highcharts.chart(chartContainer, {
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
