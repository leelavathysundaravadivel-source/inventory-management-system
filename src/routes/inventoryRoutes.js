const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { validateInventoryItem } = require('../middleware/validation');

// Map endpoints cleanly to separate out application controllers routing structures
router.route('/')
    .get(inventoryController.getAllItems)
    .post(validateInventoryItem, inventoryController.createItem);

router.route('/:id')
    .get(inventoryController.getItemById)
    .put(validateInventoryItem, inventoryController.updateItem)
    .delete(inventoryController.deleteItem);

module.exports = router;