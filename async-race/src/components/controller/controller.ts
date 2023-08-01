import AppView from '../view/appView';
import Car from '../car/car';
import Api from '../api/api';
import GarageView from '../view/garage/garageView';
import { CarData } from '../../types/types';
import getRandomName from '../utils/getRandomName';
import getRandomColor from '../utils/getRandomColor';
import carNames from '../../data/carNames';
import WinnersView from '../view/winners/winnersView';

export default class Controller {
  currentGaragePage: number;

  currentWinnersPage: number;

  api: Api;

  appView: AppView;

  car: Car;

  garageView: GarageView;

  winnersView: WinnersView;

  sortingParam: string;

  sortingOrder: string;

  cars: Car[] = [];

  private winner: Car | null = null;

  private boundDefineWinner = this.defineWinner.bind(this);

  constructor() {
    this.currentGaragePage = 1;
    this.currentWinnersPage = 1;
    this.sortingParam = 'time';
    this.sortingOrder = 'ASC';

    this.api = new Api();
    this.appView = new AppView();

    this.winnersView = this.appView.winnersView;
    this.appView.toWinnersBtn.addEventListener('click', () => this.renderWinners(this.currentWinnersPage));
    this.garageView = this.appView.garageView;
    this.garageView.nextButton.addEventListener('click', this.nextGaragePage.bind(this));
    this.garageView.prevButton.addEventListener('click', this.prevGaragePage.bind(this));
    this.garageView.createButton.addEventListener('click', this.addCar.bind(this));
    this.garageView.updateButton.addEventListener('click', this.updateCar.bind(this));
    this.garageView.raceButton.addEventListener('click', this.startRace.bind(this));
    this.garageView.generateButton.addEventListener('click', this.generateCars.bind(this));
    this.garageView.resetButton.addEventListener('click', this.reset.bind(this));

    this.winnersView.nextButton.addEventListener('click', this.nextWinnersPage.bind(this));
    this.winnersView.prevButton.addEventListener('click', this.prevWinnersPage.bind(this));
    this.winnersView.chartWins.addEventListener('click', () => this.sortWinnersByTWins());
    this.winnersView.chartBestTime.addEventListener('click', () => this.sortWinnersByTime());

    this.renderGarage(this.currentGaragePage);
  }

  private renderCar(name: string, color: string, id: number, wins?: number): void {
    const car = new Car(name, color, id);
    if (wins) {
      car.wins = wins;
    }
    car.selectButton.addEventListener('click', this.selectCar.bind(this));

    car.removeButton.addEventListener('click', this.removeCar.bind(this, car.id));
    car.startButton.addEventListener('click', this.startCar.bind(this, car.id));
    car.stopButton.addEventListener('click', this.stopCar.bind(this, car.id));
    this.garageView.garage.append(car.getCar());
    this.cars.push(car);
  }

  private async renderGarage(page: number) {
    this.cars = [];
    const pagesAmount = await this.api.getCarsPagesAmount();
    const carsAmount = await this.api.getCarsAmount();
    this.garageView.title.textContent = `Garage(${carsAmount})`;
    this.garageView.pageNumber.textContent = `Page #${this.currentGaragePage}`;
    const carsData = await this.api.getCars(page);
    const winnners = await this.api.getWinners();
    this.garageView.garage.innerHTML = '';
    carsData.forEach((data: CarData) => {
      let wins;
      const { name, color, id } = data;
      if (winnners.find((winner) => winner.id === id)) {
        const currentWinner = winnners.find((winner) => winner.id === id);
        wins = currentWinner.wins;
      }
      this.renderCar(name, color, id, wins);
    });

    if (this.currentGaragePage < pagesAmount) {
      this.garageView.nextButton.classList.remove('button_disabled');
    } else {
      this.garageView.nextButton.classList.add('button_disabled');
    }
    if (this.currentGaragePage > 1) {
      this.garageView.prevButton.classList.remove('button_disabled');
    } else {
      this.garageView.prevButton.classList.add('button_disabled');
    }
  }

