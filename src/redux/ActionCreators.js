import * as ActionTypes from './ActionTypes';
// the * is a wildcard, lets us  import all named exports from actiontypes.js from there at once

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