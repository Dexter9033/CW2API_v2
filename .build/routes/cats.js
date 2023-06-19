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
  router: () => router
});
module.exports = __toCommonJS(cats_exports);
var import_koa_router = __toESM(require("koa-router"));
var import_koa_bodyparser = __toESM(require("koa-bodyparser"));
var model = __toESM(require("../models/cats"));
const router = new import_koa_router.default({ prefix: "/api/v1/cats" });
const getAll = async (ctx) => {
  const articles = await model.getAll();
  if (articles.length) {
    ctx.body = articles;
  } else {
    ctx.body = {};
  }
};
const getById = async (ctx) => {
  const id = ctx.params.id;
  const article = await model.getById(id);
  if (article.length) {
    ctx.body = article[0];
  } else {
    ctx.status = 404;
  }
};
async function createArticle(ctx) {
  const body = ctx.request.body;
  const result = await model.add(body);
  if (result) {
    ctx.status = 201;
    ctx.body = result;
  }
}
async function deleteArticle(ctx) {
  const id = ctx.params.id;
  const result = await model.deleteById(id);
  if (result) {
    ctx.status = 201;
    ctx.body = `Article with id ${id} deleted`;
  }
}
async function updateArticle(ctx) {
  const body = ctx.request.body;
  const id = ctx.params.id;
  const result = await model.update(body, id);
  if (result) {
    ctx.status = 201;
    ctx.body = `Article with id ${id} updated`;
  }
}
router.get("/", getAll);
router.get("/:id([0-9]{1,})", getById);
router.post("/", (0, import_koa_bodyparser.default)(), createArticle);
router.del("/:id([0-9]{1,})", deleteArticle);
router.put("/:id([0-9]{1,})", (0, import_koa_bodyparser.default)(), updateArticle);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
//# sourceMappingURL=cats.js.map
