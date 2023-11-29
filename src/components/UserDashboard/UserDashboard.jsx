import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import FormControl from "@mui/material/FormControl/FormControl";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { FormLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function UserDashboard() {
  const dispatch = useDispatch();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const myWeddings = useSelector((store) => store.allMyWeddings);
  const myRSVPs = useSelector((store) => store.allMyRSVPs);

  useEffect(() => {
    dispatch({ type: "GET_ALL_MY_DETAILS", payload: user.id });
  }, []);

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

  const [value, setValue] = useState(dayjs(today));

  const weddingData = {
    wedding_photo: "",
    wedding_blurb: "",
    wedding_title: "",
    wedding_date: `${today}`,
    wedding_creator_id: user.id,
    spouse_1: "",
    spouse_2: "",
  };
  const [newWedding, setNewWedding] = useState(weddingData);

  const createNewWedding = () => {
    dispatch({ type: "CREATE_NEW_WEDDING", payload: newWedding });
    setNewWedding(weddingData);
    handleClose();
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItem: "center",
      }}
    >
      <h2>Welcome, {user.first_name}!</h2>

      <Button variant="outlined" sx={{ width: "15%" }} onClick={handleClickOpen}>
        Add Wedding
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <FormControl
          sx={{
            width: "auto",
            mx: 3.5,
            my: 3.5,
          }}
        >
          <TextField
            label="Wedding Title"
            sx={{ mb: 2 }}
            value={newWedding.wedding_title}
            onChange={(e) =>
              setNewWedding({
                ...newWedding,
                wedding_title: e.target.value,
              })
            }
            InputLabelProps={{ shrink: true, fontSize: "2rem" }}
          ></TextField>

          <FormLabel>Wedding Date</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              sx={{
                border: "1px solid lightgrey",
                borderRadius: 1.25,
                mb: 1.75,
                height: "295px",
              }}
              defaultValue={dayjs(today)}
              views={["year", "month", "day"]}
              disablePast
              onChange={(newValue) =>
                setNewWedding({
                  ...newWedding,
                  wedding_date: `${newValue.$y}-${newValue.$M + 1}-${
                    newValue.$D
                  }`,
                })
              }
            ></DateCalendar>
          </LocalizationProvider>

          <TextField
            label="Description"
            multiline
            rows={4}
            maxRows={5}
            sx={{ mb: 2 }}
            value={newWedding.wedding_blurb}
            onChange={(e) =>
              setNewWedding({
                ...newWedding,
                wedding_blurb: e.target.value,
              })
            }
            InputLabelProps={{ shrink: true }}
          ></TextField>

          {/* <FormLabel>Spouse Name</FormLabel> */}
          <TextField
            label="Spouse Name"
            sx={{ mb: 2 }}
            value={newWedding.spouse_1}
            onChange={(e) =>
              setNewWedding({
                ...newWedding,
                spouse_1: e.target.value,
              })
            }
            InputLabelProps={{ shrink: true }}
          ></TextField>

          <TextField
            label="Spouse Name"
            sx={{ mb: 2 }}
            value={newWedding.spouse_2}
            onChange={(e) =>
              setNewWedding({
                ...newWedding,
                spouse_2: e.target.value,
              })
            }
            InputLabelProps={{ shrink: true }}
          ></TextField>

          <Button onClick={createNewWedding}>Submit</Button>
        </FormControl>
      </Dialog>

      <Container>
        {myWeddings.length > 0 && <h4>My Weddings</h4>}
        <Grid container spacing={1}>
          {myWeddings &&
            myWeddings.map((wedding) => (
              <Grid item key={wedding.id} xs={12} sm={12} md={4}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography>{wedding.wedding_title}</Typography>
                    <Typography>{wedding.wedding_date}</Typography>
                    <Typography>{wedding.wedding_blurb}</Typography>
                    <Button
                      component={Link}
                      to={`/wedding-details/${wedding.id}`}
                    >
                      See details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>

      <Container>
        {myRSVPs.length > 0 && <h4>My Invitations</h4>}
        <Grid container spacing={1}>
          {myRSVPs &&
            myRSVPs.map((invite, i) => (
              <Grid item key={i} xs={12} sm={12} md={4}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography>{invite.wedding_title}</Typography>
                    <Typography>{invite.wedding_date}</Typography>
                    <Typography>{invite.wedding_blurb}</Typography>
                    <p>
                      Allowed plus one: {invite.can_plus_one ? "yes" : "no"}
                    </p>
                    {/* more to come */}
                    <Button
                      component={Link}
                      to={`/invitation-details/${invite.wedding_id}`}
                    >
                      See details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Container>
  );
}

// this allows us to use <App /> in index.js
export default UserDashboard;
