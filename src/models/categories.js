const db = require('../config/db')


const createCategory = (name) => {
  console.log('Inside models/categories/createCategory')

  const query = `
    INSERT INTO item_categories(name)
    VALUES(${db.escape(name)});
  `

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      console.log(results)
      if (error) reject(error)
      else resolve()
    })
  })
}


const getAllCategories = () => {
  console.log('Inside models/categories/getAllCategories')

  const query = `
    SELECT *
    FROM item_categories
  `
  console.log(query)

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      if (error) reject(error)
      else resolve(results)
    })
  })
}


const getCategoryById = (id) => {
  console.log('Inside models/categories/getCategoryById')

  const query = `
    SELECT *
    FROM items
    WHERE category_id=${db.escape(id)}
  `

  console.log(query)

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      console.log(error)
      console.log(results)
      if (error) reject(error)
      else resolve(results)
    })
  })
}

const getCategoryByName = (name) => {
  console.log('Inside models/categories/getCategoryByName')

  const query = `
    SELECT *
    FROM item_categories
    WHERE name=${db.escape(name)}
  `

  console.log(query)

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      console.log(results[0])
      if (error) reject(error)
      else resolve(results[0])
    })
  })
}


module.exports= { 
  createCategory, 
  getAllCategories, 
  getCategoryById, 
  getCategoryByName 
}