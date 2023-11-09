const allMyWeddings = (state = [], action) => {
	switch (action.type) {
		case "SET_ALL_MY_WEDDINGS":
			return action.payload;
		default:
			return state;
	}
};

export default allMyWeddings;
