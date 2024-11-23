const express = require('express');
const router = express.Router();
const {Contract} = require('../db');

// CREATE
router.post('/', async (req, res) => {
  try {
    const contract = await Contract.create(req.body);
    res.status(201).json(contract);
  } catch (error) {
    console.error("Error creating contract:", error);
    res.status(500).json({ error: 'Failed to create contract' });
  }
});

// READ (получение всех покупателей)
router.get('/', async (req, res) => {
    try {
        const contracts = await Contract.findAll();
        res.json(contracts);
    } catch (error) {
        console.error("Error fetching contracts:", error);
        res.status(500).json({ error: 'Failed to fetch contracts' });
    }
});

// READ (получение одного покупателя по ID)
router.get('/:id', async (req, res) => {
    try {
        const contract = await Contract.findByPk(req.params.id);
        if (!contract) {
            return res.status(404).json({ error: 'contract not found' });
        }
        res.json(contract);
    } catch (error) {
        console.error("Error fetching contract:", error);
        res.status(500).json({ error: 'Failed to fetch contract' });
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