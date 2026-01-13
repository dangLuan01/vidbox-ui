import { Country } from "../types/country"
import { Filters } from "../types/filter"
import { Movie, MovieFilter } from "../types/movie"

export class SearchService {
    private baseUrl: string
    private baseUrlImage: string
    private language: string
    constructor(){
        this.baseUrl        = "https://api.themoviedb.org/3"
        this.baseUrlImage   = "https://image.tmdb.org"
        this.language       = "en-US"
    }

    private async request(endpoint: string) {
        try { 
            const res = await fetch(`${this.baseUrl}${endpoint}`, { 
                headers: { 
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMmViYzQ1NzAyODhlY2QyZDNkZDA3NWQ0YzdkNTRhMSIsIm5iZiI6MTcxMzA2NDc5OC4wNzEsInN1YiI6IjY2MWI0YjVlNGU0ZGZmMDE5ZDAzN2RkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VZt3ZPvg0EhpgrosOCyhyg3-1n_3heWIFy-ElUznCYw`,
                },
                next: { revalidate: 600 }
            }) 

            if (!res.ok) { 
                throw new Error(`Failed to fetch ${endpoint}`) 
            }
            
            return await res.json() 
        } catch (error) { 
            return null 
        } 
    }

    async getCountry(): Promise<Country[]> {
        const data = await this.request('/configuration/countries')
        const safeData: Country [] = data.map((c: Country) => ({
            iso_3166_1: c.iso_3166_1,
            english_name: c.english_name
        }))

        return safeData as Country[] || []
    }

    async searchMovie(query: string, language = this.language, page = "1"): Promise<Movie[]> { 
        const data = await this.request(`/search/multi?query=${query}&include_adult=true&language=${language}&page=${page}`)

        const safeData: Movie[] = data?.results.
            filter((m:any) => m.media_type !== "person").
            map((m: Movie) => ({
            id: m.id,
            poster_path: this.baseUrlImage + '/t/p/w92' + m.poster_path,
            title: m.title ? m.title : m.name,
            first_air_date: m.first_air_date,
            media_type: m.media_type,
            release_date: m.release_date ? m.release_date : m.first_air_date,
            vote_average: m.vote_average ? m.vote_average : 0.0,
        }))

        return safeData as Movie[] || []
    }

    async getFilterMovie(filters: Filters, page: number): Promise<MovieFilter> {

        const params = new URLSearchParams()
        
        if (filters.genreId) params.append("with_genres", filters.genreId.toString())
        if (filters.popularId) params.append("sort_by", filters.popularId)
        if (filters.year) params.append("primary_release_year", filters.year)
        if (filters.countryId) params.append("with_origin_country", filters.countryId)
        if (filters.networkId) {
            params.append("with_watch_providers", filters.networkId.toString())
            if (filters.countryId) {
                params.append("watch_region", filters.countryId)
            } else {
                params.append("watch_region", "US")
            }
        }
        if (filters.rating) params.append("vote_average.gte", filters.rating)
            
        
        var query1 = `/discover/${filters.typeId === 'movie' ? 'movie' : 'tv'}?include_adult=false&language=en-US&page=${page}&${params}`
        if (filters.popularId && filters.popularId === "top_rated") {
            query1 = `/${filters.typeId === 'movie' ? 'movie' : 'tv'}/top_rated?page=${page}&${params}`
        }
        if (filters.query) {
            switch (filters.typeId) {
                case "tv":
                    query1 = `/search/tv?query=${filters.query}&include_adult=true&page=${page}`    
                    break;
                case "movie":
                    query1 = `/search/movie?query=${filters.query}&include_adult=true&page=${page}`
                    break;
                default:
                    query1 = `/search/multi?query=${filters.query}&include_adult=true&page=${page}`
                    break;
            }        
        }
        
        
        const data = await this.request(query1)

        const safeData: MovieFilter = {
            page: data.page,
            total_pages: data.total_pages,
            limit: 20,
            movies: data. results.map((m: Movie) => ({
                id: m.id,
                poster_path: this.baseUrlImage + '/t/p/w342' + m.poster_path,
                title: m.title ? m.title : m.name,
                media_type: m.media_type,
                release_date: m.release_date ? m.release_date : m.first_air_date,
                vote_average: m.vote_average ? m.vote_average : 0.0,
            }))
        }

        return safeData as MovieFilter || null
    }
}