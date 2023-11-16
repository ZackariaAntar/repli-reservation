import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import allMyWeddings from './all.weddings.reducer';
import allMyRSVPs from './all.rsvps.reducer';
import activeWeddingDetails from './active.wedding.details.reducer';
import activeWeddingEvents from './active.wedding.events.reducer';
import activeWeddingGuests from './active.wedding.guests.reducer';
import activeWeddingMeals from './active.wedding.meals.reducer';
import activeWeddingPosts from './active.wedding.posts.reducer';
import activeWeddingReplis from './active.wedding.replis.reducer';
import activeRsvpDetails from './active.rsvp.details.reducer';
import relationships from './relationship.reducer';
import changePassword from './change.password.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
	errors, // contains registrationMessage and loginMessage
	user, // will have an id and username if someone is logged in

	allMyWeddings, // TODO: UPDATE COMMENT WITH CONTENTS
	allMyRSVPs, // TODO: UPDATE COMMENT WITH CONTENTS
	activeWeddingDetails, // TODO: UPDATE COMMENT WITH CONTENTS
	activeWeddingEvents, // TODO: UPDATE COMMENT WITH CONTENTS
	activeWeddingGuests, // TODO: UPDATE COMMENT WITH CONTENTS
	activeWeddingMeals, // TODO: UPDATE COMMENT WITH CONTENTS
	activeWeddingPosts, // TODO: UPDATE COMMENT WITH CONTENTS
	activeWeddingReplis, // TODO: UPDATE COMMENT WITH CONTENTS
	activeRsvpDetails,
	relationships,
	changePassword
});

export default rootReducer;
