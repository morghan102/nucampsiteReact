// we have the 4 reducers for the diff lil components

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';

import { Campsites } from './campsites';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Partners } from './partners';
import { InitialFeedback } from './forms';

// createforms is heloer func that makes it easy to set up reducers to u/d the state whenever new form vals are submitted
// designed to be use w combineReducers
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions,
            ...createForms({
                feedbackForm: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
        // this is all we need to do for logger.
    );

    return store;
};