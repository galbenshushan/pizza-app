import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import logo from "../../assets/logo.png";
import { useAppContext } from "../../hooks/useAppContext";

const SettingsButton = styled(IconButton)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  color: white !important;
  z-index: 1000;
`;

const Logo = styled("img")`
  height: 100px;
  margin-right: 16px;
`;
const Navbar = () => {
  const { setOpenSettings } = useAppContext();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "rgb(250, 51, 51)",
        height: 130,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Toolbar>
        <Logo src={logo} alt="Pizza Logo" />
        <SettingsButton onClick={() => setOpenSettings(true)}>
          <SettingsIcon />
        </SettingsButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
