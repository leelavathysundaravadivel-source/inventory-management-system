/**
 * Centralized catch-all Express error handling middleware.
 */
const errorHandler = (err, req, res, next) => {
    console.error(`[Error Handler Exception]: ${err.stack}`);

    const statusCode = err.status || 500;

    res.status(statusCode).json({
        success: false,
        error: {
            status: statusCode,
            message: err.message || "Internal Server Error Handled.",
            timestamp: new Date().toISOString()
        }
    });
};

module.exports = errorHandler;
