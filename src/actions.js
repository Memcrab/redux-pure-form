import { FIELD_ON_CHANGE } from './action-types.js';

const INPUT = 'input';
const INPUT_CHECKBOX = 'checkbox';
const INPUT_RADIO = 'radio';
const INPUT_SELECT = 'select';

function getInputValue(target) {
  if (target.type === INPUT_CHECKBOX) {
    return target.checked ? '1' : '0';
  }
  // select
  // multiple select
  // radio
  // condition for react native elements
  return target.value;
}


export function onChange(e) {
  const target = e.currentTarget;
  const name = target.name;
  const parser = target.parser;

  const value = parser ?
    parser(getInputValue(target)) :
    getInputValue(target);

  // от этого поля может зависеть другое поле, нужно придумать как менять и его
  // другое поле может быть асинхронное и изменение произойдет только после запроса
  // форма должна уметь асинхронно валидироваться
  // значение должно иметь возможность проходить форматирование перед ложением в состояние
  // значение должно иметь возможность форматироваться перед выводом в поле

  return {
    type: FIELD_ON_CHANGE,
    payload: {
      name, // имя будет указано с точками или даже с квадратными скобками
      value,
    },
    payload: [
      {
        name,
        value,
      }
      {
        name2,
        value2,
      }
    ]
  }
}