import { FIELD_ON_CHANGE } from './action-types.js';

const INPUT = 'input';
const INPUT_CHECKBOX = 'checkbox';
const INPUT_RADIO = 'radio';
const INPUT_SELECT = 'select-one';
const INPUT_SELECT_MULTIPLE = 'select-multiple';

function getInputValue(target) {
  if (target.type === INPUT_CHECKBOX) {
    return target.checked ? '1' : '0';
  }

  if (target.type === INPUT_SELECT_MULTIPLE) {
    const options = target.options;
    const values = Array.prototype.reduce.call(options, (acc, option) => {
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

function getFiedlsFromEvent(e) {
  const target = e.currentTarget;
  const name = target.name;
  const value = getInputValue(target);
  return {
    name,
    value,
  };
}

export function onChange(name, value) {
  let fields = null;

  switch (true) {
    case Boolean(typeof name === 'object' && name.type && name.target):
      fields = [getFiedlsFromEvent(name)];
      break;
    case Boolean(typeof name === 'string' && typeof value !== 'undefined'):
      fields = [{ name, value }];
      break;
    case Array.isArray(name):
      fields = name;
      break;
    default:
      console.warn('WARNING, not handled event in onChange');
      break;
  }

  console.log('fields =>', fields);

  // от этого поля может зависеть другое поле, нужно придумать как менять и его
  // другое поле может быть асинхронное и изменение произойдет только после запроса
  // форма должна уметь асинхронно валидироваться
  // значение должно иметь возможность проходить форматирование перед ложением в состояние
  // значение должно иметь возможность форматироваться перед выводом в поле

  return {
    type: FIELD_ON_CHANGE,
    payload: fields,
  };
}
