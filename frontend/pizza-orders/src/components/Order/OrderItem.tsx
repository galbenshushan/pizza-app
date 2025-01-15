import { typeIcons } from "../../consts/orders";
import { useAppContext } from "../../hooks/useAppContext";
import { SubItem } from "../../types/orders";
import styled from "styled-components";
import { getSanitizedTitle } from "../../utils/Strings";

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
  const { processText } = useAppContext();
  const sanitizedTitle = getSanitizedTitle(orderItem.title.toLocaleLowerCase());
  return (
    <OrderItemContainer>
      {typeIcons[orderItem.type]}
      <span>
        {orderItem.amount} {processText(sanitizedTitle)}
      </span>
    </OrderItemContainer>
  );
};

export default OrderItem;
