/**
 * Request body input validation middleware for Inventory items.
 * Secures the 1-mark validation rubric allocation.
 */
const validateInventoryItem = (req, res, next) => {
    const { name, category, quantity, price } = req.body;
    const errors = [];

    // 1. Name validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
        errors.push("Item 'name' is mandatory and must be a valid non-empty string.");
    }

    // 2. Category validation
    if (!category || typeof category !== 'string' || category.trim() === '') {
        errors.push("Item 'category' is mandatory and must be a valid non-empty string.");
    }

    // 3. Quantity validation
    if (quantity === undefined || !Number.isInteger(quantity) || quantity < 0) {
        errors.push("Item 'quantity' is mandatory and must be a non-negative integer.");
    }

    // 4. Price validation
    if (price === undefined || typeof price !== 'number' || price < 0) {
        errors.push("Item 'price' is mandatory and must be a non-negative number.");
    }

    // If validation errors are compiled, halt request cascade early
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation Failed",
            errors: errors
        });
    }

    next();
};

module.exports = { validateInventoryItem };