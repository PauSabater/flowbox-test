import styles from './app.module.scss'
import { Provider } from 'react-redux'
import store from '@store/store'
import { Header } from '@components/Header/Header'
import '@styles/variables.scss'
import type { IResponseImage } from 'src/pages/api/generateApiResponse'
import { Main } from '@components/Main/Main'

/**
 * Renders the root component for the aplication
 *
 * @param {IResponseImage[]}   props.apiInitialResponse     - Array of images to display from the API
 * @return {JSX.Element} - App component
 */
export function App({apiInitialResponse}: {apiInitialResponse: IResponseImage[]}): JSX.Element {

    return (
        <div className={styles.container}>

            <Provider store={store}>
                <Header
                    themes={['nature', 'architecture', 'animals', 'fashion', 'food']}
                />
                <Main apiInitialResponse={apiInitialResponse} />
            </Provider>

        </div>
    )
}