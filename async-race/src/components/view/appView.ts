import '../../main.css';
import createElement from '../utils/create-element';
import GarageView from './garage/garageView';
import WinnersView from './winners/winnersView';

export default class AppView {
  private viewSwitcher: HTMLElement;

  private toGarageBtn: HTMLElement;

  public toWinnersBtn: HTMLElement;

  public garageView: GarageView;

  public winnersView: WinnersView;

  constructor() {
    this.viewSwitcher = createElement({
      tagName: 'div',
      classNames: ['view-switcher'],
    });

    this.toGarageBtn = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'TO GARAGE',
      parentNode: this.viewSwitcher,
      eventHandler: () => this.toGarage(),
      eventType: 'click',
    });

    this.toWinnersBtn = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'TO WINNERS',
      parentNode: this.viewSwitcher,
      eventHandler: () => this.toWinners(),
      eventType: 'click',
    });

    this.garageView = new GarageView();
    this.winnersView = new WinnersView();
  }

  public create(): void {
    document.body.append(
      this.viewSwitcher,
      this.garageView.mainContainer,
      this.winnersView.mainContainer,
    );
  }

  private toWinners() {
    setTimeout(() => {
      this.garageView.mainContainer.classList.add('hide');
      this.winnersView.mainContainer.classList.remove('hide');
    }, 200);
  }

  private toGarage() {
    this.winnersView.mainContainer.classList.add('hide');
    this.garageView.mainContainer.classList.remove('hide');
  }
}
