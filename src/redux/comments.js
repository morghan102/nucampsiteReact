// these r all reducers

import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

// doesnt have to be named export, or capitalized or an arrow func
export const Comments = (state = COMMENTS, action) => {
// takes already existing state. the 1st time this is called, the state wont exist so a def func param will initialize thispart
    switch(action.type) {
        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            return state.concat(comment);
        default:
            return state;
    }
};