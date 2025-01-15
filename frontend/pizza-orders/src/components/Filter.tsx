import styled from "styled-components";
import { getStatusColor } from "../utils/colors";
import { useOrders } from "../hooks/useOrders";
import { OrderStatus } from "../enums/general";
import { useAppContext } from "../hooks/useAppContext";

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
  const { getText } = useAppContext();

  const statuses = Object.values(OrderStatus);

  const handleStatusClick = (status: string) => setFilter(status);
  return (
    <div>
      <h3>{getText("filterBy")}:</h3>
      <StatusButton status={""} onClick={() => handleStatusClick("")}>
        {getText("All")}
      </StatusButton>
      {statuses.map((status) => (
        <StatusButton
          key={status}
          status={status}
          onClick={() => handleStatusClick(status)}
        >
          {getText(status)}
        </StatusButton>
      ))}
    </div>
  );
};

export default Filter;
