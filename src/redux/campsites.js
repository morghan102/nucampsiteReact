// import { CAMPSITES } from '../shared/campsites'; dont need to import this anymore bc there is an action that does that
import * as ActionTypes from './ActionTypes';

// doesnt have to be named export, or capitalized or an arrow func
// export const Campsites = (state = CAMPSITES, action) => {
// // takes already existing state. the 1st time this is called, the state wont exist so a def func param will initialize thispart
//     switch(action.type) {
//         default:
//             return state;
//     }
// };

// here it is again w thunk
export const Campsites = (state = {
    isLoading: true,
    errMess: null,
    campsites: []
}, action) => {
    // this will be the reposnses to the actions
    switch(action.type) {
        case ActionTypes.ADD_CAMPSITES:
            return {...state, isLoading: false, errMess: null, campsites: action.payload};
        case ActionTypes.CAMPSITES_LOADING:
            return {...state, isLoading: true, errMess: null, campsites: []};
        case ActionTypes.CAMPSITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
};