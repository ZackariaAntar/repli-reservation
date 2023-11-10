const activeWeddingPosts = (state = [], action) => {
	switch (action.type) {
		case "SET_ACTIVE_WEDDING_POSTS":
			return action.payload;
		default:
			return state;
	}
};

export default activeWeddingPosts;
