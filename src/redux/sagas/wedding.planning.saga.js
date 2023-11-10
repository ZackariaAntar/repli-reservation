import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* getActiveWeddingDetails(action) {
	console.log(
		`------ in getActiveWeddingDetails() on weddingPlanningSaga\naction.payload is wedding_id for the clicked on: ${action.payload}`
	);
	try {
		const activeWedding = yield axios.get(`/api/wedding/active_details/${action.payload}`);
		console.log(
			"result.rows returned from getActiveWeddingDetails()",
			activeWedding.data
		);
		yield put({
			type: "SET_ACTIVE_WEDDING_DETAILS",
			payload: activeWedding.data,
		});
		// Scaffolding the ACTIVE WEDDING data waterfall.
		// yield put({type:'GET_ACTIVE_WEDDING_EVENTS', payload: action.payload}) // payload should be ACTIVE WEDDING wedding_id
		// yield put({
		// 	type: "GET_ACTIVE_WEDDING_GUESTS",
		// 	payload: action.payload,
		// }); // payload should be ACTIVE WEDDING wedding_id
		// yield put({type:'GET_ACTIVE_WEDDING_MEALS', payload: action.payload}) // payload should be ACTIVE WEDDING wedding_id
		// yield put({type:'GET_ACTIVE_WEDDING_POSTS', payload: action.payload}) // payload should be ACTIVE WEDDING wedding_id
		// yield put({type:'GET_ACTIVE_WEDDING_REPLIS', payload: action.payload}) // payload should be ACTIVE WEDDING wedding_id
	} catch (error) {
		console.log("getActiveWeddingDetails() FAILED", error);
	}
}

// worker Saga: will be fired on "GET_ACTIVE_WEDDING_EVENTS" actions
function* getActiveEvents(action) {
	console.log(
		`------ in getActiveEvents() on weddingPlanningSaga\naction.payload is the specified wedding_id: ${action.payload}`
	);
	try {
		const activeEvents = yield axios.get(`/api/wedding/active_events/${action.payload}`);
		console.log(
			"result.rows returned from getActiveEvents()",
			activeEvents.data
		);
		yield put({
			type: "SET_ACTIVE_WEDDING_EVENTS",
			payload: activeEvents.data,
		});
	} catch (error) {
		console.log("getActiveEvents() FAILED", error);
	}
}

// worker Saga: will be fired on "GET_ACTIVE_WEDDING_GUESTS" actions
function* getActiveGuestList(action) {
	console.log(
		`------ in getActiveGuestList() on weddingPlanningSaga\naction.payload is the specified wedding_id: ${action.payload}`
	);
	try {
		const activeGuests = yield axios.get(`/api/wedding/active_guests/${action.payload}`);
		console.log(
			"result.rows returned from getActiveGuestList()",
			activeGuests.data
		);
		yield put({
			type: "SET_ACTIVE_WEDDING_GUESTS",
			payload: activeGuests.data,
		});
	} catch (error) {
		console.log("getActiveGuestList() FAILED", error);
	}
}

// worker Saga: will be fired on "GET_ACTIVE_WEDDING_MEALS" actions
function* getActiveMeals(action) {
	console.log(
		`------ in getActiveMeals() on weddingPlanningSaga\naction.payload is the specified wedding_id: ${action.payload}`
	);
	try {
		const activeMeals = yield axios.get(`/api/wedding/active_meals/${action.payload}`);
		console.log(
			"result.rows returned from getActiveMeals()",
			activeMeals.data
		);
		yield put({
			type: "SET_ACTIVE_WEDDING_MEALS",
			payload: activeMeals.data,
		});
	} catch (error) {
		console.log("getActiveMeals() FAILED", error);
	}
}

// worker Saga: will be fired on "GET_ACTIVE_WEDDING_POSTS" actions
function* getActivePosts(action) {
	console.log(
		`------ in getActivePosts() on weddingPlanningSaga\naction.payload is the specified wedding_id: ${action.payload}`
	);
	try {
		const activePosts = yield axios.get(`/api/wedding/active_posts/${action.payload}`);
		console.log(
			"result.rows returned from getActivePosts()",
			activePosts.data
		);
		yield put({
			type: "SET_ACTIVE_WEDDING_POSTS",
			payload: activePosts.data,
		});
	} catch (error) {
		console.log("getActivePosts() FAILED", error);
	}
}

// worker Saga: will be fired on "GET_ACTIVE_WEDDING_REPLIS" actions
function* getActiveReplis(action) {
	console.log(
		`------ in getActiveReplis() on weddingPlanningSaga\naction.payload is the specified wedding_id: ${action.payload}`
	);
	try {
		const activeReplis = yield axios.get(`/api/wedding/active_replis/${action.payload}`);
		console.log(
			"result.rows returned from getActiveReplis()",
			activeReplis.data
		);
		yield put({
			type: "SET_ACTIVE_WEDDING_REPLIS",
			payload: activeReplis.data,
		});
	} catch (error) {
		console.log("getActiveReplis() FAILED", error);
	}
}

function* createNewWedding(action){
	console.log(
		`------ in createNewWedding() on weddingPlanningSaga\naction.payload is: ${action.payload}, wedding_creator_id is user.id`
	);
	try {
		yield axios.post("/api/wedding/new_wedding", action.payload);
		console.log(
			"wedding_creator_id used in GET_ALL_MY_DETAILS",
			action.payload.wedding_creator_id
		);
		yield put({
			type: "GET_ALL_MY_DETAILS",
			payload: action.payload.wedding_creator_id,
		});

	} catch (error) {
		console.log("createNewWedding() FAILED", error);

	}
}


function* addToActiveGuestList(action) {
	console.log(
		`------ in addToActiveGuestList() on weddingPlanningSaga\naction.payload is:`, action.payload
	);
	const weddingTitle = action.payload.wedding_title.replace(/ /g, '')

	function makeid(title, length) {
		let result = title;
		const characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		const charactersLength = characters.length;
		let counter = 0;
		while (counter < length) {
			result += characters.charAt(
				Math.floor(Math.random() * charactersLength)
			);
			counter += 1;
		}
		return result
	}
	action.payload.password = makeid(weddingTitle, 5)

	try {
		//Just scaffolding for now, not sure how this is all coming together yet :D
		yield axios.post("/api/user/invited_guest", action.payload);
		console.log(
			"wedding_id used in getActiveGuestList",
			action.payload.wedding_id
		);
		yield put({
			type: "GET_ACTIVE_WEDDING_GUESTS",
			payload: action.payload.wedding_id,
		});
	} catch (error) {
		console.log("addToActiveGuestList() FAILED", error);
	}
}

function* weddingPlanningSaga() {
    // GETS
	yield takeLatest("GET_ACTIVE_WEDDING_DETAILS", getActiveWeddingDetails);
	yield takeLatest("GET_ACTIVE_WEDDING_EVENTS", getActiveEvents );
	yield takeLatest("GET_ACTIVE_WEDDING_GUESTS", getActiveGuestList);
	yield takeLatest("GET_ACTIVE_WEDDING_MEALS", getActiveMeals );
	yield takeLatest("GET_ACTIVE_WEDDING_POSTS", getActivePosts );
	yield takeLatest("GET_ACTIVE_WEDDING_REPLIS", getActiveReplis );

    // POSTS
	yield takeLatest("CREATE_NEW_WEDDING", createNewWedding);
	yield takeLatest("ADD_GUEST_TO_LIST", addToActiveGuestList);

    // UPDATES

    // DELETES
}

export default weddingPlanningSaga;
