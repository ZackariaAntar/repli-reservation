const activeWeddingDetails = (state = [], action) => {
	switch (action.type) {
		case "SET_ACTIVE_WEDDING_DETAILS":
			return action.payload;
		default:
			return state;
	}
};

export default activeWeddingDetails;
