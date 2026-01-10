import { Movie } from "../types/movie"

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
            }) 

            if (!res.ok) { 
                throw new Error(`Failed to fetch ${endpoint}`) 
            }
            
            return await res.json() 
        } catch (error) { 
            console.error("API error:", error) 
            return null 
        } 
    }

    async searchMovie(query: string, language = this.language, page = "1"): Promise<Movie[]> { 
        const data = await this.request(`/search/multi?query=${query}&include_adult=true&language=${language}&page=${page}`)

        const safeData: Movie[] = data?.results.filter((m:any) => m.media_type !== "person").map((m: Movie) => ({
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
}