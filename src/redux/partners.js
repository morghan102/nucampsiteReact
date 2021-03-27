// import { PARTNERS } from '../shared/partners';
import * as ActionTypes from './ActionTypes';

// doesnt have to be named export, or capitalized or an arrow func
// export const Partners = (state = PARTNERS, action) => {
// // takes already existing state. the 1st time this is called, the state wont exist so a def func param will initialize thispart
//     switch(action.type) {
//         default:
//             return state;
//     }
// };

export const Partners = (state = {
    isLoading: true,
    errMess: null,
    partners: []
}, action) => {
    // this will be the reposnses to the actions
    switch(action.type) {
        case ActionTypes.ADD_PARTNERS:
            return {...state, isLoading: false, errMess: null, partners: action.payload};
        case ActionTypes.PARTNERS_LOADING:
            return {...state, isLoading: true, errMess: null, partners: []};
        case ActionTypes.PARTNERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
};