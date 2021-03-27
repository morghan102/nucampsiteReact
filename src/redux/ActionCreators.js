import * as ActionTypes from './ActionTypes';
// the * is a wildcard, lets us  import all named exports from actiontypes.js from there at once
import { baseUrl } from '../shared/baseUrl';


export const fetchCampsites = () => dispatch => {
    // stores dispatch method passed in (thunk allows this)
    dispatch(campsitesLoading());
    // its dispatching the loading func
    return fetch(baseUrl + 'campsites')
        // fetch needs a url and the campsites as thats the locat for the resource we want
        .then(response => {
            if (response.ok) {
                return response;// will cont with the response chain if ok
            } else { // will throw error
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }

        },// and just in case it rejects the promise altogehter, meaning it wdnt even get to that error code in the response, there was no reposne
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        // we're validating the response from the server, checking the .ok returns a success code (like not 404, 400s, etc)
        .then(response => response.json())
        // fetch returs a promise. when its resolved, till use the json method to convert the repose from json to js, which will be an arr of campsites
        .then(campsites => dispatch(addCampsites(campsites)))
        // the json method returns a new prom fro which the converted js arr is the new response val when it resolves
        // grab js arr when that prom resolves then dispatch it w the addcampsites act creator to be used as its payload

        .catch(error => dispatch(campsitesFailed(error.message)));
    // this cathces if error is thrown. and if theres anything else error
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
export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});
export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

// u/d local redux store
export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

// this handles asynch calls to fetch & posts new comm to server
export const postComment = (campsiteId, rating, author, text) => dispatch => {
    const newComment = {
        campsiteId,
        rating,
        author,
        text
        // in es6, shorthand prop names. this is the same as campsiteId: campsiteId, etc. If the 2 are the same can do like this.
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => { throw error; }
        )
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log('post comment', error.message);
            alert('Your comment could not be posted\nError:' + error.message);
        });
};

export const fetchPromotions = () => dispatch => {
    dispatch(promotionsLoading());
    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));
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


export const partnersLoading = () => ({
    type: ActionTypes.PARTNERS_LOADING
});
export const partnersFailed = errMess => ({
    type: ActionTypes.PARTNERS_FAILED,
    payload: errMess
});
export const addPartners = partners => ({
    type: ActionTypes.ADD_PARTNERS,
    payload: partners
});
export const fetchPartners = () => dispatch => {
    dispatch(partnersLoading());
    return fetch(baseUrl + 'partners')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }

        },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(partners => dispatch(addPartners(partners)))
        .catch(error => dispatch(partnersFailed(error.message)));
};



export const postFeedback = (feedback) => dispatch => {

    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(feedback),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                alert("Thank you for your feedback" + JSON.stringify(feedback));
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => { throw error; }
        )
        .then(response => response.json())
        // .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log('post feedback', error.message);
            alert('Your feedback could not be posted\nError:' + error.message);
        });
};
