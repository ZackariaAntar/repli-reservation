const relationships = (
	state = [
		{ id: 1, category: "Family" },
		{ id: 2, category: "Friend" },
		{ id: 3, category: "Family Friend" },
		{ id: 4, category: "Wedding Party" },
	],
	action
) => {
	switch (action.type) {
		case "SET_RELATIONSHIPS":
			return action.payload;
		default:
			return state;
	}
};

export default relationships;