  private async addCar() {
    const pagesAmount = await this.api.getCarsPagesAmount();
    const carsAmount = await this.api.getCarsAmount();
    const allCars = await this.api.getCars(pagesAmount);
    const id = allCars.length ? (allCars[allCars.length - 1].id + 1) : 1;
    const name = (this.garageView.textInput as HTMLInputElement).value;
    const color = (this.garageView.colorInput as HTMLInputElement).value;
    if (name) {
      await this.api.createCar({ name, color, id });
      this.garageView.title.textContent = `Garage(${carsAmount})`;
      if (this.currentGaragePage === pagesAmount || pagesAmount === 0) {
        this.renderGarage(this.currentGaragePage);
      }
      (this.garageView.textInput as HTMLInputElement).value = '';
      this.garageView.textInput.setAttribute('placeholder', '');
    } else {
      this.garageView.textInput.setAttribute('placeholder', 'please, type in car\'s name');
    }
  }

  private async nextGaragePage() {
    this.garageView.hideWinner();
    const pagesAmount = await this.api.getCarsPagesAmount();
    if (this.currentGaragePage < pagesAmount) {
      this.currentGaragePage += 1;
      this.renderGarage(this.currentGaragePage);
    }
  }

  private prevGaragePage(): void {
    this.garageView.hideWinner();
    if (this.currentGaragePage > 1) {
      this.currentGaragePage -= 1;
      this.renderGarage(this.currentGaragePage);
    }
  }

  private async removeCar(id: number) {
    await this.api.deleteCar(id);
    const allWinners = await this.api.getWinners();
    if (allWinners.some((winner) => winner.id === id)) {
      this.api.deleteWinner(id);
    }
    this.renderGarage(this.currentGaragePage);
  }

  private async generateCars() {
    const pagesAmount = await this.api.getCarsPagesAmount();
    const carsData = await this.api.getCars(pagesAmount);
    const lastCarId = carsData.length ? (carsData[carsData.length - 1].id) : 1;

    const createCarPromises = [];

    for (let id = lastCarId + 1; id <= lastCarId + 100; id += 1) {
      const name = getRandomName(carNames);
      const color = getRandomColor();
      const promise = this.api.createCar({ name, color, id });
      createCarPromises.push(promise);
    }

    await Promise.all(createCarPromises);

    const carsAmount = await this.api.getCarsAmount();

    this.garageView.title.textContent = `Garage(${carsAmount})`;
    if (this.currentGaragePage === pagesAmount || pagesAmount === 0) {
      this.renderGarage(this.currentGaragePage);
    }
  }

  private selectCar(event: Event) {
    const targetElement = event.target as HTMLElement;
    const unselectedCars = this.cars.filter((car) => !car.isSelected);
    unselectedCars.forEach((car) => car.selectButton.classList.toggle('button_disabled'));
    targetElement.classList.remove('button_disabled');
  }

  private async updateCar() {
    const selectedCar = this.cars.filter((car) => car.isSelected)[0];
    if (selectedCar) {
      const { id } = selectedCar;
      const name = (this.garageView.textInput as HTMLInputElement).value;
      const color = (this.garageView.colorInput as HTMLInputElement).value;
      if (name && color) {
        await this.api.updateCar({ name, color, id });
        this.renderGarage(this.currentGaragePage);
        selectedCar.isSelected = false;
        (this.garageView.textInput as HTMLInputElement).value = '';
        this.garageView.textInput.setAttribute('placeholder', '');
      } else {
        this.garageView.textInput.setAttribute('placeholder', 'please, type in car\'s name');
      }
    } else {
      this.garageView.textInput.setAttribute('placeholder', 'please, select the car');
    }
  }

  private async startCar(id: number) {
    this.garageView.raceButton.classList.add('button_disabled');
    const targetCar = this.cars.filter((car) => car.id === id)[0];
    targetCar.isStopped = false;
    targetCar.startButton.classList.add('button_disabled');
    targetCar.selectButton.classList.add('button_disabled');
    targetCar.removeButton.classList.add('button_disabled');
    targetCar.stopButton.classList.remove('button_disabled');
    const data = await this.api.start(id);
    const { velocity } = data;
    const { distance } = data;
    const time = Number(Number(distance / velocity / 1000).toFixed(2));
    targetCar.time = time;
    targetCar.startAnimation(time);
    const engineState = await this.api.drive(id);
    if (engineState.status === 500) {
      targetCar.stopAnimation();
    }
  }

