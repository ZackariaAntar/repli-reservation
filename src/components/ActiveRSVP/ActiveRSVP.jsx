import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


function ActiveRSVP() {
    const dispatch = useDispatch();
    const user = useSelector((store)=>store.user)
    const rsvpDetails = useSelector((store) => store.activeRsvpDetails)
    const params = useParams();
    const wedding_id = params.id;

   useEffect(() => {
    dispatch({type: "GET_ACTIVE_RSVP", payload: wedding_id}) 
   }, [])

	return <>
<pre>
    {JSON.stringify(rsvpDetails, null, 2)}
</pre>
    
    </>;
}

export default ActiveRSVP;
