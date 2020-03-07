const db = require('../config/db')


const createReview = (userId, itemId, data) => {
  console.log('In models/reviews/createReview')
  
  const query = `
    INSERT INTO item_reviews(user_id, item_id, rating, review)
    VALUES(
      ${db.escape(userId)}, 
      ${db.escape(itemId)},
      ${db.escape(data.rating)},
      ${db.escape(data.review)}
    );
  `

  console.log(query)

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      if (error) reject(error)
      else resolve()
    })
  })
}


const getAllReviews = (params) => {
  const { perPage, currentPage, search, sort } = params

  // Query conditions
  const conditions = `
    ${search && `WHERE ${search.map(v => `${v.key} LIKE '%${v.value}%'`).join(' AND ')}`}
    ORDER BY ${sort.key} ${parseInt(sort.value) === 0 ? 'ASC' : 'DESC'}
    LIMIT ${perPage}
    OFFSET ${(currentPage - 1) * perPage}
  `
  console.log(conditions)

  const selectTotal = `
    SELECT COUNT(*) AS total
    from item_reviews
  `

  const selectReviews = `
    SELECT *
    FROM item_reviews
    ${conditions};
  `

  return new Promise((resolve, reject) => {
    db.query(selectTotal, (error, results, fields) => {
      const total = results[0].total
      db.query(selectReviews, (error, results, fields) => {
        if (error) reject(error)
        resolve({ results, total })
      })
    })
  })
}


const getReviewById = (id) => {
  console.log('In models/reviews/getReviewById')

  const query = `
    SELECT *
    FROM item_reviews
    WHERE id=${db.escape(parseInt(id))};
  `

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      if (error) reject(error)
      if (results.length !== 0) {
        resolve(results[0])
      } else {
        resolve(false)
      } 
    })
  })
}


const updateReview = (id, data) => {
  console.log('In models/reviews/updateReview')

  const query = `
    UPDATE item_reviews
    SET 
      rating=${db.escape(data.rating)},
      review=${db.escape(data.review)}
    WHERE id=${db.escape(parseInt(id))};
  `

  console.log(query)
  
  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      console.log(error)
      if (error) {
        console.log('Inside error')
        reject(error)
      }
      else resolve()
    })
  })
}


const deleteReview = (id) => {
  console.log('In models/reviews/deleteReview')

  const query = `
    DELETE FROM item_reviews
    WHERE id=${db.escape(parseInt(id))};
  `

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
        if (error) reject(error)
        resolve()
      }
    )
  })
}


module.exports = { 
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview
}