import { generateApiResponse } from "./generateApiResponse"

export async function GET({request}: {request: Request}) {

    let data = await import(`../../data/food.json`)

    if (!data) return new Response(
        JSON.stringify({})
    )

    return new Response(
        JSON.stringify({
            results: generateApiResponse(data),
        })
    )
}