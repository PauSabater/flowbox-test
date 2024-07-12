import styles from './app.module.scss'
import { Provider } from 'react-redux'
import store from '@store/store'
import { Header } from '@components/Header/Header'
import '@styles/variables.scss'
import type { IResponseImage } from 'src/pages/api/generateApiResponse'
import { Main } from '@components/Main/Main'

/**
 * Renders the root component for the aplication
 */
export function App({apiInitialResponse}: {apiInitialResponse: IResponseImage[]}) {

    return (
        <div className={styles.container}>

            <Provider store={store}>
                <Header
                    themes={['nature', 'architecture', 'animals', 'fashion', 'food']}
                />
                <main className={styles.main}>
                    <Main apiInitialResponse={apiInitialResponse} />
                </main>
            </Provider>

        </div>
    )
}