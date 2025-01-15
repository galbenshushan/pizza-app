import styled from "styled-components";
import { Select, MenuItem, FormControl } from "@mui/material";
import { useOrders } from "../hooks/useOrders";
import { useAppContext } from "../hooks/useAppContext";

const StyledMenuItem = styled(MenuItem)`
  &:hover {
    background-color: rgba(250, 51, 51, 0.2) !important;
  }
`;
const Sort = () => {
  const { sortOption, handleSortChange } = useOrders();
  const { getText } = useAppContext();

  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <h3>{getText("sortBy")}:</h3>

      <Select
        value={sortOption}
        onChange={handleSortChange}
        sx={{ backgroundColor: "white" }}
        variant="outlined"
      >
        <StyledMenuItem value="a-z">{getText("a_z")}</StyledMenuItem>
        <StyledMenuItem value="z-a">{getText("z_a")}</StyledMenuItem>
        <StyledMenuItem value="newsFirst">
          {getText("NewsFirst")}
        </StyledMenuItem>
      </Select>
    </FormControl>
  );
};

export default Sort;
