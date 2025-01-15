import { OrderStatus } from "../enums/general";
import { Document } from "mongoose";

export interface Location {
  lat: number;
  lng: number;
}
export interface SubItem {
  title: string;
  amount: number;
  type: string;
  toppings?: string[];
}

export interface Order extends Document {
  title: string;
  location: Location;
  orderTime: Date;
  status: OrderStatus;
  subItems: SubItem[];
}
