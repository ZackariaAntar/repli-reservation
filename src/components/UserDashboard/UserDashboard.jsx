import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import FormControl from "@mui/material/FormControl/FormControl";
import { FormLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";

function UserDashboard() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="container">
        <h2>Welcome, {user.username}!</h2>
      </div>

      <div>
        <Button onClick={handleClickOpen}>Add Wedding</Button>
        <Dialog open={open} onClose={handleClose}>
          <FormControl>
            <FormLabel>Wedding Title</FormLabel>
            <TextField></TextField>

            <FormLabel>Date</FormLabel>
            <TextField></TextField>

            <FormLabel>Description</FormLabel>
            <TextField></TextField>

            <FormLabel>Spouse Name</FormLabel>
            <TextField></TextField>

            <FormLabel>Spouse Name</FormLabel>
            <TextField></TextField>

            <Button>Submit</Button>
          </FormControl>
        </Dialog>
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserDashboard;
