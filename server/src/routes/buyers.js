const express = require('express');
const router = express.Router();
const {Buyer} = require('../db');

// CREATE
router.post('/', async (req, res) => {
  try {
    const buyer = await Buyer.create(req.body);
    res.status(201).json(buyer);
  } catch (error) {
    console.error("Error creating buyer:", error);
    res.status(500).json({ error: 'Failed to create buyer' });
  }
});

// READ (получение всех покупателей)
router.get('/', async (req, res) => {
    try {
        const buyers = await Buyer.findAll();
        res.json(buyers);
    } catch (error) {
        console.error("Error fetching buyers:", error);
        res.status(500).json({ error: 'Failed to fetch buyers' });
    }
});

// READ (получение одного покупателя по ID)
router.get('/:id', async (req, res) => {
    try {
        const buyer = await Buyer.findByPk(req.params.id);
        if (!buyer) {
            return res.status(404).json({ error: 'Buyer not found' });
        }
        res.json(buyer);
    } catch (error) {
        console.error("Error fetching buyer:", error);
        res.status(500).json({ error: 'Failed to fetch buyer' });
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