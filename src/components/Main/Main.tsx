import '@styles/variables.scss'
import styles from './main.module.scss'
import { CardsList } from '@components/CardsList/CardsList'
import { useSelector } from 'react-redux'
import type { RootState } from '@store/store'
import type { IResponseImage } from 'src/pages/api/generateApiResponse'
import { Slider } from '@components/Slider/Slider'
import { useEffect } from 'react'
import { useApiCall } from 'src/hooks/useApiCall'

/**
 * Renders the root component for the aplication
 */
export function Main({apiInitialResponse}: {apiInitialResponse: IResponseImage[]}) {

    const currentTheme = useSelector((state: RootState) => state.app.currentTheme)
    const { data, callApi } = useApiCall()

    // Call api to update images data on theme change:
    useEffect(()=> {
        callApi(`http://localhost:4321/api/${currentTheme}`)
    },[currentTheme])


    return (
        <main className={styles.main}>
            <Slider apiResponse={data
                ? data as IResponseImage[]
                : apiInitialResponse
            }/>
            <CardsList apiResponse={data
                ? data as IResponseImage[]
                : apiInitialResponse
            } />
        </main>
    )
}