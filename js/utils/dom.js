export const getId = (selector) => document.getElementById(selector);
export const selector = (selector) => document.querySelector(selector);
export function addEvent(element, event, handler) {
  element.addEventListener(event, handler);
}
export const createElement = (element) => document.createElement(element);