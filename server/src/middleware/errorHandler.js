export const errorHandler = (err, req, res, next) => {
  console.error(`[NetMorph API Error] ${err.stack || err.message}`);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "An unexpected system error occurred on the NetMorph server.",
    errorCode: err.errorCode || "SERVER_ERROR",
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {})
  });
};
