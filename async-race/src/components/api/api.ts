import { CarData, EngineResponce, WinnerData } from '../../types/types';

export default class Api {
  private baseURL: string;

  private carsPerPageLimit: number;

  private winnersPerPageLimit: number;

  constructor() {
    this.baseURL = 'http://127.0.0.1:3000';
    this.carsPerPageLimit = 7;
    this.winnersPerPageLimit = 10;
  }

  public async createCar(carData: CarData): Promise<CarData> {
    const response = await fetch(`${this.baseURL}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });
    const data: CarData = await response.json();

    return data;
  }

  public async getCars(page: number): Promise<CarData[]> {
    const response = await fetch(`${this.baseURL}/garage?_page=${page}&_limit=${this.carsPerPageLimit}`);
    const data: CarData[] = await response.json();

    return data;
  }

  public async getCar(id: number): Promise<CarData> {
    const response = await fetch(`${this.baseURL}/garage/${id}`);
    const data: CarData = await response.json();

    return data;
  }

  public async updateCar(car: CarData) {
    const response = await fetch(`${this.baseURL}/garage/${car.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });

    return response;
  }

  public async deleteCar(id: number): Promise<Response> {
    const response = await fetch(`${this.baseURL}/garage/${id}`, {
      method: 'DELETE',
    });

    return response;
  }

  public async getCarsAmount(): Promise<number> {
    const response = await fetch(`${this.baseURL}/garage?_limit=${this.carsPerPageLimit}`);
    const carsAmount = Number(response.headers.get('X-Total-Count'));

    return carsAmount;
  }

  public async getCarsPagesAmount() {
    return Math.ceil(await this.getCarsAmount() / this.carsPerPageLimit);
  }

  public async deleteWinner(id: number): Promise<Response> {
    const response = await fetch(`${this.baseURL}/winners/${id}`, {
      method: 'DELETE',
    });

    return response;
  }

  public async start(id: number): Promise<EngineResponce> {
    const response = await fetch(`${this.baseURL}/engine?id=${id}&status=started`, {
      method: 'PATCH',
    });
    const data: EngineResponce = await response.json();

    return data;
  }

  public async drive(id: number): Promise<Response> {
    const response = await fetch(`${this.baseURL}/engine?id=${id}&status=drive`, {
      method: 'PATCH',
    });

    return response;
  }

  public async stop(id: number): Promise<Response> {
    const response = await fetch(`${this.baseURL}/engine?id=${id}&status=stopped`, {
      method: 'PATCH',
    });

    return response;
  }

  public async getWinners(page?: number, sort?: string, order?: string): Promise<WinnerData[]> {
    const pageQueryParam = page ? `&_page=${page}` : '';
    const sortQueryParam = sort ? `&_sort=${sort}` : '';
    const orderQueryParam = order ? `&_order=${order}` : '';

    const response = await fetch(`${this.baseURL}/winners?_limit=${this.winnersPerPageLimit}${pageQueryParam}${sortQueryParam}${orderQueryParam}`);
    const data: WinnerData[] = await response.json();

    return data;
  }

  public async getWinnersAmount() {
    const response = await fetch(`${this.baseURL}/winners?_limit=${this.winnersPerPageLimit}`);
    const winnersAmount = Number(response.headers.get('X-Total-Count'));

    return winnersAmount;
  }

  public async getWinnersPagesAmount() {
    return Math.ceil(await this.getWinnersAmount() / this.winnersPerPageLimit);
  }

  public async createWinner(winner: WinnerData) {
    const response = await fetch(`${this.baseURL}/winners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });

    return response;
  }

  public async updateWinner(winner: WinnerData) {
    const response = await fetch(`${this.baseURL}/winners/${winner.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });

    return response;
  }
}
