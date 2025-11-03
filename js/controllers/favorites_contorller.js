import { createCard } from "../components/card.js";
import { clearContainer } from "../utils.js";

export default class FavoritesController {
  constructor({ favoritePilotsStore, favoritesSection }) {
    this.favoritePilotsStore = favoritePilotsStore;
    this.favoritesSection = favoritesSection;
  }

  renderFavoritePilots({ pilot }) {
    if (!this.favoritePilotsStore.hasPilot(pilot)) {
      this.favoritePilotsStore.addPilot(pilot);
      // Re-render favorites
      this.render();
    }
  }

  render() {
    clearContainer(this.favoritesSection);

    this.favoritePilotsStore.store.forEach((pilot) => {
      const favoriteCard = createCard({
        title: pilot.name,
        btnText: "Remove from favorites",
        onBtnClickCb: () => {
          this.favoritePilotsStore.removePilot(pilot);
          // Refresh
          this.render();
        },
      });

      this.favoritesSection.appendChild(favoriteCard);
    });
  }
}
