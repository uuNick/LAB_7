const Contract = require("../models/Contract");
const Buyer = require("../models/Buyer");
const { Op } = require("sequelize");

class ContractController {

    async create(req, res) {
        const { contract_date, execution_date, buyer_id } = req.body;

        try {
            if (!contract_date || !execution_date || !buyer_id) {
                return res.status(400).json({ error: 'Не все необходимые поля заполнены' });
            }


            const buyer = await Buyer.findByPk(buyer_id);
            if (!buyer) {
                return res.status(400).json({ message: 'Покупатель с указанным ID не найден' });
            }

            const contract = await Contract.create({
                contract_date,
                execution_date,
                buyer_id,
            });
            return res.status(201).json(contract);

        } catch (error) {
            console.error("Ошибка при создании контракта:", error);
            return res
                .status(500)
                .json({ message: "Ошибка при создании контракта", error });
        }
    }

    async getAllWithoutPag(req, res) {
        try {
            const contracts = await Contract.findAll();
            return res.json(contracts);
        } catch {
            console.error('Ошибка при получении контрактов:', error);
            return res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    // 2. Получение всех контрактов с пагинацией
    async getAll(req, res) {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        try {
            const contracts = await Contract.findAndCountAll({
                limit: limit,
                offset: offset,
            });
            return res.json({
                total: contracts.count,
                pages: Math.ceil(contracts.count / limit),
                data: contracts.rows,
            });
        } catch (error) {
            console.error("Ошибка при получении контрактов:", error);
            return res
                .status(500)
                .json({ message: "Ошибка при получении контрактов", error });
        }
    }

    // 3. Сортировка контрактов
    async getSorted(req, res) {
        const { sortBy = "contract_date", order = "ASC", page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        try {
            const contracts = await Contract.findAndCountAll({
                order: [[sortBy, order]],
                offset: offset,
                limit: limit,
            });
            return res.json({
                total: contracts.count,
                pages: Math.ceil(contracts.count / limit),
                data: contracts.rows,
            });
        } catch (error) {
            console.error("Ошибка при получении контрактов:", error);
            return res
                .status(500)
                .json({ message: "Ошибка при получении контрактов", error });
        }
    }

    // 4. Фильтрация контрактов
    async getFiltered(req, res) {
        const { buyer_id, date_from, date_to } = req.query;

        // Создаем объект для условий поиска
        const whereCondition = {};

        if (buyer_id) {
            whereClause.buyer_id = buyer_id;
        }

        if (date_from && date_to) {
            whereClause.contract_date = {
                [Op.between]: [date_from, date_to],
            };
        }

        try {
            const contracts = await Contract.findAll({
                where: whereCondition,
            });
            return res.json(contracts);
        } catch (error) {
            console.error("Ошибка при получении контрактов:", error);
            return res
                .status(500)
                .json({ message: "Ошибка при получении контрактов", error });
        }
    }

    // 5. Поиск контрактов
    async search(req, res) {
        const { search, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        try {
            const dateSearch = new Date(search);
            let whereClause;

            if (!isNaN(dateSearch)) { // Проверяем, является ли dateSearch валидной датой
                whereClause = { contract_date: { [Op.eq]: dateSearch } };
            }

            const contracts = await Contract.findAndCountAll({
                where: whereClause,
                offset: offset,
                limit: limit,
            });
            return res.json({
                total: contracts.count,
                pages: Math.ceil(contracts.count / limit),
                data: contracts.rows,
            });
        } catch (error) {
            console.error("Ошибка при поиске контрактов:", error);
            return res
                .status(500)
                .json({ message: "Ошибка при поиске контрактов", error });
        }
    }

    // 6. Получение котракта по ID
    async getById(req, res) {
        const { id } = req.params;

        try {
            const contract = await Contract.findOne({
                where: { contract_number: id },
            });

            if (!contract) {
                return res.status(404).json({ message: "Контракт не найден" });
            }

            return res.json(contract);
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Ошибка при получении контракта", error });
        }
    }

    // 7. Обновление контракта
    async updateContract(req, res) {
        const { id } = req.params;
        const { execution_date } = req.body;

        try {
            const contract = await Contract.findOne({
                where: { contract_number: id },
            });

            if (!contract) {
                return res.status(404).json({ message: "Контракт не найден" });
            }

            // Обновляем только те поля, которые были переданы
            const updatedFields = {};
            if (execution_date)
                updatedFields.execution_date = execution_date;

            // Если нет никаких полей для обновления, возвращаем ошибку
            if (Object.keys(updatedFields).length === 0) {
                return res.status(400).json({ message: "Нет данных для обновления" });
            }

            // Обновление контракта и возврат обновленного объекта
            const [_, updatedContracts] = await Contract.update(
                updatedFields,
                {
                    where: { contract_number: id },
                    returning: true, // Возвращаем обновленные строки
                }
            );

            // Возвращаем обновленный контракт
            return res.json(updatedContracts[0]);
        } catch (error) {
            console.error("Ошибка при обновлении контракта:", error);
            return res.status(500).json({
                message: "Ошибка при обновлении контракта",
                error: error.message,
            });
        }
    }
    // 8. Удаление контракта
    async deleteContract(req, res) {
        const { id } = req.params;

        try {
            const contract = await Contract.findOne({
                where: { contract_number: id },
            });

            if (!contract) {
                return res.status(404).json({ message: "Контракт не найден" });
            }

            await Contract.destroy({
                where: { contract_number: id },
            });

            return res.status(200).json({ message: "Контракт успешно удален" });
        } catch (error) {
            console.error("Ошибка при удалении контракта:", error);
            return res
                .status(500)
                .json({ message: "Ошибка при удалении контракта", error });
        }
    }
}

module.exports = new ContractController();