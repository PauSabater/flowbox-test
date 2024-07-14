import { useState, useCallback } from 'react'
import { generateApiResponse, type IResponseImage } from 'src/pages/api/generateApiResponse'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@store/store'
import { setDataImages } from '@store/appSlice'
import { setImagesPersist } from '@store/persist'

/**
 * Custom hook to make an API call
 *
 * @return {Object} - Object with the data, loading state, error and the function to make the API call
 */
export const useApiCall = () => {
    const [data, setData] = useState<IResponseImage[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const dispatch: AppDispatch = useDispatch()


    const callApi = useCallback(async (url: string) => {
        setLoading(true)
        setError(null)

        const isUnsplashCall = url.includes('api.unsplash')

        try {
            let response
            if (isUnsplashCall) {
                response = await fetch(url, {
                    headers: {
                      Authorization: `Client-ID -FYr5Hviy6RDha69QhVn7ml4ZXHw6W2cgppbvGbNz08`
                    }
                })
            }
            else {
                response = await fetch(url)
            }
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()

        let resultData = isUnsplashCall
            ? generateApiResponse(result)
            : result.results

        setData(resultData)
        dispatch(setDataImages(resultData))
        setImagesPersist(JSON.stringify(resultData))

        } catch (err) {
            setError(err as React.SetStateAction<null>)
        } finally {
            setLoading(false);
        }
    }, [])

    return { data, loading, error, callApi }
}