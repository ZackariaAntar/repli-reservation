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

function ActiveRSVP() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const rsvpDetails = useSelector((store) => store.activeRsvpDetails);
  const meals = useSelector((store) => store.activeWeddingMeals);
  const params = useParams();
  const wedding_id = params.id;
  const dispatchObject = {
    event_id: "",
    po_first_name: "",
    po_last_name: "",
    po_meal_id: "",
    po_notes: "",
    guest_meal_id: "",
    is_attending: true,
  };

  const [fullForm, setFullForm] = useState(dispatchObject);

  useEffect(() => {
    dispatch({ type: "GET_ACTIVE_RSVP", payload: wedding_id });
    dispatch({ type: "GET_ACTIVE_WEDDING_DETAILS", payload: wedding_id });
  }, []);

  const handleSubmit = (e) => {
    console.log("in handlesubmit");
    dispatch({ type: "", payload: fullForm });
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
                <form onSubmit={handleSubmit}>
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
                      control={<Radio 
                        onChange={(e) => {
                          setFullForm({
                            ...fullForm,
                            is_attending: e.target.value,
                          })}} />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio 
                        onChange={(e) => {
                          setFullForm({
                            ...fullForm,
                            is_attending: e.target.value,
                          })}} />}
                      label="No"
                    />
                  </RadioGroup>
                  Plus One Info
                  {details.can_plus_one && (
                    <FormLabel id="plus-one" label="Plus One Info">
                      <TextField 
                      label="First Name" 
                      value={fullForm.po_first_name} 
                        onChange={(e) => {
                          setFullForm({
                            ...fullForm,
                            po_first_name: e.target.value,
                          })}} />
                      <TextField 
                      label="Last Name" 
                      value={fullForm.po_last_name} 
                      onChange={(e) => {
                        setFullForm({
                          ...fullForm,
                          po_last_name: e.target.value,
                        })}} />
                      <Select 
                      label="Plus One Meal"
                      onChange={(e) => {
                        setFullForm({
                          ...fullForm,
                          po_meal_id: e.target.value,
                        })}} >
                        {meals.map((option) => (
                          <MenuItem 
                          key={option.id} 
                          value={fullForm.po_meal_id} 
                      >
                            {option.meal_name}
                          </MenuItem>
                        ))}
                      </Select>
                      <TextField 
                      placeholder="Notes" 
                      value={fullForm.notes}
                      onChange={(e) => {
                        setFullForm({
                          ...fullForm,
                          notes: e.target.value,
                        })}}  />
                    </FormLabel>
                  )}
                  <FormLabel>
                    <Select notched={true} value={fullForm.guest_meal_id} label="Meal">
                      <InputLabel> Choose your meal</InputLabel>
                      {meals.map((option) => (
                        <MenuItem key={option.id} value={fullForm.guest_meal_id}>
                          {option.meal_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormLabel>
                  <Button variant="outlined" type="submit">
                    {" "}
                    Save{" "}
                  </Button>
                </form>
              </Grid>
            </div>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default ActiveRSVP;
