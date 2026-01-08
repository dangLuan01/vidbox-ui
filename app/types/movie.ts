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