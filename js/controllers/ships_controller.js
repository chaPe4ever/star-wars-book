import { fetchStarship } from "../api.js";
import { createCard } from "../components/card.js";
import { Starship } from "../models.js";
import {
  clearContainer,
  hideLoading,
  showError,
  showLoading,
} from "../utils.js";

export default class ShipsController {
  constructor({ starshipsSection, pilotsSection }) {
    this.starshipsSection = starshipsSection;
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

  renderStarships({ starships, onShowPilotsCb }) {
    clearContainer(this.starshipsSection);
    clearContainer(this.pilotsSection);
    showLoading(this.starshipsSection);
    Promise.all(
      starships.map((starshipPath) => fetchStarship({ path: starshipPath }))
    )
      .then((starships) => {
        starships.forEach((starShip) => {
          if (!(starShip && starShip instanceof Starship)) {
            throw new Error({
              message: " starShip arg should be of type Starship",
            });
          }

          const btnText = starShip.pilots.length > 0 ? "Show pilots" : null;
          const card = createCard({
            title: starShip.name,
            contentInnerHTML: `
                   <p>Model: ${starShip.model}</p>
                   <p>Max Atmosphering Speed: ${starShip.maxAtmospheringSpeed}</p>
                   <p>Starship class: ${starShip.maxAtmospheringSpeed}</p>
                  `,
            btnText: btnText,
            onBtnClickCb: (card) => {
              this.selectCard(card);
              onShowPilotsCb(starShip.pilots);
            },
          });

          this.starshipsSection.appendChild(card);
        });
      })
      .catch((e) => {
        console.error("Error fetching starships:", e);
        clearContainer(this.starshipsSection);
        showError(
          this.starshipsSection,
          "Failed to fetch starships. Please try again later"
        );
      })
      .finally(() => hideLoading(this.starshipsSection));
  }
}
