import { generateApiResponse } from "./generateApiResponse"

export async function GET() {

    let data
    try {
        data = await import(`../../data/animals.json`)
    } catch (error) {
        console.error('Error loading JSON data:', error)
        return new Response(JSON.stringify({}), { status: 500 })
    }

    if (!data) {
        return new Response(JSON.stringify({}), { status: 404 })
    }

    return new Response(
        JSON.stringify({
            results: generateApiResponse(data),
        }), {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
}