function jsonFormatting(response, statusCode, params, data) {
  response.status(statusCode).json({
    ...params,
    data
  })
}

function internalErrorResponse(response) {
  response.status(500).json({
    success: false,
    message: 'Internal Server Error'
  })
}

function failedResponse(response, message) {
  response.status(400).json({
    success: false,
    message
  })
}

function successResponse(response, message, data) {
  response.status(200).json({
    success: true,
    message,
    data
  })
}

function notFoundResponse(response) {
  response.status(404).json({
    success: false,
    message: 'Not Found'
  })
}

function unauthorizedResponse(response) {
  response.status(401).json({
    success: false,
    message: 'Unauthorized'
  })
}

module.exports = { 
  jsonFormatting, 
  internalErrorResponse, 
  failedResponse,
  successResponse,
  notFoundResponse,
  unauthorizedResponse
}