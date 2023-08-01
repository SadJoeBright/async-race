import './car.css';
import createElement from '../utils/create-element';
import svgCode from '../../data/svgCode';

export default class Car {
  public name: string;

  public color: string;

  private garageItem: HTMLElement;

  private carControl: HTMLElement;

  public selectButton: HTMLElement;

  public removeButton: HTMLElement;

  private carTitle: HTMLElement;

  private engineControl: HTMLElement;

  public startButton: HTMLElement;

  public stopButton: HTMLElement;

  private track: HTMLElement;

  public car:HTMLElement;

  private flag: HTMLElement;

  public isSelected: boolean;

  public isStopped: boolean;

  public time: number | null;

  public id: number;

  public wins: number;

  constructor(name: string, color: string, id: number) {
    this.name = name;
    this.color = color;
    this.id = id;
    this.isSelected = false;
    this.isStopped = true;
    this.time = null;
    this.wins = 0;

    this.garageItem = createElement({
      tagName: 'div',
      classNames: ['garage-item'],
    });

    this.carControl = createElement({
      tagName: 'div',
      classNames: ['car-control'],
      parentNode: this.garageItem,
    });

    this.selectButton = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'SELECT',
      parentNode: this.carControl,
      eventHandler: () => this.select(),
      eventType: 'click',
    });

    this.removeButton = createElement({
      tagName: 'div',
      classNames: ['button'],
      textContent: 'REMOVE',
      parentNode: this.carControl,
      eventType: 'click',
    });

    this.carTitle = createElement({
      tagName: 'p',
      classNames: ['car-title'],
      textContent: `${this.name}`,
      parentNode: this.carControl,
    });

    this.engineControl = createElement({
      tagName: 'div',
      classNames: ['engine-control'],
      parentNode: this.garageItem,
    });

    this.startButton = createElement({
      tagName: 'div',
      classNames: ['button_start'],
      textContent: 'START',
      parentNode: this.engineControl,
      eventType: 'click',
    });

    this.stopButton = createElement({
      tagName: 'div',
      classNames: ['button_stop', 'button_disabled'],
      textContent: 'STOP',
      parentNode: this.engineControl,
      eventType: 'click',
    });

    this.track = createElement({
      tagName: 'div',
      classNames: ['track'],
      parentNode: this.garageItem,
    });

    this.car = createElement({
      tagName: 'div',
      classNames: ['car'],
      parentNode: this.track,
    });

    this.car.innerHTML = svgCode;
    this.car.children[0].setAttribute('fill', this.color);

    this.flag = createElement({
      tagName: 'div',
      classNames: ['flag'],
      parentNode: this.track,
    });
  }

  public getCar(): HTMLElement {
    return this.garageItem;
  }

  public select(): void {
    this.isSelected = !this.isSelected;
    this.carTitle.classList.toggle('selected');
  }

  public startAnimation(time: number): void {
    this.car.style.animationDuration = `${time}s`;
    this.car.classList.remove('stop');
    this.car.classList.add('moove');
  }

  public stopAnimation(): void {
    const position = window.getComputedStyle(this.car).getPropertyValue('left');
    this.car.style.left = position;

    this.car.classList.remove('moove');
    this.car.classList.add('stop');
  }

  public getCarBack(): void {
    this.car.classList.remove('moove');
    this.car.style.left = '90px';
  }
}
