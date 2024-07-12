import styles from './themeSelector.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@store/store'
import { type TImageThemes } from '@store/appSlice'
import { setCurrentTheme } from '@store/appSlice'
import { setThemePersist } from '@store/persist'


interface IThemesSelector {
    themes: TImageThemes[]
}

/**
 * Renders the themes buttons to select the types of images to display
 *
 * @param {TImageThemes}   props.themes         - Source for the image
 */
export function ThemeSelector({themes}: IThemesSelector) {

    const currentTheme = useSelector((state: RootState) => state.app.currentTheme)
    const dispatch: AppDispatch = useDispatch()

    const onThemeChange = (theme: TImageThemes)=> {
        if (theme !== currentTheme) {
            setThemePersist(theme)
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