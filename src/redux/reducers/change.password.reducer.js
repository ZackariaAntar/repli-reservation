const changePassword = (state = {change:false}, action) => {
	switch (action.type) {
		case "SET_CHANGE_PASSWORD":
			return action.payload;
		default:
			return state;
	}
};

export default changePassword;
