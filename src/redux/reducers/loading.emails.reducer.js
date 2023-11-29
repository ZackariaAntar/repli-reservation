const loadingEmails = (state = false, action) => {
	switch (action.type) {
		case "SET_LOADING_EMAILS":
			return action.payload;
		default:
			return state;
	}
};

export default loadingEmails;
