import styles from './header.module.scss'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@store/store'
import { setCurrentTheme, setDisplayStyle, setSeachValue, type TDisplayStyle, type TImageThemes } from '@store/appSlice'
import { useEffect } from 'react'
import { ThemeSelector } from './Components/ThemeSelector/ThemeSelector'
import { DisplaySelector } from './Components/DisplaySelector/DisplaySelector'
import { getDisplaStylePersist, getSearchValuePersist } from '@store/persist'
import { getThemePersist } from '@store/persist'
import { SearchBar } from '@components/SearchBar/SeachBar'
import { BtnMode } from '@components/BtnMode/BtnMode'


interface IHeader {
    themes: TImageThemes[]
}

/**
 * Renders the header of the app
 *
 * @param {TImageThemes[]}   props.themes     - Array of themes to display
 */
export function Header({themes}: IHeader) {

    const dispatch: AppDispatch = useDispatch()

    /**
     * Set the display style and theme from the local storage
     * when the component is mounted
     */
    useEffect(()=> {
        dispatch(setDisplayStyle(getDisplaStylePersist() as TDisplayStyle))
        dispatch(setCurrentTheme(getThemePersist() as TImageThemes))
        dispatch(setSeachValue(getSearchValuePersist() as TImageThemes))
    },[])

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <img
                    src={'./logo.svg'}
                    className={styles.logo}
                    width="100"
                    height="21"
                    data-inversed
                />
                <SearchBar />
                <BtnMode />
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