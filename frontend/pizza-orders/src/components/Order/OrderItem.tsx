import { typeIcons } from "../../consts/orders";
import { SubItem } from "../../types/orders";
import styled from "styled-components";
interface OrderItemProps {
  orderItem: SubItem;
}

const OrderItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
`;
const OrderItem: React.FC<OrderItemProps> = ({ orderItem }) => {
  return (
    <OrderItemContainer>
      {typeIcons[orderItem.type]}
      <span>
        {orderItem.amount} {orderItem.title}
      </span>
    </OrderItemContainer>
  );
};

export default OrderItem;
