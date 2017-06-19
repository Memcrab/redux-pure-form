// @flow
import { FIELD_ON_CHANGE } from './action-types.js';

const INPUT_CHECKBOX: string = 'checkbox';
const INPUT_SELECT_MULTIPLE: string = 'select-multiple';
const INPUT: string = 'input';
const INPUT_RADIO: string = 'radio';
const INPUT_SELECT: string = 'select-one';

function getFieldValue(target: Object): string | null | string[] {
  if (target.type === INPUT_CHECKBOX) {
    if (target.name.endsWith('[]')) {
      return target.value;
    }

    switch (true) {
      case target.value === 'true':
        return target.checked ? 'true' : 'false';
      case target.value === '1':
        return target.checked ? '1' : '0';
      default:
        return target.checked ? target.value : null;
    }
  }

  if (target.type === INPUT_SELECT_MULTIPLE) {
    const values: string[] = Array.prototype.reduce.call(target.options, (acc, option) => {
      if (option.selected) {
        return acc.concat(option.value);
      }
      return acc;
    }, []);
    return values;
  }

  // radio
  // condition for react native elements
  return target.value;
}

function getFiedlsFromEvent(e): Object {
  const target: Object = e.currentTarget;
  const name: string = target.name;
  const value: string | null | string[] = getFieldValue(target);
  return {
    [name]: value,
  };
}

export function onChange(name: any, value: any): Object {
  let fields: ?Object = null;

  switch (true) {
    // event
    case Boolean(typeof name === 'object' && name.type && name.target):
      fields = getFiedlsFromEvent(name);
      break;
    // name and value as args
    case Boolean(typeof name === 'string' && typeof value !== 'undefined'):
      fields = { [name]: value };
      break;
    // multiple fields object
    case Boolean(typeof name === 'object' && typeof value === 'undefined'):
      fields = name;
      break;
    default:
      console.warn('WARNING, not handled event in onChange');
      break;
  }

  return {
    type: FIELD_ON_CHANGE,
    payload: fields,
  };
}
