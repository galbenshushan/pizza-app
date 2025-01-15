export interface Order {
  _id: string;
  title: string;
  location: Location;
  orderTime: string;
  status: string;
  subItems: SubItem[];
}

export interface Location {
  lat: number;
  lng: number;
}

export interface SubItem {
  title: string;
  amount: number;
  toppings: string[];
  type: string;
}
