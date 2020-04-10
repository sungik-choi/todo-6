import { _q, toggleClass, addClass, removeClass } from '../utils/utils';
import { UTIL_CLASS } from '../utils/constants';
import { COLUMN_CLASS, changeCardCount } from './column';
import { INPUT_FORM_CLASS } from './inputForm';
import { fetchAddedCard } from './fetch';

const addNewCard = async (targetColumn: HTMLDivElement, cardWrap: HTMLDivElement, textarea: HTMLTextAreaElement): void => {
  textarea.setAttribute('disabled', true);
  cardWrap.insertAdjacentHTML('afterbegin', await fetchAddedCard(targetColumn.id, textarea.value));
  textarea.value = '';
  textarea.removeAttribute('disabled');
  changeCardCount(targetColumn);
};

const hiddenInputForm = (targetColumn: HTMLDivElement): void => {
  const inputForm = targetColumn.querySelector(`.${INPUT_FORM_CLASS.inputWrap}`);
  addClass(UTIL_CLASS.hidden, inputForm);
};

const clickColumnAddButton = (event: any): void => {
  if (event.target.className !== COLUMN_CLASS.addButton) return;
  const targetColumn = event.target.closest(`.${COLUMN_CLASS.column}`);
  const inputForm = targetColumn.querySelector(`.${INPUT_FORM_CLASS.inputWrap}`);
  const textarea: HTMLTextAreaElement = inputForm.querySelector(`#${INPUT_FORM_CLASS.textarea}`);
  toggleClass(UTIL_CLASS.hidden, inputForm);
  textarea.focus();
};

const clickInputFormCancelButton = (event: any): void => {
  if (event.target.className !== INPUT_FORM_CLASS.cancelButton) return;
  const targetColumn = event.target.closest(`.${COLUMN_CLASS.column}`);
  hiddenInputForm(targetColumn);
};

const clickInputFormAddButton = async (event: any): void => {
  if (event.target.className !== INPUT_FORM_CLASS.addButton) return;
  const targetColumn = event.target.closest(`.${COLUMN_CLASS.column}`);
  const cardWrap = targetColumn.querySelector(`.${COLUMN_CLASS.cardWrap}`);
  const textarea: HTMLTextAreaElement = targetColumn.querySelector(`#${INPUT_FORM_CLASS.textarea}`);
  addClass(UTIL_CLASS.disabled, event.target);
  addNewCard(targetColumn, cardWrap, textarea);
};

const toogleActivateAddButton = (event: any): void => {
  if (event.target.id !== INPUT_FORM_CLASS.textarea) return;
  const targetInputForm = event.target.closest(`.${INPUT_FORM_CLASS.inputWrap}`);
  const addButton: HTMLButtonElement = targetInputForm.querySelector(`.${INPUT_FORM_CLASS.addButton}`);
  event.target.value ? removeClass(UTIL_CLASS.disabled, addButton) : addClass(UTIL_CLASS.disabled, addButton);
};

export const clickHandler = (event: Event): void => {
  clickColumnAddButton(event);
  clickInputFormAddButton(event);
  clickInputFormCancelButton(event);
};

export const inputHandler = (event: Event): void => {
  toogleActivateAddButton(event);
};
