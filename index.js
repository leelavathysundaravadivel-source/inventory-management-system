require('dotenv').config();
const express = require('express');
const cors = require('cors');
const inventoryRoutes = require('./src/routes/inventoryRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// Global Middleware Orchestration Layer
// ==========================================
app.use(cors());
app.use(express.json()); // Essential body parser processing node

// Base health verification endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: "UP", runtime: "NodeJS Environment Running" });
});

// Register modular REST API routing components
app.use('/api/inventory', inventoryRoutes);

// Fallback error trap mapping handling mismatched paths (404 Route Not Found)
app.use((req, res, next) => {
    const error = new Error(`The requested URI resource handler '${req.originalUrl}' does not exist.`);
    error.status = 404;
    next(error);
});

// Centralized evaluation system processing handling errors mapping
app.use(errorHandler);

// Boot server instance endpoint
app.listen(PORT, () => {
    console.log(`[Inventory Server Active]: Operational on port ${PORT} within '${process.env.NODE_ENV}' context layout.`);
});