import { generateApiResponse } from "./generateApiResponse"

export async function GET() {

    let data = await import(`../../data/fashion.json`)

    if (!data) return new Response(
        JSON.stringify({})
    )

    return new Response(
        JSON.stringify({
            results: generateApiResponse(data),
        })
    )
}