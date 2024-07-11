export async function GET({params, request}: {params: any, request: Request}) {


    return new Response(
        JSON.stringify({
            name: 'Astro',
            url: 'https://astro.build/'
        })
    )
}