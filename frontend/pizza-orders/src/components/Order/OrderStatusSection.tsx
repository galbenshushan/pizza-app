import React, { useState } from "react";
import styled from "styled-components";
import { getStatusColor } from "../../utils/colors";
import { useAppContext } from "../../hooks/useAppContext";
import { useOrders } from "../../hooks/useOrders";
import { OrderStatus } from "../../enums/general";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;
  cursor: pointer;
`;

const StatusLabel = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  padding: 6px 12px;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  text-transform: capitalize;
  display: inline-block;
  margin: 0 8px;
`;

const EditIconStyled = styled(EditIcon)`
  font-size: 16px;
  color: white;
`;

interface OrderStatusSectionProps {
  _id: string;
  status: OrderStatus;
}

const OrderStatusSection: React.FC<OrderStatusSectionProps> = ({
  _id,
  status,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentStatus, setCurrentStatus] = useState(status);
  const { getText } = useAppContext();
  const { updateOrderStatus } = useOrders();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusClick = (newStatus: OrderStatus) => {
    setCurrentStatus(newStatus);
    updateOrderStatus(_id, newStatus);
    handleMenuClose();
  };

  return (
    <>
      <StatusContainer onClick={handleMenuOpen}>
        <StatusLabel color={getStatusColor(currentStatus)}>
          {getText(currentStatus)}
        </StatusLabel>
        <EditIconStyled />
      </StatusContainer>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {Object.values(OrderStatus).map((status) => (
          <MenuItem
            key={status}
            onClick={() => handleStatusClick(status as OrderStatus)}
          >
            {getText(status)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default OrderStatusSection;
