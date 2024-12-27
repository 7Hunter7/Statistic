# Код script.js состоит из следующих основных частей:

1. Загрузка данных с сервера:

- Функция `fetchData()` имитирует асинхронную загрузку данных.

2. Создание строк таблицы:

- Функция `createTableRows()` создает строки таблицы на основе полученных данных.

3. Обработка клика по строке:

- Функция `handleRowClick()` обрабатывает клик по строке таблицы, отображая или скрывая график.

4. Создание `Highcharts` графика:

- Функция `createChart()` формирует график из представленных данных с исользованием библиотеки `Highcharts`.

5. Инициализация:

- Вызов `fetchData()` и последующее создание таблицы после загрузки данных.

## Детальное описание:

### Загрузка данных с сервера:

1. `async function fetchData()` - Объявляет асинхронную функцию `fetchData`, имитирующую получение данных с сервера.

2. `await fetch("./data/data.json");` - Выполняет HTTP-запрос к файлу `./data/data.json`.

3. `if (!response.ok) { throw new Error('HTTP error! status: ${response.status}');}` - Обрабатывает ответ от "сервера".

- Проверяет, чтобы ответ был успешным (`response.ok`). В случае ошибки выбрасывает исключение.

- Использует `response.json();` для преобразования JSON-ответа в объект JavaScript.

### Создание строк таблицы:

1. `function createTableRows(data)` - Объявляет функцию `createTableRows`, принимающую данные для таблицы (`data`) в качестве аргумента.

2. `data.forEach((row, index) => { ... })` - Метод `forEach` перебирает каждый элемент массива `data` (данные для таблицы).

3. Внутри цикла:

- `row` - текущий объект данных из массива `data`.
- `index` - индекс текущего элемента в массиве.
- `const tr = document.createElement("tr");` - Создает новый элемент `<tr>` (строка таблицы).
- `tr.innerHTML = \…;` - Заполняет строку данными из текущего объекта `row`.

#### Используется шаблонная строка для удобного добавления HTML:

- `<td>${row.indicator}</td>` - Ячейка для названия показателя.
- `<td>${formatNumber(row.currentDay)}</td>` - Ячейка для текущего значения (отформатированного с помощью `formatNumber`).
- `<td> <span class="number-cell">${formatNumber(row.yesterday)}</span>` и `<span style="float: right;" class="${percentageClass}">${percentageChange}</span></td>`- Ячейка со значением за вчерашний день и процентным изменением. Вложенные span для выравнивания.
- `<td>${formatNumber(row.thisDayLastWeek)}</td>` - Ячейка для значения на этой неделе (отформатированного с помощью `formatNumber`).

3.  `tr.dataset.chartIndex = index;` - Сохраняет индекс элемента `index` в `data` атрибуте `data-chart-index`.

4.  `tr.addEventListener("click", () => handleRowClick(row, index));` - Добавляет обработчик события `click` на созданную строку `<tr>`.

- При клике будет вызвана функция `handleRowClick`, передавая ей объект данных `row` и `index` строки.

5. `tableBody.appendChild(tr);` - Добавляет созданную строку `<tr>` в элемент `<tbody>` таблицы (полученный ранее по `id tableBody`).

### Обработка клика по строке:

1. `function handleRowClick(row, index)` - объявляет функцию `handleRowClick`, принимающую объект данных `row` и `index` строки в качестве аргументов.

2. `const chartContainerId = 'chart-container-${index}';` - Формирует уникальный `id` для элемента контейнера графика.

3. `const chartContainerDiv = document.createElement("tr");` - Создает элемент `<tr>` для графика.

4. `chartContainerDiv.innerHTML = \` - Заполняет созданный элемент строкой с контейнером для графика

5. Управление открытой строкой:

- Проверяет была ли открыта строка с графиком `if(currentlyOpenChartRow)`.
- Если была, и индекс этой строки тот же, что и у кликнутой - закрывает график, убирая строку.
- Если строка была, но индекс другой, то удаляет предыдущую строку с графиком.

6. `const clickedRow = tableBody.querySelector(\tr[data-chart-index=”${index}”])` - Получает ссылку на элемент строки на которую кликнули.

7. `clickedRow.insertAdjacentElement('afterend', chartContainerDiv);` - Вставляет строку с графиком после строки, на которую кликнули.

8. `const chartContainer = chartContainerDiv.querySelector('.chart-container')` - Получает доступ к контейнеру графика. Анимирует появление графика, присваивая стили.

9. `if (chart) { chart.destroy();}` - Удаляет старый график (если есть).

10. `chart = createChart(chartContainerId, row.data, row.indicator);` - Создает новый график с помощью библиотеки `Highcharts`. Сохраняет ссылку на открытую строку в currentlyOpenChartRow.

## Инициализация:

1. `fetchData().then((data) => { createTableRows(data); });` - Вызывает асинхронную функцию `fetchData` для загрузки данных.

- После успешной загрузки данных вызывается функция `createTableRows` для отрисовки таблицы на странице, передавая данные из `fetchData` в качестве аргумента.

## Вспомогательные функции

1. `calculatePercentageChange(current, yesterday)` - Функция для расчета процентного изменения между текущим и вчерашним значением.
2. `formatNumber(number)` - Функция форматирования чисел с разделителями тысяч.
