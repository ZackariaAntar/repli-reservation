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

function ActiveRSVP() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const rsvpDetails = useSelector((store) => store.activeRsvpDetails);
  const meals = useSelector((store) => store.activeWeddingMeals);
  const params = useParams();
  const wedding_id = params.id;

  const [value, setValue] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mealChoice, setMealChoice] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    dispatch({ type: "GET_ACTIVE_RSVP", payload: wedding_id });
  }, []);

  const handleChange = (e) => {
    console.log("in handleChange");
    setValue(e.target.value);
  };

  return (
    <>
      <pre>{JSON.stringify(rsvpDetails, null, 2)}</pre>

      <Container maxWidth="lg">
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
                <FormControl>
                  <FormLabel id="row-radio-buttons-group-label">
                    Can you make this event?
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                  {details.can_plus_one && (
                    <FormLabel id="plus-one">
                      <TextField label="First Name" value={firstName} />
                      <TextField label="Last Name" value={lastName}/>
                      <TextField 
                      select 
                      label="Plus one meal">
                        {meals.map((option) => (
                         <MenuItem key={option.id} value={mealChoice}> 
                         {option.meal_name}
                         </MenuItem>
                        ))}
                    </TextField>
                      <TextField placeholder="hey" />
                    </FormLabel>
                  )}
                </FormControl>
              </Grid>
            </div>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default ActiveRSVP;
