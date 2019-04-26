import * as types from '../constants/actionTypes'

export const updateCity = (city) => ({
  type: types.UPDATE_CITY,
  payload: city
});

export const updateState = (state_loc) => ({
  type: types.UPDATE_STATE,
  payload: state_loc
});