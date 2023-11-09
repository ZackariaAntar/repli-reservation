import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "GET_ALL_MY_WEDDINGS_DETAILS" actions
function* getAllMyWeddingDetails(action) {
	console.log(
		`------ in getAllMyWeddingDetails() on dashboardDataSaga\naction.payload is user.id: ${action.payload}`
	);
	try {
		const allWeddings = yield axios.get(`/api/wedding/${action.payload}`);
		console.log(
			"result.rows returned from getAllMyWeddingDetails()",
			allWeddings.data
		);
		yield put({
			type: "SET_ALL_MY_WEDDINGS",
			payload: allWeddings.data,
		});

	} catch (error) {
		console.log("getAllMyWeddingDetails() FAILED", error);
	}
}

// worker Saga: will be fired on "GET_ALL_MY_RSVPS" actions
function* getAllMyRSVPs(action) {
	console.log(
		`------ in getAllMyRSVPs() on dashboardDataSaga\naction.payload is user.id: ${action.payload}`
	);
	try {
		const allRSVPs = yield axios.get(`/api/wedding/${action.payload}`); //TODO FIX API ENDPOINT!
		console.log("result.rows returned from getAllMyRSVPs()", allRSVPs.data);
		yield put({
			type: "SET_ALL_MY_RSVPS",
			payload: allRSVPs.data,
		});
	} catch (error) {
		console.log("getAllMyRSVPs() FAILED", error);
	}
}



function* dashboardDataSaga() {
	// GETS
	yield takeLatest("GET_ALL_MY_WEDDINGS_DETAILS", getAllMyWeddingDetails);
	yield takeLatest("GET_ALL_MY_RSVPS", getAllMyRSVPs);
	// POSTS

	// UPDATES

	// DELETES
}

export default dashboardDataSaga;
