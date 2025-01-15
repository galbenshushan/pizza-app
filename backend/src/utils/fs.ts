import fs from "fs";
import { configFilePath, defaultConfig } from "../consts/socket";

let defaultInterval = defaultConfig.defaultInterval;

export const createConfigFileIfNotExist = () => {
  try {
    if (!fs.existsSync(configFilePath)) {
      fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2));
    }
  } catch (err) {
    console.error("Error creating config file:", err);
  }
};

export const readConfigFile = () => {
  try {
    const configFile = fs.readFileSync(configFilePath, "utf-8");

    if (configFile.trim() === "") {
      console.error("Config file is empty, using default interval.");
      fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2));
    } else {
      const config = JSON.parse(configFile);
      if (config.defaultInterval) {
        defaultInterval = config.defaultInterval;
      }
    }
  } catch (err) {
    console.error("Error reading config file:", err);
    console.log("Using default interval.");

    fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2));
  }
};
