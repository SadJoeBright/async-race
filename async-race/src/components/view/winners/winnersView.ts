import './winners-view.css';
import createElement from '../../utils/create-element';
import WinnersChartItem from './winnersChartItem';
import { WinnerData } from '../../../types/types';

export default class WinnersView {
  public mainContainer: HTMLElement;

  private header: HTMLElement;

  public title: HTMLElement;

  public pageNumber: HTMLElement;

  private chart: HTMLElement;

  private chartHeader: HTMLElement;

  public chartBody: HTMLElement;

  private chartNumber: HTMLElement;

  private chartCarIcon: HTMLElement;

  private chartCarName: HTMLElement;

  public chartWins: HTMLElement;

  public chartBestTime: HTMLElement;

  private paginationPanel: HTMLElement;

  public prevButton: HTMLElement;

  public nextButton: HTMLElement;

  newWinner: WinnersChartItem;

  constructor() {
    this.mainContainer = createElement({
      tagName: 'div',
      classNames: ['main-container', 'hide'],
    });

    this.header = createElement({
      tagName: 'header',
      classNames: ['header'],
      parentNode: this.mainContainer,
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

    this.chart = createElement({
      tagName: 'div',
      classNames: ['chart'],
      parentNode: this.mainContainer,
    });

    this.chartHeader = createElement({
      tagName: 'div',
      classNames: ['chart__line', 'chart__header'],
      parentNode: this.chart,
    });

    this.chartNumber = createElement({
      tagName: 'div',
      classNames: ['chart__column', 'chart__number'],
      textContent: 'Number',
      parentNode: this.chartHeader,
    });
    this.chartCarIcon = createElement({
      tagName: 'div',
      classNames: ['chart__column'],
      textContent: 'Car',
      parentNode: this.chartHeader,
    });
    this.chartCarName = createElement({
      tagName: 'div',
      classNames: ['chart__column', 'chart__name'],
      textContent: 'Name',
      parentNode: this.chartHeader,
    });
    this.chartWins = createElement({
      tagName: 'div',
      classNames: ['chart__column', 'chart__wins'],
      textContent: 'Wins',
      parentNode: this.chartHeader,
    });
    this.chartBestTime = createElement({
      tagName: 'div',
      classNames: ['chart__column', 'chart__time'],
      textContent: 'Best time (seconds)',
      parentNode: this.chartHeader,
    });

    this.chartBody = createElement({
      tagName: 'div',
      classNames: ['chart__body'],
      parentNode: this.chart,
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

  public addWinner(index: number, page: number, winner: WinnerData): WinnersChartItem {
    const winnersChartItem = new WinnersChartItem(index, page, winner);
    this.chartBody.append(winnersChartItem.chartLine);
    return winnersChartItem;
  }
}
