import { Button, Dialog, TextField } from "@mui/material";
import { useAppContext } from "../../hooks/useAppContext";
import { useState } from "react";
import { useOrders } from "../../hooks/useOrders";

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

  return (
    <Dialog open={openSettings} onClose={handleClose}>
      <h3>Settings</h3>
      <div>
        <TextField
          label="Time to get data (ms)"
          type="number"
          fullWidth
          value={newInterval}
          onChange={(e) => setNewInterval(+e.target.value)}
          variant="outlined"
        />
      </div>
      <div>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          OK
        </Button>
      </div>
    </Dialog>
  );
};

export default SettingDialog;
