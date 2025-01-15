"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = exports.configFilePath = void 0;
const path_1 = __importDefault(require("path"));
exports.configFilePath = path_1.default.resolve(__dirname, "../config.json");
exports.defaultConfig = {
    defaultInterval: 5000,
};
