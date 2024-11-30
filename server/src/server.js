require("dotenv").config();
const express = require('express');
const cors = require('cors');
const sequelize = require("./db");
const bodyParser = require('body-parser');
const router = require("./routes/allRoutes");
const models = require("./models/Models");
const { populateFurnitureModels, populateBuyers, populateContracts, populateSales } = require('./seed');

const port = process.env.SERVER_PORT;
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials:true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.json());
app.use("/api", router);


async function seedDatabase() {
  try {
      await populateBuyers(20);
      await populateFurnitureModels(20);
      await populateContracts(20);
      await populateSales(20);
      console.log('Все таблицы успешно заполнены!');
  } catch (error) {
      console.error('Ошибка при заполнении базы данных:', error);
      process.exit(1);
  }
}

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
    await sequelize.authenticate();
    await syncModels(); 
    //await seedDatabase();

    app.listen(port, () => console.log(`Server listening on port ${port}`));
  } catch (e) {
    console.log(e);
  }
};


start();