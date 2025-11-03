export class Film {
  constructor({
    title,
    episode_id,
    opening_crawl,
    release_date,
    starships,
    ...rest
  }) {
    this.title = title;
    this.episodeId = episode_id;
    this.openingCrawl = opening_crawl;
    this.starships = starships;
    this.releaseDate = release_date;
    Object.assign(this, rest);
  }
}

export class Starship {
  constructor({
    name,
    model,
    max_atmosphering_speed,
    starship_class,
    pilots,
    ...rest
  }) {
    this.name = name;
    this.model = model;
    this.maxAtmospheringSpeed = max_atmosphering_speed;
    this.starshipClass = starship_class;
    this.pilots = pilots;
    Object.assign(this, rest);
  }
}

export class Pilot {
  constructor({ name, height, mass, birth_year, gender, ...rest }) {
    this.name = name;
    this.height = height;
    this.mass = mass;
    this.birthYear = birth_year;
    this.gender = gender;
    Object.assign(this, rest);
  }
}
