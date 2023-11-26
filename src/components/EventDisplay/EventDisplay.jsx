import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { TextField } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

function EventDisplay({ rsvpDetails }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const dispatchObject = {
      event_id: '',
      is_attending: '',
      guest_id: user.id,
      wedding_id: ''
    };
    
    const [isAttending, setIsAttending] = useState(dispatchObject);
    
    const handleSubmit = () => {
        console.log({isAttending})
        dispatch({ type: "ADD_IS_ATTENDING", payload: isAttending });
    };
  return (
    <>
      <Button component={Link} to="/user"></Button>
      <Grid item xs={12} sm={12} md={12}>
        {rsvpDetails.map((details) => (
          <div key={details.id}>
            <h5>
              You are invited to the following events for{" "}
              {details.wedding_title}!
            </h5>
            <p>{details.event_name}</p>
            <p>
              {details.event_date} | {details.event_start_time} |{" "}
              {details.event_end_time}
            </p>
            <p>{details.event_street_address}</p>
            <p>
              {details.event_city}, {details.event_state} {details.event_zip}
            </p>
            <p>{details.event_maps_url}</p>
            <Grid item xs={12} sm={12} md={12}>
              <FormLabel id="row-radio-buttons-group-label">
                Can you make this event?
              </FormLabel>
              <Select
                sx={{ width: "25%" }}
                value={isAttending.is_attending}
                onChange={(e) => {
                  setIsAttending({
                    ...isAttending,
                    event_id: details.event_id,
                    is_attending: e.target.value,
                    wedding_id: details.wedding_id
                  });
                }}
                InputLabelProps={{
                  shrink: true,
                  fontSize: "2rem",
                }}
              >
                <MenuItem value={true}> Yes </MenuItem>
                <MenuItem value={false}> No </MenuItem>
              </Select>
              <Button variant="outlined" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </div>
        ))}
      </Grid>
    </>
  );
}

export default EventDisplay;
