import styled from "styled-components";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
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
      <InputLabel>Sort By</InputLabel>
      <Select
        value={sortOption}
        onChange={handleSortChange}
        label="Sort By"
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
