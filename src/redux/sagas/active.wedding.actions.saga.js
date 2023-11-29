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
function* sendWeddingInvitesSaga(action) {
	console.log(
		"Arrived at sendWeddingInvitesSaga() on actionsSaga.\n action.payload:",
		action.payload
	);
	console.log(

		action.payload.wedding_id
	);
	try {
		yield axios.post("/api/email/send_email", action.payload);
		yield put({ type: "GET_ACTIVE_WEDDING_GUESTS", payload: action.payload.wedding_id});
	} catch (error) {
		console.log("Error with sendWeddingInvitesSaga:", error);
	}
}

function* actionsSaga() {
	yield takeLatest("ADD_NEW_EVENT", addNewEventSaga);
	yield takeLatest("ADD_NEW_ANNOUNCEMENT", addNewAnnouncementSaga);
	yield takeLatest("ADD_NEW_MEAL", addNewMealSaga);
	yield takeLatest("UPDATE_WEDDING_DETAILS", updateWeddingDetailsSaga);
	yield takeLatest("SEND_WEDDING_INVITES", sendWeddingInvitesSaga);
}

export default actionsSaga;
