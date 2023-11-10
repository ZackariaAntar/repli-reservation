const ChangeMe = (state = [], action) => {
	switch (action.type) {
		case "SET_":
			return action.payload;
		default:
			return state;
	}
};

export default ChangeMe;
