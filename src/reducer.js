import set from 'lodash/fp/set';
import { FIELD_ON_CHANGE } from './action-types.js';

export default function formReducer(state = {}, action) {
  switch (action.type) {
    case FIELD_ON_CHANGE:
      let newState = state;
      action.payload.forEach((field) => {
        console.log('i here ');
        newState = set(field.name, field.value, newState);
      });
      console.log('newState =>', newState);
      return newState;
      // user.name
      // user.setting.period
    default:
      return state;
  }
}
