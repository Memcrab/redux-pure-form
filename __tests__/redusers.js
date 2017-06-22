/* eslint-disable */
import { FIELD_ON_CHANGE } from '../src/action-types.js';
import reducer from '../src/reducer.js';

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer('user')(undefined, {})).toEqual({});
  });

  it('should handle FIELD_ON_CHANGE', () => {
    expect(
      reducer('user')({}, {
        type: FIELD_ON_CHANGE,
        payload: { 'user.name': 'superman' },
      })
    ).toEqual(
      {
        user: {
          name: 'superman',
        }
      }
    );
  });
});
