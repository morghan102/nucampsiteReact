import * as ActionTypes from './ActionTypes';
// the * is a wildcard, lets us  import all named exports from actiontypes.js from there at once
import { CAMPSITES } from '../shared/campsites';

export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {  
        campsiteId,
        rating,
        author,
        text
        // in es6, shorthand prop names. this is the same as campsiteId: campsiteId, etc. If the 2 are the same can do like this.
    }
});
// arro func nested in another
export const fetchCampsites = () => dispatch => {
// stores dispatch method passed in (thunk allows this)
    dispatch(campsitesLoading());
// its dispatching the loading func
    setTimeout(() => {
        dispatch(addCampsites(CAMPSITES));
        // and then after 2000millisec, it will dispatch another act 
    }, 2000);
};

// no thunk for this one (only 1 arrow), though the prev one makes this happen
// std action creator that returns an action obj. No payload in this one
// no thunk means no m/w, will go straight to the reducer
export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});

// thunk will perform asynchronous request to a server (we dont have a server so it's sorta fake, will use settimeout() func)


export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});