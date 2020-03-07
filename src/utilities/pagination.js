const qs = require('qs')
require('dotenv').config()


const paginationParams = (req) => {
  const params = {
    currentPage: parseInt(req.query.page) || 1,
    perPage: parseInt(req.query.limit) || 5,
    search: req.query.search || '',
    sort: req.query.sort || { key: 'id', value: 0 }
  }

  // Create search parameters
  const searchKeys = Object.keys(params.search)
  if (req.query.search) {
    params.search = searchKeys.map((v, i) => {
      return { key: searchKeys[i], value: req.query.search[searchKeys[i]] }
    })
  }

  // Create sort parameters
  const sortKeys = Object.keys(params.sort)
  if (req.query.sort) {
    params.sort = sortKeys.map((v, i) => {
      return { key: sortKeys[i], value: req.query.sort[sortKeys[i]] }
    })[0]
  }

  return params
}


const paginate = (req, route, total, params) => {

  const totalPages = Math.ceil(total / parseInt(params.perPage))

  // Logic test for next page
  if (params.currentPage < totalPages) {
    const query = req.query
    query.page = params.currentPage + 1;
    params.nextPage = process.env.APP_URL.concat(`${route}?${qs.stringify(query)}`)
  } else {
    params.nextPage = null
  }

  // Logic test for previous page
  if (params.currentPage > 1) {
    const query = req.query
    query.page = params.currentPage - 1;
    params.previousPage = process.env.APP_URL.concat(`${route}?${qs.stringify(query)}`)
  } else {
    params.previousPage = null
  }

  const pagination = {
    ...params,
    totalPages,
    totalEntries: total
  }

  return pagination
}


module.exports = { paginationParams, paginate }