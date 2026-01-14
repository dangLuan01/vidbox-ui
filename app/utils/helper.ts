export class Helper {
    static formatRuntime(minutes: number) {
        if (!minutes || minutes === 0) { 
            return "00:00:00" 
        } 
        const hrs = Math.floor(minutes / 60) 
        const mins = minutes % 60 
        const secs = 0 
        const pad = (n: number) => String(n).padStart(2, "0") 
        return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`
    }
}