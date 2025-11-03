import { fetchPilot } from "../api.js";
import { createCard } from "../components/card.js";
import { Pilot } from "../models.js";
import {
  clearContainer,
  hideLoading,
  showError,
  showLoading,
} from "../utils.js";

export default class pilotsController {
  constructor({ pilotsSection }) {
    this.pilotsSection = pilotsSection;
  }

  renderPilots({ pilots, onAddToFavoritesCb }) {
    clearContainer(this.pilotsSection);
    showLoading(this.pilotsSection);
    Promise.all(pilots.map((pilotUrl) => fetchPilot({ path: pilotUrl })))
      .then((pilots) => {
        pilots.forEach((pilot) => {
          if (!(pilot && pilot instanceof Pilot)) {
            throw new Error({
              message: "pilot arg shoulde be of type Pilot",
            });
          }

          const card = createCard({
            isTogglable: false,
            isExpanded: true,
            title: pilot.name,
            btnText: "Add favorite",
            contentInnerHTML: `
                                <p>Height: ${pilot.height}</p>
                                <p>Mass: ${pilot.mass}</p>
                                <p>Birth Year: ${pilot.birthYear}</p>
                                <p>Gender: ${pilot.gender}</p>
                            `,
            onBtnClickCb: () => onAddToFavoritesCb(pilot),
          });

          this.pilotsSection.appendChild(card);
        });
      })
      .catch((e) => {
        console.error("Error fetching pilots:", e);
        clearContainer(this.pilotsSection);
        showError(
          this.pilotsSection,
          "Failed to fetch pilors. Please try again later"
        );
      })
      .finally(() => hideLoading(this.pilotsSection));
  }
}
