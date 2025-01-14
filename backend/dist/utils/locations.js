"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomLocation = void 0;
const locations_1 = require("../consts/locations");
const getRandomLocation = () => {
    const lat = Math.random() * (locations_1.ISRAEL_BOUNDS.maxLat - locations_1.ISRAEL_BOUNDS.minLat) +
        locations_1.ISRAEL_BOUNDS.minLat;
    const lng = Math.random() * (locations_1.ISRAEL_BOUNDS.maxLng - locations_1.ISRAEL_BOUNDS.minLng) +
        locations_1.ISRAEL_BOUNDS.minLng;
    return { lat, lng };
};
exports.getRandomLocation = getRandomLocation;
