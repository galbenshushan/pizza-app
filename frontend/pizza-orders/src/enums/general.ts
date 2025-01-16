export enum SocketEvents {
  CONNECT = "connect",
  ORDERS = "orders",
  UPDATE_POLLING_TIME = "updatePollingTime",
  INTERVAL = "interval",
  UPDATE_STATUS = "updateStatus",
}

export enum OrderStatus {
  Received = "Received",
  Preparing = "Preparing",
  Ready = "Ready",
  EnRoute = "EnRoute",
  Delivered = "Delivered",
}

export enum Language {
  English = "en",
  Hebrew = "heb",
}

export enum Direction {
  LTR = "ltr",
  RTL = "rtl",
}