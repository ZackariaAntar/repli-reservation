const allMyRSVPs = (state = [], action) => {
	switch (action.type) {
		case "SET_ALL_MY_RSVPS":
			return action.payload;
		default:
			return state;
	}
};

export default allMyRSVPs;
