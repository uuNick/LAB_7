require("dotenv").config();
const express = require('express');
const sequelize = require("./db");
const bodyParser = require('body-parser');
const router = require("./routes/allRoutes");
const models = require("./models/Models");

const port = process.env.SERVER_PORT;
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use("/api", router);


async function syncModels() {
  try {
    await models.Buyer.sync();
    await models.FurnitureModel.sync(); 
    await models.Contract.sync(); 
    await models.Sale.sync(); 
    console.log('Модели успешно синхронизированы!');
  } catch (error) {
    console.error('Ошибка синхронизации моделей:', error);
    process.exit(1);
  }
}

const start = async () => {
  try {
    //console.log("DB_NAME:", process.env.DB_NAME);
    await sequelize.authenticate(); // Подключение к БД
    await syncModels(); // Вызов функции синхронизации

    // Заполнение базы данных начальными данными
    //await seedDatabase();

    app.listen(port, () => console.log(`Server listening on port ${port}`));
  } catch (e) {
    console.log(e);
  }
};

start();