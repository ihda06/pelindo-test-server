export const response = (res, data, status = 200, message = "success") => {
  res.status(status).json({
    payload: {
      data: data,
      status: status,
      message: message,
    },
  });
};

export const errResponse = (
  res,
  err = "oops, something went wrong",
  status,
  errors,
  message = "failed"
) => {
  res.status(500).json({
    error: err,
    message: message,
    errors: errors,
    status: status,
  });
};
