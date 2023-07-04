/* eslint-disable class-methods-use-this */
import '../../global.css';
import createElement from '../utils/create-element';
import table from '../table/table';
import levelSideBar from '../levelViewer/level-viewer';
import editor from '../editor/editor';

class App {
  constructor() {
    this.createView();
  }

  public createView(): void {
    const mainContainer = createElement({
      tagName: 'div',
      classNames: ['main-container'],
      parentNode: document.body,
    });
    const tableView = table;
    const levelView = levelSideBar;
    const editorView = editor;
    mainContainer.append(tableView, editorView);
    document.body.append(levelView);
  }
}

export default App;
