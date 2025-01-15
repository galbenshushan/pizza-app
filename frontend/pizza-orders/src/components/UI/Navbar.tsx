import AppBar from "@mui/material/AppBar";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import ActionToolbar from "./ActionToolbar";

const Logo = styled.img`
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

const StyledAppBar = styled(AppBar)`
  background-color: rgb(250, 51, 51) !important;
  height: 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  direction: ltr;
  padding: 16px;
`;

const Navbar = () => {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Logo src={logo} alt="Pizza Logo" />
        <ActionToolbar />
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;
