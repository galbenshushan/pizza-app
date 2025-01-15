import { Button, Dialog, TextField, DialogTitle } from "@mui/material";
import { useAppContext } from "../../hooks/useAppContext";
import { useState } from "react";
import { useOrders } from "../../hooks/useOrders";
import styled from "styled-components";

const StyledButton = styled(Button)`
  color: white !important;
  font-weight: bold;
  text-transform: none;
  background-color: rgb(250, 51, 51) !important;

  &:hover {
    background-color: rgba(250, 51, 51, 0.8) !important;
  }
`;

const DialogFooter = styled.div`
  padding: 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const SettingDialog = () => {
  const { pollingTime, updatePollingTime } = useOrders();
  const { openSettings, setOpenSettings, getText } = useAppContext();
  const [newInterval, setNewInterval] = useState<number>(pollingTime);

  const handleClose = () => {
    setOpenSettings(false);
  };

  const handleSave = () => {
    updatePollingTime(newInterval);
    handleClose();
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(e.target.value))) {
      setNewInterval(Number(e.target.value));
    }
  };

  return (
    <Dialog open={openSettings} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{getText("settings")}</DialogTitle>
      <div style={{ padding: 24 }}>
        <TextField
          label={getText("timeToGetData")}
          fullWidth
          value={newInterval}
          onChange={handleIntervalChange}
          variant="outlined"
        />
      </div>
      <DialogFooter>
        <StyledButton onClick={handleClose} color="primary">
          {getText("cancel")}
        </StyledButton>
        <StyledButton onClick={handleSave} color="primary">
          {getText("ok")}
        </StyledButton>
      </DialogFooter>
    </Dialog>
  );
};

export default SettingDialog;
