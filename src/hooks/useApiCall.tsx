import { useState, useCallback } from 'react'
import type { IResponseImage } from 'src/pages/api/generateApiResponse'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@store/store'
import { setDataImages } from '@store/appSlice'
import { setImagesPersist } from '@store/persist'


export const useApiCall = () => {
    const [data, setData] = useState<IResponseImage[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const dispatch: AppDispatch = useDispatch()


    const callApi = useCallback(async (url: string) => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        setData(result.results)
        dispatch(setDataImages(result.results))
        setImagesPersist(JSON.stringify(result.results))

        } catch (err) {
            setError(err as React.SetStateAction<null>)
        } finally {
            setLoading(false);
        }
    }, [])

    return { data, loading, error, callApi }
}