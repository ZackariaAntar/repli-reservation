import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function EventDisplay({ details }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const dispatchObject = {
    event_id: "",
    is_attending: "",
    guest_id: user.id,
    wedding_id: "",
  };

  const [isAttending, setIsAttending] = useState(dispatchObject);

  const handleSubmit = () => {
    console.log({ isAttending });
    dispatch({ type: "ADD_IS_ATTENDING", payload: isAttending });
  };
  return (
    <>
      
        <Card
          elevation={3}
          sx={{ width: "50%", p: 4, my: 2 }}
          //   sx={{  }}
          key={details.id}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mr: 5
            }}
          >
            <CardContent sx={{ textAlign: "left", mt: -3 }}>
              <Typography mb paragraph variant="h6">
                {details.event_name}
              </Typography>
              <Typography mb paragraph>
                {`${details.event_date} | ${details.event_start_time} -
              ${details.event_end_time}`}
              </Typography>

              <Typography mb paragraph>
                {details.event_street_address}
              </Typography>

              <Typography mb paragraph>
                {details.event_city}, {details.event_state} {details.event_zip}
              </Typography>
            </CardContent>
            <CardContent
              sx={{
                mb: -6,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <div>
                <FormLabel id="row-radio-buttons-group-label">
                  Can you make this event?
                </FormLabel>
                <Select
                  sx={{ alignSelf: "left", width: "50%", my: 2 }}
                  value={isAttending.is_attending}
                  onChange={(e) => {
                    setIsAttending({
                      ...isAttending,
                      event_id: details.event_id,
                      is_attending: e.target.value,
                      wedding_id: details.wedding_id,
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
              </div>
              <Button
                variant="outlined"
                type="submit"
                onClick={handleSubmit}
                sx={{ mb: -3, alignSelf: "left", width: "25%" }}
              >
                RSVP
              </Button>
            </CardContent>
          </CardContent>
        </Card>
    </>
  );
}

export default EventDisplay;
