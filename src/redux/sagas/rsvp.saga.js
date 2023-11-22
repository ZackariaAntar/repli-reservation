import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getActiveRsvpDetails(action) {
    try {
    const rsvpDetails = yield axios.get(`/api/wedding/active_rsvp_details/${action.payload}`)
        yield put ({
        type: "SET_ACTIVE_RSVP_DETAILS",
        payload: rsvpDetails.data
        })
    } catch (error) {
        console.log("getActiveRsvpDetails() FAILED", error);
        
    }
}

function* rsvpSaga() {
    yield takeLatest('GET_ACTIVE_RSVP', getActiveRsvpDetails);
  }
  
  export default rsvpSaga;