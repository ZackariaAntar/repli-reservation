import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Typography  from "@mui/material/Typography";

//////////////////Guest List Form Component/////////////////////

function MealForm({ details }) {
  // hooks for form TextField and dispatch and history for navigation and dispatch to redux store
  // may need to update the naming convention for the hooks depending on how we want to handle the data
  const tf = { mb: 2 };
  const btn = { p: 1.5, width: "51%", mb: 2 };

  const mealData = {
    wedding_id: details.id,
    meal_name: "",
    meal_description: "",
  };

  const dummy = {
    wedding_id: details.id,
    meal_name: "Vegan Bowl",
    meal_description: "A delicious bowl of vegetables and grains with a flavorful sauce."
  }

  const [mealInfo, setMealInfo] = useState(mealData);
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);

  const addMeal = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_NEW_MEAL",
      payload: mealInfo,
    });
    setMealInfo(mealData);
  };

  return (
    <form onSubmit={addMeal}>
      <Button
        variant="outlined"
        sx={btn}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Close" : "Add meal options"}
      </Button>
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" onClick={() => {setMealInfo(dummy)}}>Meal Details</Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <TextField
              sx={tf}
              fullWidth
              value={mealInfo.meal_name}
              id="meal_name"
              label="Meal Name"
              required
              onChange={(e) =>
                setMealInfo({
                  ...mealInfo,
                  meal_name: e.target.value,
                })
              }
            />

            <TextField
              sx={tf}
              fullWidth
              value={mealInfo.meal_description}
              id="meal_description"
              label="Meal Description"
              required
              onChange={(e) =>
                setMealInfo({
                  ...mealInfo,
                  meal_description: e.target.value,
                })
              }
            />

            <Button
              sx={{ mt: 1, p: 1.5, width: "25%" }}
              variant="contained"
              type="submit"
            >
              Add Meal
            </Button>
          </Grid>
        </Grid>
      </Collapse>
    </form>
  );
}

export default MealForm;
