import * as db from '../helpers/database'
import crypto from 'crypto';


export async function getAll(limit = 10, page = 1) {
  const offset = (page - 1) * limit
  const query = "SELECT * FROM users LIMIT ? OFFSET ?"
  const data = await db.run_query(query, [limit, offset])
  return data
}

export async function getSearch(s, q) {
  const query = `SELECT ${s} FROM users WHERE ${s} LIKE '%${q}%'`
  const data = await db.run_query(query)
  return data
}

export async function getByUserId(id) {
  const query = "SELECT * FROM users WHERE id=?"
  const values = [id]
  const data = await db.run_query(query, values)
  return data
}


function generateRandomString(length: number): string {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}


export async function add(user) {
  const salt = generateRandomString(32);
  const hash = crypto.pbkdf2Sync(user.password, salt, 1000, 64, 'sha512').toString('hex');
  user.password = hash
  let keys = Object.keys(user)
  let values = Object.values(user)
  keys = keys.join(',')
  let parm = ''
  for (let i = 0; i < values.length; i++) { parm += '?,' }
  parm = parm.slice(0, -1)
  console.log(keys, parm)
  values.push(salt)
  const query = `INSERT INTO users (${keys}, salt) VALUES (${parm}, ?)`
  try {
    await db.run_query(query, values)
    return { "status": 201 }
  } catch (error) {
    return error
  }
}
export async function findByUsername(username) {
  const query = "SELECT * FROM users WHERE username = ?"
  const values = [username]
  const data = await db.run_query(query, values)
  return data
}