import styled from "styled-components";
import { Order } from "../types/orders";
import { useOrders } from "../hooks/useOrders";
import OrderCard from "../components/Order/OrderCard";
import SettingDialog from "../components/Settings/SettingDialog";
import Sort from "../components/Sort";
import Filter from "../components/Filter";
import { useAppContext } from "../hooks/useAppContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 20px;
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin: 0 auto;
`;

const HeaderTitle = styled.h1`
  font-size: 42px;
`;

const Main = () => {
  const { sortedOrders } = useOrders();
  const { getText } = useAppContext();

  return (
    <Container>
      <HeaderTitle>{getText("orders")}</HeaderTitle>
      <Filter />
      <Sort />
      <OrderList>
        {sortedOrders.map((order: Order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </OrderList>

      <SettingDialog />
    </Container>
  );
};

export default Main;
