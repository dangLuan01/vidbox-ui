import { Provider } from "../types/provider"

export class ProviderService {
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
                    Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
                }, 
                next: { revalidate: 600 }
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

    async getMovieProviders(language = this.language): Promise<Provider[]> { 
        const data = await this.request(`/watch/providers/movie?language=${language}&page=1`)

        const safeData: Provider[] = data?.results.map((p: Provider) => ({
            provider_id: p.provider_id,
            provider_name: p.provider_name,
            logo_path: this.baseUrlImage + '/t/p/original' + p.logo_path,
            display_priority: p.display_priority,
        }))

        return safeData as Provider[] || []
    }
}