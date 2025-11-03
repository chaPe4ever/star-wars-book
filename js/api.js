import { Film, Starship, Pilot } from "./models.js";

const host = "https://swapi.constructor-learning.com";
const v1 = "api";

export function fetchFilms() {
  return fetch(`${host}/${v1}/films`)
    .then((res) => {
      if (!res.ok) {
        throw new Error({ message: "Failed to fetch films", code: res.status });
      }
      return res.json();
    })
    .then((films) => {
      return films.results.map((film) => new Film(film));
    });
}

export function fetchStarship({ path }) {
  return fetch(path)
    .then((res) => {
      if (!res.ok) {
        throw new Error({
          mesage: "Failed to fetch starship",
          code: res.status,
        });
      }
      return res.json();
    })
    .then((starship) => new Starship(starship));
}

export function fetchPilot({ path }) {
  return fetch(path)
    .then((res) => {
      if (!res.ok) {
        throw new Error({ message: "Failed to fetch pilot", code: res.status });
      }
      return res.json();
    })
    .then((pilot) => new Pilot(pilot));
}
