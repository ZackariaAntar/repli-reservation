import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function ActiveRSVP() {
    const dispatch = useDispatch();
    const user = useSelector((store)=>store.user)

	return <>Active RSVP</>;
}

export default ActiveRSVP;
