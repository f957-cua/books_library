import { DivComponent } from "../../common/div-component.js";
import { Card } from "../card/card.js";
import "./cardList.css";

export class CardList extends DivComponent {
  constructor(state, parentState) {
    super();
    this.state = state;
    this.parentState = parentState;
  }

  render() {
    if (this.state.loading) {
      this.el.innerHTML = `<div class="card_list__loader">loading files ...</div>`;
      return this.el;
    }
    this.el.innerHTML = `<h1>Loaded: ${this.state.numFound} books</h1>`;
    const cardGrid = document.createElement("div");
    cardGrid.classList.add("card_grid");
    this.el.append(cardGrid);
    for (const card of this.state.list) {
      cardGrid.append(new Card(this.parentState, card).render());
    }
    return this.el;
  }
}
