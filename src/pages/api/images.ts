export async function GET({request}: {request: Request}) {

    // Get the URL object from the request
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search)

    // Extract query parameters
    const searchParams: URLSearchParams = url.searchParams;
    const category: string = params.get('category') || 'nature'
    const indexParam: string = params.get('index') || '0'
    const index: number = parseInt(indexParam)
    const limitParam: string = params.get('limit') || '54'
    const limit: number = parseInt(limitParam)

    const data = await import(`../../data/${category}.json`)
    // const objData = JSON.parse(data)

    let response: IResponseImage[] = []

    for(const [i, item] of data.results.entries()) {
        if (i < index) continue
        if (i > index + limit) break

        response.push({
            width: item.width,
            height: item.height,
            created: item.created_at,
            updated: item.updated_at,
            description: item.description,
            alt: item.alt_description,
            urlSmall: item.urls.small,
            user: `${item.user.first_name || ''} ${item.user.last_name || ''}`,
            userImg: item.user.profile_image.medium,
            likes: item.likes
        })
    }

    return new Response(
        JSON.stringify({
            initial: data.results.length,
            limit: limitParam,
            length: response.length,
            results: response,
        })
    )
}

export interface IResponseImage {
    width: string,
    height: string,
    created: string,
    updated: string,
    description: string,
    alt: string,
    urlSmall: string,
    user: string,
    userImg: string,
    likes: string
}