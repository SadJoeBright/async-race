import './garage.css';
import createElement from '../../utils/create-element';

export default class GarageView {
  public mainContainer: HTMLElement;

  private header: HTMLElement;

  public garage: HTMLElement;

  private controlPanel: HTMLElement;

  private controlInput: HTMLElement;

  private controlButtons: HTMLElement;

  public textInput: HTMLInputElement | HTMLElement;

  public colorInput: HTMLElement;

  public createButton: HTMLElement;

  public updateButton: HTMLElement;

  public generateButton: HTMLElement;

  public raceButton: HTMLElement;

  public resetButton: HTMLElement;

  public title: HTMLElement;

  public pageNumber: HTMLElement;

  public winnerMessage: HTMLElement;

  private paginationPanel: HTMLElement;

  public prevButton: HTMLElement;

  public nextButton: HTMLElement;

  constructor() {
    this.mainContainer = createElement({
      tagName: 'div',
      classNames: ['main-container'],
    });

    this.header = createElement({
      tagName: 'header',
      classNames: ['header'],
      parentNode: this.mainContainer,
    });

    this.controlPanel = createElement({
      tagName: 'div',
      classNames: ['control-panel'],
      parentNode: this.header,
    });

    this.controlInput = createElement({
      tagName: 'div',
      classNames: ['control-input'],
      parentNode: this.controlPanel,
    });

    this.textInput = createElement({
      tagName: 'input',
      classNames: ['text-input'],
      parentNode: this.controlInput,
    });
    this.textInput.setAttribute('type', 'text');

    this.colorInput = createElement({
      tagName: 'input',
      classNames: ['color-input'],
      parentNode: this.controlInput,

    });
    this.colorInput.setAttribute('type', 'color');

    this.controlButtons = createElement({
      tagName: 'div',
      classNames: ['control-buttons'],
      parentNode: this.controlPanel,
    });

    this.createButton = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'CREATE',
      parentNode: this.controlButtons,
    });

    this.updateButton = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'UPDATE',
      parentNode: this.controlButtons,
    });

    this.generateButton = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'GENERATE CARS',
      parentNode: this.controlButtons,
    });

    this.raceButton = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'RACE',
      parentNode: this.controlButtons,
    });

    this.resetButton = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'RESET',
      parentNode: this.controlButtons,
    });

    this.title = createElement({
      tagName: 'h2',
      classNames: ['garage__title'],
      parentNode: this.header,
    });

    this.pageNumber = createElement({
      tagName: 'p',
      classNames: ['garage__page-number'],
      parentNode: this.header,
    });

    this.winnerMessage = createElement({
      tagName: 'p',
      classNames: ['winner-massage', 'winner-massage_visible'],
      parentNode: this.header,
    });

    this.garage = createElement({
      tagName: 'div',
      classNames: ['garage'],
      parentNode: this.mainContainer,
    });

    this.paginationPanel = createElement({
      tagName: 'div',
      classNames: ['pagination-panel'],
      parentNode: this.mainContainer,
    });

    this.prevButton = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'PREV',
      parentNode: this.paginationPanel,
    });

    this.nextButton = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: ' NEXT',
      parentNode: this.paginationPanel,
    });
  }

  public showWinner() {
    this.winnerMessage.classList.add('winner-massage_visible');
  }

  public hideWinner() {
    this.winnerMessage.classList.remove('winner-massage_visible');
  }
}
