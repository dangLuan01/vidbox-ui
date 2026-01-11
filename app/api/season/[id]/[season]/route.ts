import { NextResponse } from "next/server"
import { DetailService } from "@/app/services/detailService"

export async function GET(
  req: Request,
  ctx: { params: Promise<{ id: string; season: string }> }
) {
  try {
    const params = await ctx.params
    const seasonService = new DetailService()
    const { searchParams } = new URL(req.url)
    const language = searchParams.get("language") || "en-US"
    
    const episodes = await seasonService.getSeason(
      params.id,
      params.season,
      language
    )
    return NextResponse.json(episodes)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch season" }, { status: 500 })
  }
}
