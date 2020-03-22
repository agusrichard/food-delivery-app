const db = require('../config/db')
const { paginationParams } = require('../utilities/pagination')


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
      console.log(error)
      if (error) reject(error)
      else resolve()
    })
  })
}


const getAllReviews = (req) => {
  const { conditions, paginate } = paginationParams(req)

  return new Promise((resolve, reject) => {
    db.query(
      `SELECT COUNT(*) AS total
      from item_reviews
      ${conditions}`,
      (error, results, fields) => {
        const total = results[0].total
        db.query(
          `SELECT *
           FROM item_reviews
           ${conditions}
           ${paginate};`,
           (error, results, fields) => {
             if (error) reject(error)
             resolve({ results, total })
           }
        )
      }
    )
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
      console.log(error)
      if (error) reject(error)
      resolve()
    })
  })
}

const getReviewByItemId = (itemId) => {
  console.log('In models/reviews/getReviewById')

  const query = `
    SELECT *
    FROM item_reviews
    LEFT JOIN users
    ON item_reviews.user_id = users.id
    WHERE item_id=${db.escape(parseInt(itemId))};
  `

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      console.log(results)
      if (error) reject(error)
      else resolve(results)
    })
  })
} 


module.exports = { 
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  getReviewByItemId
}