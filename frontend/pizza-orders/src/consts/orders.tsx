import { SubItem } from "../types/orders";
import { FaPizzaSlice, FaWineBottle , FaLeaf } from "react-icons/fa"; 

export const typeIcons: Record<SubItem["type"], JSX.Element> = {
  Pizza: <FaPizzaSlice />,
  Drink: <FaWineBottle  />,
  Salad: <FaLeaf />,
};
