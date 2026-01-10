export interface Images {
    backdrops: Image[]
    posters: Image[]
    logo: Image
}

export interface Image {
    id: number
    iso_639_1: string,
    file_path: string,
}