import styles from './app.module.scss'
import { CardsList } from '@components/CardsList/CardsList'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@store/store'
import { Provider } from 'react-redux'
import store from '@store/store'
import { setDisplayStyle, setdataImages } from '@store/appSlice'
import { Header } from '@components/Header/Header'
import '@styles/variables.scss'
import type { IResponseImage } from 'src/pages/api/images'
import { Route, Routes } from 'react-router-dom'
import { Slider } from '@components/Slider/Slider'

/**
 * Renders the root component for the aplication
 */
export function App({apiInitialResponse}: {apiInitialResponse: IResponseImage[]}) {

    // const dataImages = useSelector((state: RootState) => state.image.dataImages)
    // const displayStyle = useSelector((state: RootState) => state.image.displayStyle)
    // const dispatch: AppDispatch = useDispatch()
    // dispatch(setdataImages(apiInitialResponse))

    return (
        <div className={styles.container}>

            <Provider store={store}>
                <Header
                    themes={['nature', 'architecture', 'animals', 'fashion', 'food']}
                />
                <main className={styles.main}>
                    <Slider apiInitialResponse={apiInitialResponse}/>
                    <CardsList apiInitialResponse={apiInitialResponse} />
                </main>
            </Provider>

        </div>
    )
}