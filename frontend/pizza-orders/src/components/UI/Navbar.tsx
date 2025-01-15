import AppBar from "@mui/material/AppBar";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import ActionToolbar from "./ActionToolbar";

const Logo = styled("img")`
  height: 100px;
  margin-right: 16px;
`;

const StyledToolbar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;

const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "rgb(250, 51, 51)",
        height: 130,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <StyledToolbar>
        <Logo src={logo} alt="Pizza Logo" />
        <ActionToolbar />
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
