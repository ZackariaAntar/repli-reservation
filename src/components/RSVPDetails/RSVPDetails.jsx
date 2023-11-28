import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import { TextField } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
function RSVPDetails({ meals, rsvpDetails }) {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const dispatchObject = {
    po_first_name: "",
    po_last_name: "",
    po_meal_id: "",
    po_notes: "",
    guest_meal_id: "",
    wedding_id: rsvpDetails.wedding_id,
    guest_id: user.id,
  };

  const [fullForm, setFullForm] = useState(dispatchObject);

  const handleSubmit = () => {
    dispatch({ type: "ADD_RSVP_DETAILS", payload: fullForm });
  };
  return (
    <>
      <Card elevation={3} sx={{ width: "50%", p: "2rem", mt: 6 }}>
        <form>
          <FormLabel>
            <CardContent>
              <Typography variant="h4">Menu</Typography>
              {meals.map((meal) => (
                <div key={meal.id}>
                  <Typography variant="h6">{meal.meal_name}</Typography>
                  <Typography sx={{mb: 2}}>{meal.meal_description}</Typography>
                </div>
              ))}
            </CardContent>
            <InputLabel sx={{ mb: 2 }}> Choose your meal</InputLabel>
            <Select
              value={fullForm.guest_meal_id}
              InputLabelProps={{
                shrink: true,
                fontSize: "2rem",
              }}
              sx={{ width: "45%" }}
              onChange={(e) => {
                setFullForm({
                  ...fullForm,
                  guest_meal_id: e.target.value,
                });
              }}
            >
              {meals.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.meal_name}
                </MenuItem>
              ))}
            </Select>
          </FormLabel>

          <InputLabel sx={{ my: 2 }}>Your plus one's information </InputLabel>
          {rsvpDetails.can_plus_one && (
            <FormLabel id="plus-one" label="Plus One Info">
              <TextField
                label="First Name"
                InputLabelProps={{
                  shrink: true,
                  fontSize: "2rem",
                }}
                sx={{ mb: 2, mr: 2 }}
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
              <InputLabel sx={{ mb: 2 }}>
                {" "}
                Choose your plus one's meal
              </InputLabel>

              <Select
                value={fullForm.po_meal_id}
                sx={{ width: "45%", mb: 2, mr: 2 }}
                onChange={(e) => {
                  setFullForm({
                    ...fullForm,
                    po_meal_id: e.target.value,
                  });
                }}
              >
                {meals.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.meal_name}
                  </MenuItem>
                ))}
              </Select>
<br></br>
              <TextField
              multiline
              fullWidth={15}
              rows={5}
                placeholder="Anything to share about your plus one?"
                value={fullForm.notes}
                onChange={(e) => {
                  setFullForm({
                    ...fullForm,
                    po_notes: e.target.value,
                  });
                }}
              />
              <br></br>
            </FormLabel>
          )}

          <Button
            variant="outlined"
            type="submit"
            onClick={handleSubmit}
            sx={{ mt: 4 }}
          >
            Save
          </Button>
        </form>
      </Card>
    </>
  );
}

export default RSVPDetails;
