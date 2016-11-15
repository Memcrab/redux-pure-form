import set from 'lodash/fp/set';
import { FIELD_ON_CHANGE } from './action-types.js';

function getComplexValue(value) {
  if (typeof value === 'object' && typeof value.value !== 'undefined') {
    return value.value;
  }
  return value;
}

export default function formReducer(state = {}, action) {
  switch (action.type) {
    case FIELD_ON_CHANGE:
      let newState = state;
      Object.keys(action.payload).forEach((name) => {
        newState = set(name, getComplexValue(action.payload[name]), newState);
      });
      return newState;
    default:
      return state;
  }
}
