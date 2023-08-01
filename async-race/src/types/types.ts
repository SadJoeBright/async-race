export interface ElementOptions {
  tagName: string;
  classNames: string[];
  textContent?: string;
  parentNode?: HTMLElement;
  eventHandler?: (event: Event | MouseEvent | KeyboardEvent) => void;
  eventType?: string;
}

export interface CarNames {
  brand: string[],
  model: string[],
}

export interface CarData {
  name: string,
  color: string,
  id: number,
}

export interface EngineResponce {
  velocity: number,
  distance: number
}

export interface WinnerData {
  id: number,
  wins: number,
  time: number
}
