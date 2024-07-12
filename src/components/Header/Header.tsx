import styles from './header.module.scss'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@store/store'
import { setDisplayStyle, type TDisplayStyle, type TImageThemes } from '@store/appSlice'
import { useEffect } from 'react'
import { ThemeSelector } from './Components/ThemeSelector/ThemeSelector'
import { DisplaySelector } from './Components/DisplaySelector/DisplaySelector'
import { getDisplaStylePersist } from '@store/persist'


interface IHeader {
    themes: TImageThemes[]
}

/**
 * Renders a list of Cards
 *
 * @param {TCardsListLayout}   props.themes         - Image themes on Themes selector
 */
export function Header({themes}: IHeader) {

    const dispatch: AppDispatch = useDispatch()

    useEffect(()=> {
        dispatch(setDisplayStyle(getDisplaStylePersist() as TDisplayStyle))
    },[])

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <img
                    src={'./logo.svg'}
                    className={styles.logo}
                    width="100"
                    height="21"
                />
                {/* <ThemeSelector
                    themes={themes}
                />
                <DisplaySelector /> */}
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