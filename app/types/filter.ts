export interface Filters {
  query:string | null
  typeId: string | null
  typeName: string
  genreId: number | null
  genreName: string
  popularId: string | null
  popularName: string
  networkId: number | null
  networkName: string
  year: string | null
  countryId: string | null
  countryName: string
  rating: string | null
}

export interface Type {
    value: string
    name: string
}

export interface Popular {
    value: string
    name: string
}
