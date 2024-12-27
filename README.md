# Код `script.js` состоит из трех основных частей:

1. Получение элементов DOM: Получение доступа к элементам таблицы и контейнеру графика.
2. createTableRows(): Функция для создания строк таблицы на основе данных из tableData.
3. handleRowClick(): Функция для обработки клика по строке таблицы и отображения графика.

## Детальное описание:

### Получение элементов DOM:

1. `const tableBody = document.getElementById("tableBody");` - ищет элемент с id="tableBody" в HTML-документе и сохраняет его в переменную tableBody.

- Этот элемент представляет собой <tbody> таблицы, куда будут добавляться строки данных.

2. `const chartContainer = document.getElementById("chartContainer");` - ищет элемент с id="chartContainer" в HTML-документе и сохраняет его в переменную chartContainer.

- Этот элемент представляет собой <div>, в котором будет отображаться график.

### createTableRows() Function:

1. `function createTableRows():` - объявляет функцию createTableRows.

2. `tableData.forEach((row, index) => { ... }):` - метод forEach перебирает каждый элемент массива tableData (данные для таблицы). Внутри цикла:

- row - текущий объект из массива tableData.
- index - индекс текущего элемента в массиве.

3. `const tr = document.createElement("tr");` - создает новый элемент <tr> (строка таблицы).
4. `tr.innerHTML = \…“:` - заполняет строку <tr> данными из текущего объекта row.

Используется шаблонная строка для удобного добавления HTML:

- `<td>${row.indicator}</td>`- ячейка для показателя.
- `<td>${row.currentDay}</td>` - ячейка для текущего дня.
- `<td>${row.yesterday}</td>` - ячейка для вчерашнего дня.
- `<td>${row.thisDayLastWeek}</td>` - ячейка для этого дня на прошлой неделе.

5. `tr.addEventListener("click", () => handleRowClick(row.data, row.indicator));` - добавляет обработчик события click на созданную строку <tr>.

- При клике будет вызвана функция handleRowClick, передавая ей данные для графика (row.data) и название показателя (row.indicator).

6. `tableBody.appendChild(tr);` - добавляет созданную строку <tr> в элемент <tbody> таблицы (полученный ранее по id tableBody).

### handleRowClick() Function:

1. `function handleRowClick(data, indicator)` - объявляет функцию handleRowClick, принимающую данные для графика data и название показателя indicator в качестве аргументов.

2. `chartContainer.style.display = "block";` - делает контейнер графика (chartContainer) видимым, так как по умолчанию у него display: none.

3. `Highcharts.chart(chartContainer, { ... });` - инициализирует график с помощью библиотеки Highcharts.

- Первый аргумент chartContainer - элемент, в котором будет отрисован график.
- Второй аргумент - объект с конфигурацией графика

4.  `title: { text: \График для показателя “${indicator}”}` - устанавливает заголовок графика, используя название показателя indicator.

5.  `xAxis: { categories: ["День 1", "День 2", "День 3", "День 4", "День 5", "День 6"] }` - устанавливает подписи для оси X, показывающие дни.

6.  `yAxis: { title: { text: "Значение" } }` - устанавливает подпись для оси Y.

7.  `series: [{ name: indicator, data: data, type: "line" }]` - определяет серию данных для графика.

8.  `name: indicator` - имя серии, которое будет отображаться в легенде (совпадает с названием показателя).

9.  `data: data` - массив данных для графика (переданные из строки таблицы). 10. type: "line" - тип графика (линейный).

### Вызов функции createTableRows():

`createTableRows();` - вызывает функцию createTableRows() для отрисовки таблицы на странице при ее загрузке.
