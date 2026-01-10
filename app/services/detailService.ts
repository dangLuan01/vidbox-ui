import { Cast, Movie, MovieDetail } from "../types/movie"

export class DetailService {
    private baseUrl: string
    private baseUrlImage: string
    private baseWsrv: string
    private language: string

    constructor(){
        this.baseUrl        = "https://api.themoviedb.org/3"
        this.baseUrlImage   = "https://image.tmdb.org"
        this.baseWsrv       = "https://wsrv.nl/?url="
        this.language       = "en-US"
    }

    private async request(endpoint: string) {
        try { 
            const res = await fetch(`${this.baseUrl}${endpoint}`, { 
                headers: { 
                    Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
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

    async getMovieDetail(id: string, language = this.language): Promise<MovieDetail> { 
            const data = await this.request(`/movie/${id}?append_to_response=credits,videos,recommendations&language=${language}`)
    
            const safeData: MovieDetail = {
                id: data.id,
                backdrop_path: this.baseUrlImage + '/t/p/original' + data.backdrop_path,
                poster_path: this.baseUrlImage + '/t/p/w342' + data.poster_path,
                title: data.title ? data.title : data.name,
                overview: data.overview,
                release_date: data.release_date ? data.release_date : data.first_air_date,
                vote_average: data.vote_average,
                trailer: data.videos.results[0]?.key ?? null,
                genres: data.genres,
                cast: data.credits.cast.filter((c: Cast) => c.profile_path).slice(0, 17).map((c: Cast) => ({
                    id: c.id,
                    name: c.name,
                    character:c.character,
                    profile_path: this.baseUrlImage + '/t/p/w185' + c.profile_path
                })),
                recommentdations: data.recommendations.results.filter((m: Movie) => m.poster_path).slice(0, 18).map((m: Movie)=>({
                    id: m.id,
                    title: m.title ? m.title : m.name,
                    poster_path: this.baseUrlImage + '/t/p/w342' + m.poster_path,
                    media_type: m.media_type,
                    vote_average:m.vote_average,
                    release_date: m.release_date ? m.release_date : m.first_air_date
                }))
            }
    
            return safeData as MovieDetail
        }

}
