import { set } from 'lodash/fp';

export default function FormReducer(state = {}, action) {
  switch (action.type) {
    case FIELD_ON_CHANGE:
      action.payload.forEach(() => {
        newState = set(state, action.payload.name, action.payload.value);
      })
      return newState;
      // user.name
      // user.setting.period
    break;
  }
}


function exampleReducer(state = {}, action) {
  switch (action.type) {
    case '1':
      return {
        ...state
      }
    break;
    case '2':

    break;
    default:
      return FormReducer(state, action);
  }
}
