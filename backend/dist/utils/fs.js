"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readConfigFile = exports.createConfigFileIfNotExist = void 0;
const fs_1 = __importDefault(require("fs"));
const socket_1 = require("../consts/socket");
let defaultInterval = socket_1.defaultConfig.defaultInterval;
const createConfigFileIfNotExist = () => {
    try {
        if (!fs_1.default.existsSync(socket_1.configFilePath)) {
            fs_1.default.writeFileSync(socket_1.configFilePath, JSON.stringify(socket_1.defaultConfig, null, 2));
        }
    }
    catch (err) {
        console.error("Error creating config file:", err);
    }
};
exports.createConfigFileIfNotExist = createConfigFileIfNotExist;
const readConfigFile = () => {
    try {
        const configFile = fs_1.default.readFileSync(socket_1.configFilePath, "utf-8");
        if (configFile.trim() === "") {
            console.error("Config file is empty, using default interval.");
            fs_1.default.writeFileSync(socket_1.configFilePath, JSON.stringify(socket_1.defaultConfig, null, 2));
        }
        else {
            const config = JSON.parse(configFile);
            if (config.defaultInterval) {
                defaultInterval = config.defaultInterval;
            }
        }
    }
    catch (err) {
        console.error("Error reading config file:", err);
        console.log("Using default interval.");
        fs_1.default.writeFileSync(socket_1.configFilePath, JSON.stringify(socket_1.defaultConfig, null, 2));
    }
};
exports.readConfigFile = readConfigFile;
