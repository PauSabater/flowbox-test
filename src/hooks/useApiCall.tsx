import { useState, useCallback } from 'react'
import type { IResponseImage } from 'src/pages/api/generateApiResponse'


export const useApiCall = () => {
    const [data, setData] = useState<IResponseImage[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    console.log("IEEE IN CALL API")

    const callApi = useCallback(async (url: string) => {
        setLoading(true)
        setError(null)

        console.log("INSIDE")
        console.log(url)

        try {
            const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        console.log("WE ARE IN HOOK NOW, RESULT IS")
        console.log(result)
        setData(result.results)
        } catch (err) {
            setError(err as React.SetStateAction<null>)
        } finally {
            setLoading(false);
        }
    }, [])

    return { data, loading, error, callApi }
}