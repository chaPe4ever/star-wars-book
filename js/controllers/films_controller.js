import { fetchFilms } from "../api.js";
import { createCard } from "../components/card.js";
import { Film } from "../models.js";
import {
  clearContainer,
  hideLoading,
  showError,
  showLoading,
} from "../utils.js";

export default class FilmsController {
  constructor({ filmsSection, shipsSection, pilotsSection }) {
    this.filmsSection = filmsSection;
    this.shipsSection = shipsSection;
    this.pilotsSection = pilotsSection;
    this.selectedCard = null;
  }

  selectCard(card) {
    if (!(card instanceof HTMLElement)) {
      throw new TypeError("Tprovided card arg should be of type Element");
    }

    if (this.selectedCard) {
      this.selectedCard.classList.remove("selected");
    }

    card.classList.add("selected");
    this.selectedCard = card;
  }

  renderFilms({ onShowStarshipsCb }) {
    clearContainer(this.filmsSection);
    clearContainer(this.shipsSection);
    clearContainer(this.pilotsSection);
    showLoading(this.filmsSection);
    fetchFilms()
      .then((films) => {
        films.forEach((film) => {
          if (!(film && film instanceof Film)) {
            throw new Error({ message: "film arg should be of type Film" });
          }

          const card = createCard({
            title: film.title,
            contentInnerHTML: `
            <p>${film.openingCrawl}</p>
            <p>Episode ID: ${film.episodeId}</p>
            <p>Release Date: ${film.releaseDate}</p>
        `,
            btnText: "Show starships",
            onBtnClickCb: (card) => {
              this.selectCard(card);
              onShowStarshipsCb(film.starships);
            },
          });

          this.filmsSection.appendChild(card);
        });
      })
      .catch((e) => {
        console.error("Error fetching films:", e);
        clearContainer(this.filmsSection);
        showError(
          this.filmsSection,
          "Failed to fetch fimls. Please try again later"
        );
      })
      .finally(() => hideLoading(this.filmsSection));
  }
}
