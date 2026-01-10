import { Genre } from "@/app/types/genre"

export class GenreService{
    private baseUrl: string
    private language: string

    constructor(){
        this.baseUrl    = "https://api.themoviedb.org/3"
        this.language   = "en-US"
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

    async getGenres(type:"movie" | "tv" = "movie", language = this.language): Promise<Genre[]> {
        const data = await this.request(`/genre/${type}/list?language=${language}`)
        
        const safeData: Genre[] = data?.genres.map((g: Genre) => ({
            id: g.id,
            name: g.name
        }))
       
        return safeData as Genre[] || []
    }

    async getAllGenres(language = this.language): Promise<Genre[]> { 
        const [movieGenres, tvGenres] = await Promise.all([ 
            this.getGenres("movie", language), 
            this.getGenres("tv", language),
        ])

        return [...movieGenres, ...tvGenres] 
    }
}


