import styled from "styled-components";
import { Order, SubItem } from "../../types/orders";
import { handleShowOnMap } from "../../utils/location";
import OrderItem from "./OrderItem";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getStatusColor } from "../../utils/colors";
import { getFormattedTime } from "../../utils/date";
import StyledButton from "../UI/StyledButton";

const OrderCardContainer = styled.div`
  background-color: rgba(250, 51, 51, 0.9);
  border: 1px solid rgb(255, 255, 255);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  color: white;

  &:hover {
    transform: scale(1.02);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OrderTitle = styled.h3`
  color: white;
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0;
`;

const StatusLabel = styled.span<{ statusColor: string }>`
  background-color: ${({ statusColor }) => statusColor};
  padding: 6px 12px;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  text-transform: capitalize;
  display: inline-block;
  margin-left: 12px;
`;

const OrderItemsContainer = styled.div`
  margin-top: 12px;
`;

const LocationIconStyled = styled(LocationOnIcon)`
  font-size: 1.2rem;
`;

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const formattedTime = getFormattedTime(order.orderTime);
  return (
    <OrderCardContainer key={order._id}>
      <OrderHeader>
        <OrderTitle>
          {order.title} {`(${formattedTime})`}
        </OrderTitle>
        <StatusLabel statusColor={getStatusColor(order.status)}>
          {order.status}
        </StatusLabel>
      </OrderHeader>

      <OrderItemsContainer>
        <div style={{ fontSize: "21px" }}>Items:</div>
        {order.subItems.map((orderItem: SubItem, index: number) => (
          <OrderItem orderItem={orderItem} key={index} />
        ))}
      </OrderItemsContainer>
      <StyledButton
        tooltip={`Location: ${order.location.lat}, ${order.location.lng}`}
        onClick={() => handleShowOnMap(order.location)}
        text="Show on Map"
        prefixIcon={<LocationIconStyled />}
      />
    </OrderCardContainer>
  );
};

export default OrderCard;
