const db = require('../config/db');

const getUserByEmail = async (email) => {
  const res = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return res.rows[0];
};

const createUser = async (name, email, hashedPassword) => {
  return db.one(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
    [name, email, hashedPassword]
  );
};

module.exports = { getUserByEmail, createUser };
