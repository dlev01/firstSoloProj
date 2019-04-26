
import * as types from '../constants/actionTypes';

const initialState = {
    // pull from mongoDB
    user: null,
    city: null,
    state_loc: null
};

const locationReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case types.UPDATE_CITY:
            let city = action.payload.city;
            return {
                ...state,
                city
        }

        case types.UPDATE_STATE:
            let state_loc = action.payload.state;
            return {
                ...state,
                state_loc
            }
        default:
            return state;
    }
}

export default locationReducer;