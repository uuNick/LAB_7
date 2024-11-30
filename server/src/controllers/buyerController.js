const Buyer = require("../models/Buyer");
const { Op } = require("sequelize");

class BuyerController {
  // 1. Создание новой записи
  async create(req, res) {
    const { buyer_name, buyer_address, buyer_phone } = req.body;

    try {
      const buyer = await Buyer.create({
        buyer_name,
        buyer_address,
        buyer_phone,
      });
      return res.status(201).json(buyer); // 201 Создано
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ошибка при создании покупателя", error });
    }
  }

  async getAllWithoutPag(req, res) {
    try {
      const buyers = await Buyer.findAll();
      return res.json(buyers);
    } catch {
      console.error('Ошибка при получении покупателей:', error);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
  }

  // 2. Получение списка записей с поддержкой пагинации
  async getAll(req, res) {
    const { page = 1, limit = 10 } = req.query; // Параметры пагинации
    const offset = (page - 1) * limit;

    try {
      const buyers = await Buyer.findAndCountAll({
        limit: limit,
        offset: offset,
      });
      return res.json({
        total: buyers.count,
        pages: Math.ceil(buyers.count / limit),
        data: buyers.rows,
      });
    } catch (error) {
      console.error("Ошибка при получении покупателей:", error);
      return res
        .status(500)
        .json({ message: "Ошибка при получении покупателей", error });
    }
  }

  // 3. Получение списка записей с поддержкой сортировки
  async getSorted(req, res) {
    const { sortBy = "buyer_name", order = "ASC" } = req.query;

    try {
      const buyers = await Buyer.findAll({
        order: [[sortBy, order]],
      });
      return res.json(buyers);
    } catch (error) {
      console.error("Ошибка при получении покупателей:", error);
      return res
        .status(500)
        .json({ message: "Ошибка при получении покупателей", error });
    }
  }

  // 4. Получение списка записей с поддержкой фильтрации
  async getFiltered(req, res) {
    const { buyer_address, city } = req.query;

    try {
      if (!buyer_address) {
        return res.status(400).json({ message: "Адрес покупателя не указан" });
      }

      const buyers = await Buyer.findAll({
        //where: { buyer_address.include(city) }, 
      });

      return res.json(buyers);
    } catch (error) {
      console.error("Ошибка при получении покупателей:", error);
      return res
        .status(500)
        .json({ message: "Ошибка при получении покупателей", error });
    }
  }

  // 5. Получение списка записей с поддержкой поиска
  async search(req, res) {
    const { search } = req.query;

    try {
      const buyers = await Buyer.findAll({
        where: {
          [Op.or]: [
            { buyer_name: { [Op.like]: `%${search}%` } },
            { buyer_address: { [Op.like]: `%${search}%` } },
          ],
        },
      });
      return res.json(buyers);
    } catch (error) {
      console.error("Ошибка при поиске покупателей:", error);
      return res
        .status(500)
        .json({ message: "Ошибка при поиске покупателей", error });
    }
  }

  // 6. Получение детальной информации по ID
  async getById(req, res) {
    const { id } = req.params;

    try {
      const buyer = await Buyer.findOne({
        where: { buyer_id: id },
      });

      if (!buyer) {
        return res.status(404).json({ message: "Покупатель не найден" });
      }

      return res.json(buyer);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Ошибка при получении покупателя", error });
    }
  }

  // 7. Обработка случая отсутствия записи
  async checkExistence(req, res) {
    const { id } = req.params;

    try {
      const buyer = await Buyer.findOne({
        where: { buyer_id: id },
      });

      if (!buyer) {
        return res.status(404).json({ message: "Покупатель не найден" });
      }

      return res.status(200).json({ message: "Покупатель существует" });
    } catch (error) {
      return res.status(500).json({
        message: "Ошибка при проверке существования покупателя",
        error,
      });
    }
  }

  // 8. Обновление записи
  async updateBuyer(req, res) {
    const { id } = req.params;
    const { buyer_name, buyer_address, buyer_phone } = req.body;

    try {
      const buyer = await Buyer.findOne({
        where: { buyer_id: id },
      });

      if (!buyer) {
        return res.status(404).json({ message: "Покупатель не найден" });
      }

      await Buyer.update(
        { buyer_name, buyer_address, buyer_phone },
        { where: { buyer_id: id } }
      );

      const updatedBuyer = await Buyer.findOne({
        where: { buyer_id: id },
      });

      return res.json(updatedBuyer);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Ошибка при обновлении покупателя", error });
    }
  }

  // 9. Удаление записи
  async deleteBuyer(req, res) {
    const { id } = req.params;

    try {
      const buyer = await Buyer.findOne({
        where: { buyer_id: id },
      });

      if (!buyer) {
        return res.status(404).json({ message: "Покупатель не найден" });
      }

      await Buyer.destroy({
        where: { buyer_id: id },
      });

      return res.status(204).send(); // 204 Нет содержимого
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Ошибка при удалении покупателя", error });
    }
  }
}

module.exports = new BuyerController();