  private async stopCar(id: number) {
    const targetCar = this.cars.filter((car) => car.id === id)[0];
    targetCar.isStopped = true;
    targetCar.stopButton.classList.add('button_disabled');
    targetCar.startButton.classList.remove('button_disabled');
    targetCar.selectButton.classList.remove('button_disabled');
    targetCar.removeButton.classList.remove('button_disabled');
    await this.api.stop(id);
    targetCar.getCarBack();
    if (this.cars.every((car) => car.isStopped)) {
      this.garageView.raceButton.classList.remove('button_disabled');
    }
  }

  private async startRace() {
    this.garageView.raceButton.classList.add('button_disabled');
    this.garageView.garage.addEventListener('animationend', this.boundDefineWinner);
    const promises = this.cars.map((car) => this.startCar(car.id));
    await Promise.all(promises);
  }

  private async reset() {
    this.garageView.raceButton.classList.add('button_disabled');
    this.garageView.hideWinner();
    const promises = this.cars.map((car) => this.stopCar(car.id));
    await Promise.all(promises);
    this.garageView.raceButton.classList.remove('button_disabled');
  }

  private async defineWinner(event: AnimationEvent): Promise<void> {
    this.garageView.garage.removeEventListener('animationend', this.boundDefineWinner);
    this.winner = this.cars.find((car) => event.target === car.car);
    this.winner.wins += 1;
    this.garageView.winnerMessage.textContent = `${this.winner.name} wins with time ${this.winner.time}s`;
    await this.addWinner();
    this.garageView.showWinner();
  }

  private async renderWinners(page: number, sort = '', order = '') {
    const winners = await this.api.getWinners(page, sort, order);
    const pagesAmount = await this.api.getWinnersPagesAmount();
    const winnersAmount = await this.api.getWinnersAmount();
    this.winnersView.title.textContent = `Winners (${winnersAmount})`;
    this.winnersView.pageNumber.textContent = `Page #${this.currentWinnersPage}`;
    this.winnersView.chartBody.innerHTML = '';

    winners.forEach(async (winner, index) => {
      const winnersChartItem = this.winnersView.addWinner(index, page, winner);

      const carData = await this.api.getCar(winner.id);
      const { color, name } = carData;

      winnersChartItem.carIcon.children[0].setAttribute('fill', color);
      winnersChartItem.name.textContent = name;
    });

    if (this.currentWinnersPage < pagesAmount) {
      this.winnersView.nextButton.classList.remove('button_disabled');
    } else {
      this.winnersView.nextButton.classList.add('button_disabled');
    }
    if (this.currentWinnersPage > 1) {
      this.winnersView.prevButton.classList.remove('button_disabled');
    } else {
      this.winnersView.prevButton.classList.add('button_disabled');
    }
  }

  private async sortWinnersByTime() {
    this.sortingParam = 'time';
    this.sortingOrder = this.sortingOrder === 'ACS' ? 'DESC' : 'ACS';
    this.renderWinners(this.currentWinnersPage, this.sortingParam, this.sortingOrder);
  }

  private async sortWinnersByTWins() {
    this.sortingParam = 'wins';
    this.sortingOrder = this.sortingOrder === 'ACS' ? 'DESC' : 'ACS';
    this.renderWinners(this.currentWinnersPage, this.sortingParam, this.sortingOrder);
  }

  private async nextWinnersPage() {
    const pagesAmount = await this.api.getWinnersPagesAmount();
    if (this.currentWinnersPage < pagesAmount) {
      this.currentWinnersPage += 1;
      this.renderWinners(this.currentWinnersPage);
    }
  }

  private prevWinnersPage() {
    if (this.currentWinnersPage > 1) {
      this.currentWinnersPage -= 1;
      this.renderWinners(this.currentWinnersPage);
    }
  }

  private async addWinner() {
    const allWinners = await this.api.getWinners();
    const { id, wins } = this.winner;
    let { time } = this.winner;
    if (allWinners.some((winner) => winner.id === id)) {
      const existingWinner = allWinners.find((winner) => winner.id === id);
      time = Math.min(time, existingWinner.time);
      await this.api.updateWinner({ id, wins, time });
    } else {
      await this.api.createWinner({ id, wins, time });
    }
  }
}
