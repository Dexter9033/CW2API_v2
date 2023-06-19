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
  router: () => router
});
module.exports = __toCommonJS(users_exports);
var model = __toESM(require("../models/users"));
var import_koa_router = __toESM(require("koa-router"));
var import_koa_bodyparser = __toESM(require("koa-bodyparser"));
var import_auth = __toESM(require("../controllers/auth"));
const prefix = "/api/v1/users";
const router = (0, import_koa_router.default)({ prefix });
async function getAll(ctx, next) {
  const result = await model.getAll(20, 1);
  if (result.length) {
    ctx.body = result;
  }
}
async function getById(ctx) {
  const id = ctx.params.id;
  const result = await model.getByUserId(id);
  if (result.length) {
    ctx.body = result[0];
  }
}
async function createUser(ctx) {
  const body = ctx.request.body;
  const result = await model.add(body);
  if (result) {
    ctx.status = 201;
    ctx.body = result;
  }
}
async function login(ctx) {
  const { id, username, email, avatarurl, role } = ctx.state.user;
  const links = {
    self: `https://${ctx.host}${prefix}/${id}`
  };
  ctx.body = { id, username, email, avatarurl, role, links };
}
router.get("/", getAll);
router.get("/:id([0-9]{1,})", getById);
router.post("/", (0, import_koa_bodyparser.default)(), createUser);
router.post("/login", import_auth.default, login);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
//# sourceMappingURL=users.js.map
