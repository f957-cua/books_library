import { AbstractView } from "../../common/view.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";

export default class MainView extends AbstractView {
  state = {
    list: [],
    searchQuery: undefined,
    loading: false,
    offset: 0,
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.setTitle("Book searching");
  }

  appStateHook(path, value) {
    if (path === "favorites") {
      console.log(path);
      console.log(value);
    }
  }

  render() {
    const div = document.createElement("div");
    div.innerHTML = `Count of books: ${this.appState.favorites.length}`;
    this.app.innerHTML = "";
    this.app.append(div);
    this.renderHeader(this.appState);
  }

  renderHeader(appState) {
    const header = new Header(appState).render();
    this.app.prepend(header);
  }
}
