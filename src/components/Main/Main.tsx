import '@styles/variables.scss'
import styles from './main.module.scss'
import { CardsList } from '@components/CardsList/CardsList'
import type { IResponseImage } from 'src/pages/api/generateApiResponse'
import { Slider } from '@components/Slider/Slider'
import { useEffect, useRef, useState } from 'react'
import { useApiCall } from 'src/hooks/useApiCall'
import { getImagesPersist } from '@store/persist'
import { setSeachValue } from '@store/appSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@store/store'
import { ModalImage } from '@components/ModalImage/ModalImage'

/**
 * Renders the main element component for the aplication to wrap the content
 *
 * @param {IResponseImage[]}   props.apiInitialResponse     - Array of images to display from the API
 * @return {JSX.Element} - Main component
 */
export function Main({apiInitialResponse}: {apiInitialResponse: IResponseImage[]}): JSX.Element {

    // Get the data from the API
    const { data, callApi } = useApiCall()

    const currentTheme = useSelector((state: RootState) => state.app.currentTheme)
    const searchValue = useSelector((state: RootState) => state.app.searchValue)
    const dispatch: AppDispatch = useDispatch()

    const dataImagesPersisted = getImagesPersist()

    // State to store the images data, if saved on localstorage that will be the initial state
    const [dataImages, setDataImages] = useState<IResponseImage[]>(dataImagesPersisted || apiInitialResponse)
    const [isInitialRender, setIsInitialRender] = useState(true)

    const refSliderAnimWrapper = useRef<HTMLDivElement>(null)
    const refCardsListAnimWrapper = useRef<HTMLDivElement>(null)

    useEffect(()=> {
        setIsInitialRender(false)
    }, [])

    //Call api to update images data from API on theme change:
    useEffect(()=> {

        if (isInitialRender === false || !dataImagesPersisted) {
            const url = window.location.href.includes('localhost')
                ? `http://localhost:4321/api/${currentTheme}`
                : `https://flowbox-test-pau-sabater.vercel.app/api/${currentTheme}`

            callApi(url)
            setIsInitialRender(false)
            dispatch(setSeachValue(''))
        }
    },[currentTheme])

    useEffect(()=> {
        if (!searchValue) return
        callApi(`https://api.unsplash.com/search/photos?query=${searchValue}&per_page=${'100'}&page=${'1'}`)

    },[searchValue])

    /**
     * Actions on API response
     */
    useEffect(()=> {
        if (!data) return
        setDataImages(data)

    },[JSON.stringify(data)])

    useEffect(()=> {
        if (!dataImages) return
    },[JSON.stringify(dataImages)])


    return (
        <>
            <main className={styles.main}>
                <div ref={refSliderAnimWrapper}>
                    <Slider apiResponse={dataImages}/>
                </div>
                <div ref={refCardsListAnimWrapper}>
                    <CardsList apiResponse={dataImages} />
                </div>
            </main>
            <ModalImage/>
        </>
    )
}