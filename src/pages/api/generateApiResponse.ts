export function generateApiResponse(dataReponse: any) {

    if (!dataReponse) return new Response(
        JSON.stringify({})
    )

    let response: IResponseImage[] = []

    for(const item of dataReponse.results.values()) {
        response.push({
            width: item?.width?.toString() || '',
            height: item?.height?.toString(),
            created: item?.created_at || '',
            updated: item?.updated_at || '',
            description: item?.description || '',
            alt: item?.alt_description || '',
            urlSmall: item?.urls?.small || '',
            urlMedium: item?.urls?.regular || '',
            user: `${item?.user.first_name || ''} ${item?.user.last_name || ''}`,
            userImg: item?.user.profile_image?.medium || '',
            likes: item?.likes.toString() || '',
        })
    }

    return response
}

export interface IResponseImage {
    width: string,
    height: string,
    created: string,
    updated: string,
    description: string,
    alt: string,
    urlSmall: string,
    urlMedium: string,
    user: string,
    userImg: string,
    likes: string
}