export interface Movie {
  id: number,
  backdrop_path: string,
  title: string,
  name: string,
  original_language: string,
  original_title: string,
  original_name: string,
  overview: string,
  poster_path: string,
  media_type: string,
  release_date: string,
  first_air_date: string,
  vote_average: number,
  genre_ids: number[]
}

export interface MovieDetail {
  id: number,
  backdrop_path: string,
  title: string,
  overview: string,
  poster_path: string,
  release_date: string,
  vote_average: number,
  trailer?: string,
  genres?: Genre[],
  cast?: Cast[],
  recommentdations?: Movie[]
}

export interface TvDetail {
  id: number,
  backdrop_path: string,
  title: string,
  overview: string,
  poster_path: string,
  release_date: string,
  vote_average: number,
  trailer?: string,
  genres?: Genre[],
  cast?: Cast[],
  recommentdations?: Movie[],
  seasons?: Season[],
}

interface Genre {
  id: number,
  name: string
}

export interface Cast {
  id: number,
  name: string,
  profile_path: string,
  character: string
}

export type Season = {
  season_number: number,
  name: string
}

export interface Episode {
  season_number: number,
  episode_number: number,
  name: string,
  still_path: string,
  overview: string,
  air_date: string
}