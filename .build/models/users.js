"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var users_exports = {};
__export(users_exports, {
  add: () => add,
  findByUsername: () => findByUsername,
  getAll: () => getAll,
  getByUserId: () => getByUserId,
  getSearch: () => getSearch
});
module.exports = __toCommonJS(users_exports);
var db = __toESM(require("../helpers/database"));
var import_crypto = __toESM(require("crypto"));
async function getAll(limit = 10, page = 1) {
  const offset = (page - 1) * limit;
  const query = "SELECT * FROM users LIMIT ? OFFSET ?";
  const data = await db.run_query(query, [limit, offset]);
  return data;
}
async function getSearch(s, q) {
  const query = `SELECT ${s} FROM users WHERE ${s} LIKE '%${q}%'`;
  const data = await db.run_query(query);
  return data;
}
async function getByUserId(id) {
  const query = "SELECT * FROM users WHERE id=?";
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
}
function generateRandomString(length) {
  return import_crypto.default.randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length);
}
async function add(user) {
  const salt = generateRandomString(32);
  const hash = import_crypto.default.pbkdf2Sync(user.password, salt, 1e3, 64, "sha512").toString("hex");
  user.password = hash;
  let keys = Object.keys(user);
  let values = Object.values(user);
  keys = keys.join(",");
  let parm = "";
  for (let i = 0; i < values.length; i++) {
    parm += "?,";
  }
  parm = parm.slice(0, -1);
  console.log(keys, parm);
  values.push(salt);
  const query = `INSERT INTO users (${keys}, salt) VALUES (${parm}, ?)`;
  try {
    await db.run_query(query, values);
    return { "status": 201 };
  } catch (error) {
    return error;
  }
}
async function findByUsername(username) {
  const query = "SELECT * FROM users WHERE username = ?";
  const values = [username];
  const data = await db.run_query(query, values);
  return data;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  add,
  findByUsername,
  getAll,
  getByUserId,
  getSearch
});
//# sourceMappingURL=users.js.map
