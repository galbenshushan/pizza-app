import { ISRAEL_BOUNDS } from "../consts/locations";

export const getRandomLocation = () => {
    const lat =
      Math.random() * (ISRAEL_BOUNDS.maxLat - ISRAEL_BOUNDS.minLat) +
      ISRAEL_BOUNDS.minLat;
    const lng =
      Math.random() * (ISRAEL_BOUNDS.maxLng - ISRAEL_BOUNDS.minLng) +
      ISRAEL_BOUNDS.minLng;
    return { lat, lng };
  };