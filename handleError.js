export const handleError = (err) => {
    console.error(err);
    res.status(500).json({
        message: err.message,
    });
}