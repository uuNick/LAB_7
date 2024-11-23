const express = require('express');
const router = express.Router();
const {Sale} = require('../db');

// CREATE
router.post('/', async (req, res) => {
  try {
    const sale = await Sale.create(req.body);
    res.status(201).json(sale);
  } catch (error) {
    console.error("Error creating sale:", error);
    res.status(500).json({ error: 'Failed to create sale' });
  }
});

// READ (получение всех покупателей)
router.get('/', async (req, res) => {
    try {
        const sales = await Sale.findAll();
        res.json(sales);
    } catch (error) {
        console.error("Error fetching sales:", error);
        res.status(500).json({ error: 'Failed to fetch sales' });
    }
});

// READ (получение одного покупателя по ID)
router.get('/:id', async (req, res) => {
    try {
        const sale = await Sale.findByPk(req.params.id);
        if (!sale) {
            return res.status(404).json({ error: 'sale not found' });
        }
        res.json(sale);
    } catch (error) {
        console.error("Error fetching sale:", error);
        res.status(500).json({ error: 'Failed to fetch sale' });
    }
});


// UPDATE
router.put('/:id', async (req, res) => {
    // ... (реализация UPDATE) ...
});

// DELETE
router.delete('/:id', async (req, res) => {
    // ... (реализация DELETE) ...
});

module.exports = router;