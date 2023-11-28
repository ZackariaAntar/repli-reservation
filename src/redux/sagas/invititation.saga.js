import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// worker Saga: will be fired on "ADD_GUESTS_TO_EVENT" actions
function* addGuestsToEvent(action) {
    const wedding_id = action.payload[0].wedding_id
    console.log("Arrived at addGuestToEvent() on invitationSaga.\n action.payload:", action.payload);
    console.log("----------\n wedding_id:", wedding_id);
	try {
		yield axios.post("/api/wedding/invitation/add_guests_to_event", action.payload);

		yield put({ type: "GET_ACTIVE_WEDDING_REPLIS", payload: wedding_id });

	} catch (error) {
		console.log("Error with addGuestToEvent():", error);

	}
}
function* removeGuestFromEvent(action) {
    const wedding_id = action.payload.wedding_id
    console.log("DELETE_GUEST_FROM_EVENT");
    console.log(
		"Arrived at removeGuestFromEvent() on invitationSaga.\n action.payload:",
		action.payload
	);
    console.log("----------\n wedding_id:", wedding_id);
	try {
		yield axios.post("/api/wedding/invitation/delete_guest_from_event", action.payload);

		yield put({ type: "GET_ACTIVE_WEDDING_REPLIS", payload: wedding_id });

	} catch (error) {
		console.log("Error with removeGuestFromEvent():", error);

	}
}

function* invitationSaga() {
	yield takeLatest("ADD_GUESTS_TO_EVENT", addGuestsToEvent);
	yield takeLatest("DELETE_GUEST_FROM_EVENT", removeGuestFromEvent);
}

export default invitationSaga;
