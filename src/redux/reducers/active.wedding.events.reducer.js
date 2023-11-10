const activeWeddingEvents = (state = [], action) => {
	switch (action.type) {
		case "SET_ACTIVE_WEDDING_EVENTS":
			return action.payload;
		default:
			return state;
	}
};

export default activeWeddingEvents;
