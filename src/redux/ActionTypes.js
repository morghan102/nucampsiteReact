export const ADD_COMMENT = 'ADD_COMMENT';
export const CAMPSITES_LOADING = 'CAMPSITES_LOADING';
// for when app is loading campsites data and hasnt recieved it yet. waiting for response
export const CAMPSITES_FAILED = 'CAMPSITES_FAILED';
// for when the loading has failed for some reason & cdnt laod data. will tell store so the state can show an error message
export const ADD_CAMPSITES = 'ADD_CAMPSITES';
// data has been retrieved frmo server & can safely u/d state
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const COMMENTS_FAILED = 'COMMENTS_FAILED';
export const PROMOTIONS_LOADING = 'PROMOTIONS_LOADING';
export const ADD_PROMOTIONS = 'ADD_PROMOTIONS';
export const PROMOTIONS_FAILED = 'PROMOTIONS_FAILED';
