import { FORM_ON_CHANGE } from './action-types.js';

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
  return target.value;
}


function onChange(e) {
  const target = e.currentTarget;
  const name = target.name;
  const value = getInputValue(target)
  // от этого поля может зависеть другое поле, нужно придумать как менять и его
  // другое поле может быть асинхронное и изменение произойдет только после запроса
  // форма должна уметь асинхронно валидироваться
  // значение должно иметь возможность проходить форматирование перед ложением в состояние
  // значение должно иметь возможность форматироваться перед выводом в поле

  return {
    type: FORM_ON_CHANGE,
    name,
    value,
  }
}