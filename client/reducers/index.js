

import { combineReducers } from 'redux';

// import all reducers here
import locationReducer from './locationReducer';


// combine reducers
const reducers = combineReducers({
  // if we had other reducers, they would go here
  location: locationReducer,
});

// make the combined reducers available for import
export default reducers;

