import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import FormControl from "@mui/material/FormControl/FormControl";
import { FormLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useDispatch, useSelector } from "react-redux";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function UserDashboard() {
  const dispatch = useDispatch()
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const myWeddings = useSelector((store) => store.allMyWeddings);
  const myRSVPs = useSelector((store) => store.allMyRSVPs);

  useEffect(()=>{
    dispatch({type:'GET_ALL_MY_DETAILS', payload: user.id})
  },[]);



  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const now = new Date();

  const limitPast = () => {
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const year = now.getFullYear();

    return `${year}-${month}-${day}`;
  };

  const today = limitPast();
  const [value, setValue] = useState(today);

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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                defaultValue={dayjs(today)}
                views={["year", "month", "day"]}
                disablePast
              ></DateCalendar>
            </LocalizationProvider>

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
