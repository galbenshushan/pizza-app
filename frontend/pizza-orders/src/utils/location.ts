import { Location } from "../types/orders";

export const handleShowOnMap = (location: Location) => {
  if (location.lat !== 0 && location.lng !== 0) {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
    window.open(googleMapsUrl);
  }
};
