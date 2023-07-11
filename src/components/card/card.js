import { DivComponent } from "../../common/div-component";
import "./card.css";

export class Card extends DivComponent {
  constructor(appState, cardState) {
    super();
    this.state = appState;
    this.cardState = cardState;
  }

  #addToFavorites() {
    this.state.favorites.push(this.cardState);
  }

  #deleteFromFavorites() {
    this.state.favorites = this.state.favorites.filter(
      (b) => b.key !== this.cardState.key
    );
  }

  render() {
    this.el.classList.add("card_list");
    this.existedInFavorites = this.state.favorites.find(
      (b) => b.key == this.cardState.key
    );
    this.el.innerHTML = `
    <div class="card__img">
        <img src="https://covers.openlibrary.org/b/olid/${
          this.cardState.cover_edition_key
        }-M.jpg" alt="cover" />
    </div>
    <div class="card__info">
        <div class="card__tag">
            ${this.cardState.subject ? this.cardState.subject[0] : "Not found"}
        </div>
        <div class="card__name">
            ${this.cardState.title ? this.cardState.title[0] : "Not found"}
        </div>
        <div class="card__author">
            ${
              this.cardState.author_name
                ? this.cardState.author_name[0]
                : "Not found"
            }
        </div>
        <div class="card__footer">
            <button class="button__add ${
              this.existedInFavorites ? "button__active" : ""
            }">
                ${
                  this.existedInFavorites
                    ? "<img src='/static/favorites.svg' alt='favorites_icon' />"
                    : "<img src='/static/favorite-white.svg' alt='favorite-white_icon' />"
                }
            </button>
        </div>
    </div>
      `;
    if (this.existedInFavorites) {
      this.el
        .querySelector("button")
        .addEventListener("click", this.#deleteFromFavorites.bind(this));
    } else {
      this.el
        .querySelector("button")
        .addEventListener("click", this.#addToFavorites.bind(this));
    }

    return this.el;
  }
}
