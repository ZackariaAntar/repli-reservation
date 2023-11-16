const activeRsvpDetails = (state = [], action) => {
	switch (action.type) {
		case "SET_ACTIVE_RSVP_DETAILS":
			return action.payload;
		default:
			return state;
	}
};

export default activeRsvpDetails;