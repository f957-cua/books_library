import { DivComponent } from "../../common/div-component";
import "./search.css";

export class Search extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }

  search() {
    const value = this.el.querySelector("input").value;
    this.state.searchQuery = value;
  }

  render() {
    this.el.classList.add("search");
    this.el.innerHTML = `
        <div class="search__wrapper">
            <input 
            type="text"
            class="search__input"
            placeholder="Type book or author ..."
            value="${this.state.searchQuery ? this.state.searchQuery : ""}" />
            <img src="/static/search.svg" alt="search_icon" />
        </div>
        <button aria-label="Search">
        <img src="/static/search_white.svg" alt="search_icon" />
        </button>
        `;
    this.el
      .querySelector("button")
      .addEventListener("click", this.search.bind(this));
    this.el.querySelector("input").addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        this.search();
      }
    });
    return this.el;
  }
}
