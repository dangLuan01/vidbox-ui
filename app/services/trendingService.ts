import { Movie } from "@/app/types/movie"
import { Image } from "@/app/types/images"

export class TrendingService {
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

    async getMovieDayTrending(language = this.language): Promise<Movie[]> { 
        const data = await this.request(`/trending/all/day?language=${language}`)

        const safeData: Movie[] = data?.results.map((t: Movie) => ({
            id: t.id,
            backdrop_path: this.baseWsrv + this.baseUrlImage + '/t/p/original' + t.backdrop_path,
            title: t.title ? t.title : t.name,
            overview: t.overview,
            media_type: t.media_type,
            release_date: t.release_date ? t.release_date : t.first_air_date,
            vote_average: t.vote_average
        }))

        return safeData as Movie[] || []
    }

    async getLogosTrendingMovies(movies: Movie[], language = this.language): Promise<Image[]> {
        const results = await Promise.all(
            movies.map(async (m) => {
            const data = await this.request(`/${m.media_type === "movie" ? "movie" : "tv"}/${m.id}/images?include_image_language=${language}`)
            const firstLogo = data?.logos?.[0]
            return firstLogo
                ? {
                    id: data?.id,
                    file_path: this.baseUrlImage + "/t/p/w300" + firstLogo.file_path,
                    iso_639_1: firstLogo.iso_639_1,
                }
                : null
            })
        )
        return results.filter((logo): logo is Image => logo !== null)
    }

    async getMovieWeekTrending(language = this.language): Promise<Movie[]> {
        const data = await this.request(`/trending/all/week?language=${language}`)
        
        const safeData: Movie[] = data?.results.map((t: Movie) => ({
            id: t.id,
            backdrop_path: this.baseWsrv + this.baseUrlImage + '/t/p/w300' + t.backdrop_path,
            title: t.title ? t.title: t.name,
            genre_ids: t.genre_ids
        }))

        return safeData as Movie[] || []
    }
}