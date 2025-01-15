import styled from "styled-components";
import { Select, MenuItem, FormControl } from "@mui/material";
import { useOrders } from "../hooks/useOrders";

const StyledMenuItem = styled(MenuItem)`
  &:hover {
    background-color: rgba(250, 51, 51, 0.2) !important;
  }
`;
const Sort = () => {
  const { sortOption, handleSortChange } = useOrders();

  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <h3>Sort by:</h3>

      <Select
        value={sortOption}
        onChange={handleSortChange}
        sx={{ backgroundColor: "white" }}
        variant="outlined"
      >
        <StyledMenuItem value="a-z">A-Z</StyledMenuItem>
        <StyledMenuItem value="z-a">Z-A</StyledMenuItem>
        <StyledMenuItem value="newsFirst">News First (By Date)</StyledMenuItem>
      </Select>
    </FormControl>
  );
};

export default Sort;
