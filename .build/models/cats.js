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
var cats_exports = {};
__export(cats_exports, {
  add: () => add,
  deleteById: () => deleteById,
  getAll: () => getAll,
  getById: () => getById,
  update: () => update
});
module.exports = __toCommonJS(cats_exports);
var db = __toESM(require("../helpers/database"));
async function getAll(page, limit, order) {
  const query = "SELECT * FROM cats";
  const data = await db.run_query(query);
  return data;
}
async function getById(id) {
  const query = "SELECT * FROM cats WHERE id = ?";
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
}
async function deleteById(id) {
  const query = "DELETE FROM cats WHERE id = ?";
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
}
async function add(article) {
  let keys = Object.keys(article);
  const values = Object.values(article);
  keys = keys.join(",");
  let parm = "";
  for (let i = 0; i < values.length; i++) {
    parm += "?,";
  }
  parm = parm.slice(0, -1);
  const query = `INSERT INTO cats (${keys}) VALUES (${parm})`;
  try {
    await db.run_query(query, values);
    return { "status": 201 };
  } catch (error) {
    return error;
  }
}
async function update(article, id) {
  let keys = Object.keys(article);
  const values = Object.values(article);
  let updateString = "";
  for (let i = 0; i < values.length; i++) {
    updateString += keys[i] + "='" + values[i] + "',";
  }
  updateString = updateString.slice(0, -1);
  const query = `UPDATE cats SET ${updateString} WHERE id=${id} RETURNING *`;
  try {
    await db.run_query(query, values);
    return { "status": 201 };
  } catch (error) {
    return error;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  add,
  deleteById,
  getAll,
  getById,
  update
});
//# sourceMappingURL=cats.js.map
