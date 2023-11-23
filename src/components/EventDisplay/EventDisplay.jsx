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

function EventDisplay({rsvpDetails}) {
  const dispatch = useDispatch();
  const dispatchObject = {
    event_id: "",
    is_attending: true,
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
                  <RadioGroup
                    row
                    aria-labelledby="row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue="false"
                  >
                    <FormControlLabel
                      value={true}
                      control={
                        <Radio
                          onChange={(e) => {
                            dispatch({ type: "ADD_RSVP_DETAILS", payload: {event_id: event.id, is_attending: e.target.value}});
                          }}
                        />
                      }
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={
                        <Radio
                          onChange={(e) => {
                            dispatch({ type: "ADD_RSVP_DETAILS", payload: {event_id: event.id, is_attending: e.target.value}});
                          }}
                        />
                      }
                      label="No"
                    />
                  </RadioGroup>
              </Grid>
            </div>
          ))}
        </Grid>
        </>
  );
}

export default EventDisplay;
