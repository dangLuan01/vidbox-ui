import { Movie } from "@/app/types/movie"

export class TopicService {
    private baseUrl: string
    private baseUrlImage: string
    private baseWsrv: string

    constructor(){
        this.baseUrl        = "https://api.themoviedb.org/3"
        this.baseUrlImage   = "https://image.tmdb.org"
        this.baseWsrv       = "https://wsrv.nl/?url="
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

    async getTopicMovies(url:string, media_type:string, language = "en-US"): Promise<Movie[]> {
        const data = await this.request(`${url}`)
        
        const safeData: Movie[] = data?.results.map((t: Movie) => ({
            id: t.id,
            poster_path: this.baseWsrv + this.baseUrlImage + '/t/p/w342' + t.poster_path,
            backdrop_path: this.baseWsrv + this.baseUrlImage + '/t/p/w500' + t.backdrop_path,
            title: t.title ? t.title : t.name,
            original_language: t.original_language,
            first_air_date: t.first_air_date,
            overview: t.overview,
            media_type: t.media_type ? t.media_type : media_type,
            release_date: t.release_date ? t.release_date : t.first_air_date,
            vote_average: t.vote_average,
        }))

        return safeData as Movie[] || []
    }

}