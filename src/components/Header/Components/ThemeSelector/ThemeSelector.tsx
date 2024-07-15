import styles from './themeSelector.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@store/store'
import { setSeachValue, type TImageThemes } from '@store/appSlice'
import { setCurrentTheme } from '@store/appSlice'
import { setSearchValuePersist, setThemePersist } from '@store/persist'


interface IThemesSelector {
    themes: TImageThemes[]
}

/**
 * Renders the themes buttons to select the types of images to display
 *
 * @param {TImageThemes}   props.themes         - Source for the image
 */
export function ThemeSelector({themes}: IThemesSelector) {

    const currentTheme = useSelector((state: RootState) => state.app.currentTheme) || ''
    const dispatch: AppDispatch = useDispatch()

    /**
     * Change the theme, storing the value in local storage and redux
     *
     * @param  {TImageThemes} theme - Theme to change
     * @return {void}
     */
    const onThemeChange = (theme: TImageThemes): void => {
        if (theme !== currentTheme) {
            setThemePersist(theme)
            setSearchValuePersist('')
            setSeachValue('')
            dispatch(setCurrentTheme(theme))
        }
    }

    return (
        <div className={styles.themeSelector}>
            <div className={styles.container}>
                {
                    themes.map((theme, i)=> {
                        return (
                            <button
                                key={`btn-theme-${i}`}
                                className={styles.button}
                                data-selected={theme === currentTheme}
                                onClick={()=> onThemeChange(themes[i])}
                                aria-label={`Change to theme ${theme}`}

                            >
                                {theme}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}