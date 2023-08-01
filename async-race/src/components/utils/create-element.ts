import { ElementOptions } from '../../types/types';

function createElement(options: ElementOptions): HTMLElement {
  const element: HTMLElement = document.createElement(options.tagName);
  element.classList.add(...options.classNames);
  if (options.textContent) {
    element.textContent = options.textContent;
  }
  if (options.parentNode) {
    options.parentNode.append(element);
  }
  if (options.eventHandler && options.eventType) {
    element.addEventListener(options.eventType, options.eventHandler);
  }
  return element;
}

export default createElement;
