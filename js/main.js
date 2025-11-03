import { FavoritePilotsStore } from "./store.js";
import {
  FavoritesController,
  FilmsController,
  PilotsController,
  ShipsController,
} from "./controllers/index.js";

// Setup
const filmsSection = document.querySelector(".films");
const shipsSection = document.querySelector(".starships");
const pilotsSection = document.querySelector(".pilots");
const favoritesSection = document.querySelector(".favorites");

const favoritePilotsStore = new FavoritePilotsStore();
const filmsController = new FilmsController({
  filmsSection: filmsSection,
  shipsSection: shipsSection,
  pilotsSection: pilotsSection,
});
const shipsController = new ShipsController({
  starshipsSection: shipsSection,
  pilotsSection: pilotsSection,
});
const pilotsController = new PilotsController({ pilotsSection: pilotsSection });
const favoritesController = new FavoritesController({
  favoritePilotsStore: favoritePilotsStore,
  favoritesSection: favoritesSection,
});

// Main
filmsController.renderFilms({
  onShowStarshipsCb: (starships) =>
    shipsController.renderStarships({
      starships: starships,
      onShowPilotsCb: (pilots) =>
        pilotsController.renderPilots({
          pilots: pilots,
          onAddToFavoritesCb: (pilot) =>
            favoritesController.renderFavoritePilots({
              pilot: pilot,
            }),
        }),
    }),
});
