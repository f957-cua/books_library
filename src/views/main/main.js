import { AbstractView } from "../../common/view.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { Search } from "../../components/search/search.js";
import { CardList } from "../../components/cardList/cardList.js";

export default class MainView extends AbstractView {
  state = {
    list: [],
    numFound: 0,
    searchQuery: undefined,
    loading: false,
    offset: 0,
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setTitle("Book searching");
  }

  destroy() {
    onChange.unsubscribe(this.state);
    onChange.unsubscribe(this.appState);
  }

  appStateHook(path) {
    if (path === "favorites") {
      this.render();
    }
  }

  async stateHook(path) {
    if (path === "searchQuery") {
      try {
        this.state.loading = true;
        const data = await this.loadList(
          this.state.searchQuery,
          this.state.offset
        );
        this.state.loading = false;
        this.state.numFound = data.numFound;
        this.state.list = data.docs;
      } catch (error) {
        console.log(error);
      }
    }
    if (path === "list" || path === "loading") {
      this.render();
    }
  }

  async loadList(q, offset) {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${q}&offset=${offset}`
    );
    return res.json();
  }

  render() {
    const main = document.createElement("div");
    main.append(new Search(this.state).render());
    main.append(new CardList(this.state, this.appState).render());
    this.app.innerHTML = "";
    this.app.append(main);
    this.renderHeader(this.appState);
  }

  renderHeader(appState) {
    const header = new Header(appState).render();
    this.app.prepend(header);
  }
}
