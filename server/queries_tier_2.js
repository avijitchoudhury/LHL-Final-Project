const Pool = require('pg').Pool
const pool = new Pool({
  user: 'budget',
  host: 'localhost',
  database: 'finalproject',
  password: 'expense',
  port: 5432,
})


const userVerification = async (email,  password) => {
 const res =  await pool.query(`
    SELECT * FROM users
    WHERE email=$1 AND password_digest=$2;`,[email,password]);
  return res.rows[0]
}

getUsercategories = async(user_id) => {
  try {
   let aa = await pool.query(`SELECT categories.* FROM categories join users on categories.user_id = users.id where categories.user_id=${user_id}`);
   console.log(aa.rows);
   return aa;
  } catch (error) {
    console.error(error);
  }
}

getCategoryTransactions = async(category_id) => {
  try {
   let transactions = await pool.query(`select * from transactions join categories on categories.id = category_id where category_id = ${category_id};`);
   console.log("TESTING TRA", transactions)
   return transactions;
    // return await pool.query(`SELECT * FROM categories`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {userVerification, getUsercategories, getCategoryTransactions}
