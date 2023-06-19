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
var basic_exports = {};
__export(basic_exports, {
  default: () => basic_default
});
module.exports = __toCommonJS(basic_exports);
var import_passport_http = require("passport-http");
var model = __toESM(require("../models/users"));
var import_crypto = __toESM(require("crypto"));
function verifyPassword(user, password) {
  const newpw = import_crypto.default.pbkdf2Sync(password, user.salt, 1e3, 64, "sha512").toString("hex");
  return user.password === newpw;
}
const checkUserAndPass = async (username, password, done) => {
  let result;
  try {
    result = await model.findByUsername(username);
  } catch (error) {
    return done(error);
  }
  if (result.length) {
    const user = result[0];
    if (verifyPassword(user, password)) {
      console.log(`Successfully authenticated user ${username}`);
      return done(null, user);
    } else {
      console.log(`Password incorrect for user ${username}`);
    }
  } else {
    console.log(`No user found with username ${username}`);
  }
  return done(null, false);
};
const strategy = new import_passport_http.BasicStrategy(checkUserAndPass);
var basic_default = strategy;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=basic.js.map
