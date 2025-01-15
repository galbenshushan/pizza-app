import styled from "styled-components";
import { getStatusColor } from "../utils/colors";
import { useOrders } from "../hooks/useOrders";
import { OrderStatus } from "../enums/general";

const StatusButton = styled.button<{ status: string }>`
  background-color: ${(props) => getStatusColor(props.status)};
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  margin: 4px;
`;
const Filter = () => {
  const { setFilter } = useOrders();
  const statuses = Object.values(OrderStatus);

  const handleStatusClick = (status: string) => setFilter(status);
  return (
    <div>
      <StatusButton status={""} onClick={() => handleStatusClick("")}>
        All
      </StatusButton>
      {statuses.map((status) => (
        <StatusButton
          key={status}
          status={status}
          onClick={() => handleStatusClick(status)}
        >
          {status}
        </StatusButton>
      ))}
    </div>
  );
};

export default Filter;
