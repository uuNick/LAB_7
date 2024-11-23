const express = require('express');
const router = express.Router();
const {FurnitureModel} = require('../db');

// CREATE
router.post('/', async (req, res) => {
  try {
    const furnitureModel = await FurnitureModel.create(req.body);
    res.status(201).json(furnitureModel);
  } catch (error) {
    console.error("Error creating furnitureModel:", error);
    res.status(500).json({ error: 'Failed to create furnitureModel' });
  }
});

// READ (получение всех покупателей)
router.get('/', async (req, res) => {
    try {
        const furnitureModels = await FurnitureModel.findAll();
        res.json(furnitureModels);
    } catch (error) {
        console.error("Error fetching furnitureModels:", error);
        res.status(500).json({ error: 'Failed to fetch furnitureModels' });
    }
});

// READ (получение одного покупателя по ID)
router.get('/:id', async (req, res) => {
    try {
        const furnitureModel = await FurnitureModel.findByPk(req.params.id);
        if (!furnitureModel) {
            return res.status(404).json({ error: 'furnitureModel not found' });
        }
        res.json(furnitureModel);
    } catch (error) {
        console.error("Error fetching furnitureModel:", error);
        res.status(500).json({ error: 'Failed to fetch furnitureModel' });
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