import createElement from '../../utils/create-element';
import svgCode from '../../../data/svgCode';
import { WinnerData } from '../../../types/types';

export default class WinnersChartItem {
  index: number;

  page: number;

  chartLine: HTMLElement;

  number: HTMLElement;

  carIcon: HTMLElement;

  name: HTMLElement;

  wins: HTMLElement;

  bestTime: HTMLElement;

  winner: WinnerData;

  constructor(index: number, page: number, winner: WinnerData) {
    this.index = index;
    this.winner = winner;

    this.chartLine = createElement({
      tagName: 'div',
      classNames: ['chart__line'],
    });

    this.number = createElement({
      tagName: 'div',
      classNames: ['chart__column', 'chart__number'],
      textContent: `${index + 1 + 10 * (page - 1)}`,
      parentNode: this.chartLine,
    });

    this.carIcon = createElement({
      tagName: 'div',
      classNames: ['chart__column'],
      parentNode: this.chartLine,
    });

    this.carIcon.innerHTML = svgCode;
    this.carIcon.children[0].setAttribute('width', '38px');
    this.carIcon.children[0].setAttribute('height', '16px');

    this.name = createElement({
      tagName: 'div',
      classNames: ['chart__column', 'chart__name'],
      parentNode: this.chartLine,
    });

    this.wins = createElement({
      tagName: 'div',
      classNames: ['chart__column'],
      textContent: `${this.winner.wins}`,
      parentNode: this.chartLine,
    });
    this.bestTime = createElement({
      tagName: 'div',
      classNames: ['chart__column'],
      textContent: `${this.winner.time}`,
      parentNode: this.chartLine,
    });
  }
}
