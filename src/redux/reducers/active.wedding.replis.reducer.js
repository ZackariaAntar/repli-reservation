const activeWeddingReplis = (state = [], action) => {
	switch (action.type) {
		case "SET_ACTIVE_WEDDING_REPLIS":
			return action.payload;
		default:
			return state;
	}
};

export default activeWeddingReplis;
