import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// worker Saga: will be fired on "ADD_GUESTS_TO_EVENT" actions
function* addNewEventSaga(action) {
	console.log(
		"Arrived at addNewEventSaga() on actionsSaga.\n action.payload:",
		action.payload
	);

	try {
		yield axios.post("/api/actions/event", action.payload);
		yield put({ type: "GET_ACTIVE_WEDDING_EVENTS", payload: action.payload.wedding_id });
	} catch (error) {
		console.log("Error with addNewEventSaga():", error);
	}
}
function* addNewAnnouncementSaga(action) {
	console.log(
		"Arrived at addNewAnnouncementSaga() on actionsSaga.\n action.payload:",
		action.payload
	);

	try {
		yield axios.post("/api/actions/announcement", action.payload);
		yield put({ type: "GET_ACTIVE_WEDDING_POSTS", payload: action.payload.wedding_id});
	} catch (error) {
		console.log("Error with addNewAnnouncementSaga():", error);
	}
}
function* addNewMealSaga(action) {
	console.log(
		"Arrived at addNewMealSaga() on actionsSaga.\n action.payload:",
		action.payload
	);

	try {
		yield axios.post("/api/actions/meal", action.payload);
		yield put({ type: "GET_ACTIVE_WEDDING_MEALS", payload: action.payload.wedding_id });
	} catch (error) {
		console.log("Error with addNewMealSaga():", error);
	}
}
function* updateWeddingDetailsSaga(action) {
	console.log(
		"Arrived at updateWeddingDetailsSaga() on actionsSaga.\n action.payload:",
		action.payload
	);
	const wedding_id = action.payload.id;

	try {
		yield axios.post("/api/actions/update/wedding", action.payload);
		yield put({ type: "GET_ACTIVE_WEDDING_DETAILS", payload: wedding_id });
	} catch (error) {
		console.log("Error with updateWeddingDetailsSaga:", error);
	}
}

function* actionsSaga() {
	yield takeLatest("ADD_NEW_EVENT", addNewEventSaga);
	yield takeLatest("ADD_NEW_ANNOUNCEMENT", addNewAnnouncementSaga);
	yield takeLatest("ADD_NEW_MEAL", addNewMealSaga);
	yield takeLatest("UPDATE_WEDDING_DETAILS", updateWeddingDetailsSaga);
}

export default actionsSaga;
