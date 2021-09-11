// контроллер обработки запросов вынесен в отдельный файл
const userPosition = require("../controller/userposition");
const error400 = require("./error400");

const router = (req, res, bodyData) => {
  let badRequest = true;
  // роут для PUT /position и вызов метода класса для обработки данных
  if (req.method === "PUT" && req.url === "/position") {
    userPosition.savePosition(req, res, bodyData);
    badRequest = false;
  }

  // роут для POST /position и вызов метода класса для обработки данных
  // можно было сделать и через GET и данные передать в url
  // но мне лично нравится больше когда есть один ендпоинт типа POST /name на все запросы,
  if (req.method === "POST" && req.url === "/position") {
    userPosition.getPositionByIdAndDate(req, res, bodyData);
    badRequest = false;
  }

  // роут 400 если вызванного пути нет
  if (badRequest) {
    error400(req, res);
  }
};

module.exports = router;
