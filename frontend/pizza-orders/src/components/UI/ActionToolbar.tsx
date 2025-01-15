import styled from "styled-components";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAppContext } from "../../hooks/useAppContext";
import { useState } from "react";
import FlagOfIsrael from "../../assets/Flag_of_Israel.svg";
import FlagOfUsa from "../../assets/Flag_of_the_United_States.svg";

const SettingsButton = styled(IconButton)`
  color: white !important;
  z-index: 1000;
`;

const FlagButton = styled(IconButton)`
  color: white !important;
  margin-left: 16px;
`;

const Image = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid white;
`;

const ActionToolbar = () => {
  const { setOpenSettings, isRtl, setIsRtl } = useAppContext();
  const [flag, setFlag] = useState(isRtl ? FlagOfIsrael : FlagOfUsa);

  const toggleFlag = () => {
    const newRtlState = !isRtl;
    setIsRtl(newRtlState);
    setFlag(newRtlState ? FlagOfIsrael : FlagOfUsa);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        flexDirection: "row-reverse",
      }}
    >
      <FlagButton onClick={toggleFlag}>
        <Image src={flag} alt="Flag" />
      </FlagButton>
      <SettingsButton onClick={() => setOpenSettings(true)}>
        <SettingsIcon />
      </SettingsButton>
    </div>
  );
};

export default ActionToolbar;
