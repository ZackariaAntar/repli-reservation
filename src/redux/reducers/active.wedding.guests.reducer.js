const activeWeddingGuests = (state = [], action) => {
	switch (action.type) {
		case "SET_ACTIVE_WEDDING_GUESTS":
			return action.payload;
		default:
			return state;
	}
};

export default activeWeddingGuests;
