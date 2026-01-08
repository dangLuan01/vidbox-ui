import { Genre } from "@/app/types/genre"

export class GenreService{
    private baseUrl: string

    constructor(){
        this.baseUrl = "https://api.themoviedb.org/3"
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

    async getGenres(type:"movie" | "tv" = "movie", language = "en-US"): Promise<Genre[]> {
        const data = await this.request(`/genre/${type}/list?language=${language}`)
        
        const safeData: Genre[] = data?.genres.map((g: Genre) => ({
            id: g.id,
            name: g.name
        }))
       
        return safeData as Genre[] || []
    }

    async getAllGenres(language = "en-US"): Promise<Genre[]> { 
        const [movieGenres, tvGenres] = await Promise.all([ 
            this.getGenres("movie", language), 
            this.getGenres("tv", language),
        ])

        return [...movieGenres, ...tvGenres] 
    }
}


