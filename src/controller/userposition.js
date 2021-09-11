// подключение к базе данных
const db = require("../db/db");

class UserPosition {
  // так как запросы к базе асинхронные, то создаем асинхронный метод для запроса к базе и сохраняем строку в таблицу с id юзера и его координатами
  async savePosition(req, res, bodyData) {
    try {
      const { user_id, latitude, longitude } = bodyData;
      await db.query("INSERT INTO position (user_id, latitude, longitude) VALUES ($1, $2, $3)", [
        user_id,
        latitude,
        longitude,
      ]);
      this.resSend(res, { data: "ok" });
    } catch (error) {
      console.log(error);
      this.resSend(res, { data: "error" });
    }
  }

  // так как запросы к базе асинхронные, то создаем асинхронный метод для запроса к базе из таблицы position выбираем те строки которые соотетвуются условию WHERE
  async getPositionByIdAndDate(req, res, bodyData) {
    try {
      const { user_id, startDate, endDate } = bodyData;
      const past = new Date(0);
      const now = new Date();
      const user = await db.query("SELECT * FROM position where user_id=$1 and added_at BETWEEN $2 and $3", [
        user_id,
        startDate || past, // В случае если не задана дата начала периода, то выборка будет от 1970 года.
        endDate || now, // В случае если не задана дата конца периода, то даьа будет на момент поиска
      ]);
      this.resSend(res, user.rows);
    } catch (error) {
      console.log(error);
      this.resSend(res, { data: "error" });
    }
  }
  resSend(res, data) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  }
}

module.exports = new UserPosition();
