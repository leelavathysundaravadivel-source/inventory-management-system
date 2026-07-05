const inventory = require('../model/inventoryData');

/**
 * 1. Fetch All Items & Handle Query Operations (Search/Filter)
 */
const getAllItems = (req, res, next) => {
    try {
        let results = [...inventory];
        const { name, category, quantity } = req.query;

        // Search query operation: Case-insensitive sub-string match on item name
        if (name) {
            results = results.filter(item =>
                item.name.toLowerCase().includes(name.toLowerCase())
            );
        }

        // Filtering query operation: Match by specific category taxonomy
        if (category) {
            results = results.filter(item =>
                item.category.toLowerCase() === category.toLowerCase()
            );
        }

        // Filtering query operation: Match inventory threshold quantities less than or equal to variable
        if (quantity) {
            const targetQty = parseInt(quantity, 10);
            if (!isNaN(targetQty)) {
                results = results.filter(item => item.quantity <= targetQty);
            }
        }

        res.status(200).json({
            success: true,
            count: results.length,
            data: results
        });
    } catch (error) {
        next(error);
    }
};

// 2. Fetch Single Item by ID
const getItemById = (req, res, next) => {
    try {
        const item = inventory.find(i => i.id === req.params.id);
        if (!item) {
            const error = new Error(`Inventory item with ID ${req.params.id} could not be resolved.`);
            error.status = 404;
            throw error;
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        next(error);
    }
};

/**
 * 3. Add Item to In-Memory Storage Matrix
 */
const createItem = (req, res, next) => {
    try {
        const { name, category, quantity, price } = req.body;

        const newItem = {
            id: Date.now().toString(), // Generate high-entropy runtime string ID
            name: name.trim(),
            category: category.trim(),
            quantity: parseInt(quantity, 10),
            price: parseFloat(price)
        };

        inventory.push(newItem);
        res.status(201).json({ success: true, message: "Item added successfully.", data: newItem });
    } catch (error) {
        next(error);
    }
};

// 4. Update Existing Item
const updateItem = (req, res, next) => {
    try {
        const itemIndex = inventory.findIndex(i => i.id === req.params.id);
        if (itemIndex === -1) {
            const error = new Error(`Inventory item with ID ${req.params.id} does not exist.`);
            error.status = 404;
            throw error;
        }

        const { name, category, quantity, price } = req.body;

        // Mutate the target item attributes array object cleanly in-place
        inventory[itemIndex] = {
            id: req.params.id,
            name: name.trim(),
            category: category.trim(),
            quantity: parseInt(quantity, 10),
            price: parseFloat(price)
        };

        res.status(200).json({
            success: true,
            message: "Inventory item synchronized successfully.",
            data: inventory[itemIndex]
        });
    } catch (error) {
        next(error);
    }
};

// 5. Delete Item from Memory Array Map
const deleteItem = (req, res, next) => {
    try {
        const itemIndex = inventory.findIndex(i => i.id === req.params.id);
        if (itemIndex === -1) {
            const error = new Error(`Inventory item with ID ${req.params.id} does not exist.`);
            error.status = 404;
            throw error;
        }

        // Execute safe array extraction splice operation
        const [deletedItem] = inventory.splice(itemIndex, 1);

        res.status(200).json({
            success: true,
            message: `Item '${deletedItem.name}' successfully purged from runtime data layer.`,
            deletedId: req.params.id
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
};
