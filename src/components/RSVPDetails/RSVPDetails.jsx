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

function RSVPDetails({meals, rsvpDetails}) {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
 
  const dispatchObject = {
    po_first_name: "",
    po_last_name: "",
    po_meal_id: "",
    po_notes: "",
    guest_meal_id: "",
    wedding_id: rsvpDetails.wedding_id,
    guest_id: user.id
  };

  const [fullForm, setFullForm] = useState(dispatchObject);

  const handleSubmit = () => {
    dispatch({ type: "ADD_RSVP_DETAILS", payload: fullForm });};
  return (
      <>
                  <form>
                  <InputLabel>Tell Us About Your Plus One</InputLabel>
                  {rsvpDetails.can_plus_one && (
                    <FormLabel id="plus-one" label="Plus One Info">
                      <TextField
                        label="First Name"
                        InputLabelProps={{
                            shrink: true,
                            fontSize: "2rem",
                        }}
                        value={fullForm.po_first_name}
                        onChange={(e) => {
                          setFullForm({
                            ...fullForm,
                            po_first_name: e.target.value,
                          });
                        }}
                      />
                      <TextField
                        label="Last Name"
                        InputLabelProps={{
                            shrink: true,
                            fontSize: "2rem",
                        }}
                        value={fullForm.po_last_name}
                        onChange={(e) => {
                          setFullForm({
                            ...fullForm,
                            po_last_name: e.target.value,
                          });
                        }}
                      />
                      <InputLabel> Choose your plus one's meal</InputLabel>

                      <Select 
                      value={fullForm.po_meal_id}
                      sx={{width:'25%'}}
                      onChange={(e) => {
                        setFullForm({
                          ...fullForm,
                          po_meal_id: e.target.value,
                        });
                      }}
                      >
                        {meals.map((option) => (
                          <MenuItem
                            key={option.id}
                            value={option.id}
                          >
                            {option.meal_name}
                          </MenuItem>
                        ))}
                      </Select>

                      <TextField
                        placeholder="Any notes?"
                        value={fullForm.notes}
                        onChange={(e) => {
                          setFullForm({
                            ...fullForm,
                            po_notes: e.target.value,
                          });
                        }}
                      />
                    </FormLabel>
                  )}

                  <FormLabel>
                    <InputLabel> Choose your meal</InputLabel>
                    <Select 
                    value={fullForm.guest_meal_id} 
                    InputLabelProps={{
                        shrink: true,
                        fontSize: "2rem",
                    }}
                    sx={{width:'25%'}}
                    onChange={(e) => {
                      setFullForm({
                        ...fullForm,
                        guest_meal_id: e.target.value,
                      });
                    }}
                    >
                      {meals.map((option) => (
                        <MenuItem
                          key={option.id}
                          value={option.id}
                        >
                          {option.meal_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormLabel>
                  
                  <Button variant="outlined" type="submit" onClick={handleSubmit}>
                    {" "}
                    Save{" "}
                  </Button>
                  </form>
                 </>
      )
      
};

export default RSVPDetails;
