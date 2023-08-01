import AppView from '../view/appView';
import Controller from '../controller/controller';

export default class App {
  appView: AppView;

  controller: Controller;

  constructor() {
    this.controller = new Controller();
  }

  public start(): void {
    this.controller.appView.create();
  }
}
