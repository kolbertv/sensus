// API написано по возможности с минимальными зависимостями от сторонник библиотек, от PG уйти нельзя, необходимое "зло".
// Вместо экспресса или другого подобного фреймворка использован самописный роутинг, простой, без лишнего кода и внешних зависимостей
// роутинг можно было вынести в отдельную папку как и контроллер, но так как всего два ендпоинта, решил этого не делать.
// Проверок на ошибки нету, но ясно, что все данные которые получаем от клиента, данные которые записываем в базу, должны проверятся.
// position.csv данные для импорта в базу
// в insomnia_xxxxxx.json - запросы для API клиента https://insomnia.rest/
// database.sql скрипт для создания таблицы position
// db.js подключение к базе и данные для подключения

const http = require("http");

// контроллер обработки запросов вынесен в отдельный файл
const userPosition = require("./controller/userposition");

//создание сервера с колбек функцией на каждый request
const server = http.createServer((req, res) => {
  let jsonData = "";

  //получение частей данных которые передаются от приложения в теле запроса и сбор их в один файл
  //данные принимаются в формате джсон
  req.on("data", (data) => {
    jsonData += data;
  });

  // при получении евента "end" об окончании передачи данных
  // вызываем колбек функцию простого самодельного роутера без "смсок" и экспресса,
  // чтобы не тащить кучу зависимостей и не нужного кода
  req.on("end", () => {
    let badRequest = true;

    //парсинг данных которые получили от приложения
    const parsedData = JSON.parse(jsonData);

    // роут для PUT /position и вызов метода класса для обработки данных
    if (req.method === "PUT" && req.url === "/position") {
      userPosition.savePosition(req, res, parsedData);
      badRequest = false;
    }

    // роут для POST /position и вызов метода класса для обработки данных
    // можно было сделать и через GET и данные передать в url
    // но мне лично нравится больше когда есть один ендпоинт типа POST /name на все запросы,
    if (req.method === "POST" && req.url === "/position") {
      userPosition.getPositionByIdAndDate(req, res, parsedData);
      badRequest = false;
    }

    // роут 404 если вызванного пути нет
    if (badRequest) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: "Bad Request",
        })
      );
    }
  });
});

server.listen(3000);
