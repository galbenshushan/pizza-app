export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "ready":
      return "#FF0000";
    case "preparing":
      return "#FFC72C";
    case "received":
      return "#7F7F7F";
    case "enroute":
      return "#F4A300";
    case "delivered":
      return "#006747";
    default:
      return "#272727";
  }
};
