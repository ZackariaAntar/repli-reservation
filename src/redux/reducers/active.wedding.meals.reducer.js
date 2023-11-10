const activeWeddingMeals = (state = [], action) => {
	switch (action.type) {
		case "SET_ACTIVE_WEDDING_MEALS":
			return action.payload;
		default:
			return state;
	}
};

export default activeWeddingMeals;
