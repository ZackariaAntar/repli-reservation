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

function* addRsvpDetails(action) {
    try {
    yield axios.post(`/api/rsvp/guest_confirm_meal_and_plus_one`)
    yield put ({
        type: "ADD_RSVP_DETAILS",
        payload: action.payload.wedding_id
    })
    } catch (error) {
        console.log("Error posting RSVP details", error)
        
    }
}

function* addIsAttending(action) {
    console.log(action.payload)
    try {
    yield axios.post(`/api/rsvp/attendance/is_attending`, action.payload)
    yield put ({ 
        type: "GET_ACTIVE_RSVP",
        payload: action.payload.wedding_id
    })
    } catch (error) {
        console.log("Error posting is_attending", error)
    }
}

function* rsvpSaga() {
    yield takeLatest('GET_ACTIVE_RSVP', getActiveRsvpDetails);
    yield takeLatest('ADD_RSVP_DETAILS', addRsvpDetails);
    yield takeLatest('ADD_IS_ATTENDING', addIsAttending);
  }
  
  export default rsvpSaga;