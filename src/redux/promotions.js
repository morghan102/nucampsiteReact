import { PROMOTIONS } from '../shared/promotions';

// doesnt have to be named export, or capitalized or an arrow func
export const Promotions = (state = PROMOTIONS, action) => {
// takes already existing state. the 1st time this is called, the state wont exist so a def func param will initialize thispart
    switch(action.type) {
        default:
            return state;
    }
};