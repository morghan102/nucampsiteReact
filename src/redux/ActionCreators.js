import * as ActionTypes from './ActionTypes';
// the * is a wildcard, lets us  import all named exports from actiontypes.js from there at once
import { baseUrl } from '../shared/baseUrl';

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
    return fetch(baseUrl + 'campsites')
    // fetch needs a url and the campsites as thats the locat for the resource we want
        .then(response => response.json())
    // fetch returs a promise. when its resolved, till use the json method to convert the repose from json to js, which will be an arr of campsites
        .then(campsites => dispatch(addCampsites(campsites)));
    // the json method returns a new prom fro which the converted js arr is the new response val when it resolves
    // grab js arr when that prom resolves then dispatch it w the addcampsites act creator to be used as its payload
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

// thunk used here
export const fetchComments = () =>  dispatch => {
    return fetch(baseUrl + 'comments')
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});
export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});


export const fetchPromotions = () => dispatch => {
        dispatch(promotionsLoading());
        return fetch(baseUrl + 'promotions')
            .then(response => response.json())
            .then(promotions => dispatch(addPromotions(promotions)));
};
export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});
export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});
export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});