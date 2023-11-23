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

import EventDisplay from "../EventDisplay/EventDisplay";
import RSVPDetails from "../RSVPDetails/RSVPDetails";

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

  console.log({ fullForm });



  return (
    <Container maxWidth="lg">
      {rsvpDetails && <EventDisplay rsvpDetails={rsvpDetails} />}
      {rsvpDetails[0] && <RSVPDetails meals={meals} rsvpDetails={rsvpDetails[0]} />}
    </Container>
  );
}

export default ActiveRSVP;
