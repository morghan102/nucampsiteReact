// these r all reducers

import * as ActionTypes from './ActionTypes';
// usign fetch, we're getting an obj now
// doesnt have to be named export, or capitalized or an arrow func
export const Comments = (state = { errMess: null, comments: []}, action) => {
// takes already existing state. the 1st time this is called, the state wont exist so a def func param will initialize thispart
    switch(action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};

        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;
            comment.id = state.comments.length;
            comment.date = new Date().toISOString();
            return {...state, comments: state.comments.concat(comment)};

        default:
            return state;
    }
};