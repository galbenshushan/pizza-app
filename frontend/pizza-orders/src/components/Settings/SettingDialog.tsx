import { Button, Dialog, TextField, DialogTitle } from "@mui/material";
import { useAppContext } from "../../hooks/useAppContext";
import { useState } from "react";
import { useOrders } from "../../hooks/useOrders";
import styled from "styled-components";

const StyledButton = styled(Button)`
  color: white !important;
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
  const { openSettings, setOpenSettings } = useAppContext();
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
      <DialogTitle>Settings</DialogTitle>
      <div style={{ padding: 24 }}>
        <TextField
          label="Time to get data (ms)"
          fullWidth
          value={newInterval}
          onChange={handleIntervalChange}
          variant="outlined"
        />
      </div>
      <DialogFooter>
        <StyledButton onClick={handleClose} color="primary">
          Cancel
        </StyledButton>
        <StyledButton onClick={handleSave} color="primary">
          Ok
        </StyledButton>
      </DialogFooter>
    </Dialog>
  );
};

export default SettingDialog;
