const models = require('./models/Models');
const faker = require('faker');

async function populateFurnitureModels(count = 10) {
    try {
        const modelsToCreate = [];
        for (let i = 0; i < count; i++) {
            modelsToCreate.push({
                furniture_name: faker.commerce.productName(),
                model: faker.random.alphaNumeric(8),
                characteristics: faker.lorem.paragraph(),
                price: parseFloat((Math.random() * 1000).toFixed(2)),
            });
        }

        const createdModels = await models.FurnitureModel.bulkCreate(modelsToCreate);
        console.log(`${createdModels.length} записей успешно создано в таблице FurnitureModel`);
    } catch (error) {
        console.error('Ошибка при создании записей:', error);
    }
}

async function populateBuyers(count = 10) {
    try {
        const buyersToCreate = [];
        for (let i = 0; i < count; i++) {
            buyersToCreate.push({
                buyer_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
                buyer_address: faker.address.streetAddress(),
                buyer_phone: faker.phone.phoneNumber(),
            });
        }

        const createdBuyers = await models.Buyer.bulkCreate(buyersToCreate);
        console.log(`${createdBuyers.length} записей успешно создано в таблице Buyer`);
    } catch (error) {
        console.error('Ошибка при создании записей:', error);
    }
}

async function populateContracts(count = 10) {
    try {
        const buyers = await models.Buyer.findAll({ attributes: ['buyer_id'] }); // Получаем все ID покупателей

        if (buyers.length === 0) {
            console.error("Таблица Buyer пуста. Заполните её перед запуском этого скрипта.");
            return;
        }

        const contractsToCreate = [];
        for (let i = 0; i < count; i++) {
            const randomBuyer = buyers[Math.floor(Math.random() * buyers.length)];
            const contractDate = faker.date.between('2022-01-01', '2024-12-31'); // Дата заключения контракта
            const executionDate = faker.date.between(contractDate, '2025-12-31'); // Дата исполнения (может быть null)

            contractsToCreate.push({
                contract_date: contractDate,
                execution_date: executionDate,
                buyer_id: randomBuyer.buyer_id,
            });
        }

        const createdContracts = await models.Contract.bulkCreate(contractsToCreate);
        console.log(`${createdContracts.length} записей успешно создано в таблице Contract`);
    } catch (error) {
        console.error('Ошибка при создании записей:', error);
    }
}

async function populateSales(count = 10) {
    try {
        const contracts = await models.Contract.findAll({ attributes: ['contract_number'] });
        const furnitureModels = await models.FurnitureModel.findAll({ attributes: ['furniture_model_id'] });

        if (contracts.length === 0 || furnitureModels.length === 0) {
            console.error("Таблицы Contract или FurnitureModel пусты. Заполните их перед запуском этого скрипта.");
            return;
        }

        const salesToCreate = [];
        for (let i = 0; i < count; i++) {
            const randomContract = contracts[Math.floor(Math.random() * contracts.length)];
            const randomFurnitureModel = furnitureModels[Math.floor(Math.random() * furnitureModels.length)];
            const quantity = faker.datatype.number({ min: 1, max: 10 });

            salesToCreate.push({
                quantity: quantity,
                contract_number: randomContract.contract_number,
                furniture_model_id: randomFurnitureModel.furniture_model_id,
            });
        }

        const createdSales = await models.Sale.bulkCreate(salesToCreate);
        console.log(`${createdSales.length} записей успешно создано в таблице Sale`);
    } catch (error) {
        console.error('Ошибка при создании записей:', error);
    }
}

module.exports = {
    populateFurnitureModels,
    populateBuyers,
    populateContracts,
    populateSales,
}
