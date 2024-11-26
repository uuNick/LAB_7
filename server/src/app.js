const express = require('express');
const bodyParser = require('body-parser');
const buyerRouter = require('./routes/buyerRouter');
const furnitureModelRouter = require('./routes/furnitureModelRouter');
const contractRouter = require('./routes/contractRouter');
const saleRouter = require('./routes/saleRouter');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Подключение маршрутов
app.use('/buyers', buyerRouter);
app.use('/furnitureModels', furnitureModelRouter);
app.use('/contracts', contractRouter);
app.use('/sales', saleRouter);



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });