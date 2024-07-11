import type { ICard } from '@components/Card/Card'
import { Card } from '@components/Card/Card'
import styles from './header.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@store/store'
import { setDisplayStyle, type TImageThemes } from '@store/appSlice'
import { useEffect } from 'react'
import { ThemeSelector } from './Components/ThemeSelector/ThemeSelector'
import { DisplaySelector } from './Components/DisplaySelector/DisplaySelector'

type TCardsListLayout = 'grid' | 'list' | 'slider'

interface IHeader {
    themes: TImageThemes[]
}

/**
 * Renders a list of Cards
 *
 * @param {TCardsListLayout}   props.themes         - Image themes on Themes selector
 */
export function Header({themes}: IHeader) {

    const dataImages = useSelector((state: RootState) => state.app.dataImages)
    const displayStyle = useSelector((state: RootState) => state.app.displayStyle)
    const dispatch: AppDispatch = useDispatch()


    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <img
                    src={'./logo.svg'}
                    className={styles.logo}
                    width="100"
                    height="21"
                />
            </div>
            <div className={styles.containerSelectors}>
                <ThemeSelector
                    themes={themes}
                />
                <DisplaySelector />
            </div>
        </header>
    )
}