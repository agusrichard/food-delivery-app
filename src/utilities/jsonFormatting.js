function jsonFormatting(response, statusCode, params, data) {
  return response.status(statusCode).json({
    ...params,
    data
  })
}

module.exports = jsonFormatting