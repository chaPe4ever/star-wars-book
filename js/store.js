import { Pilot } from "./models.js";

export class FavoritePilotsStore {
  constructor() {
    this._store = new Set();
  }

  addPilot(pilot) {
    if (!(pilot instanceof Pilot)) {
      throw new TypeError("The pilot arg should be of type Pilot");
    }
    this._store.add(pilot);
  }

  removePilot(pilot) {
    if (!(pilot instanceof Pilot)) {
      throw new TypeError("The pilot arg should be of type Pilot");
    }
    this._store.delete(pilot);
  }

  hasPilot(pilot) {
    return this._store.has(pilot);
  }

  get store() {
    return Array.from(this._store);
  }
}
