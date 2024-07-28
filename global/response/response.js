exports.response = async (res, httpCode, result) => {
  try {
    res.status(httpCode).send(result);
  } catch (error) {
    console.log(error);
  }
};
