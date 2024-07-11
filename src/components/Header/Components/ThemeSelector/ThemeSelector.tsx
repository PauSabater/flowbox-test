import styles from './themeSelector.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@store/store'
import { setDisplayStyle, type TImageThemes } from '@store/appSlice'
import { setCurrentTheme } from '@store/appSlice'
import { setThemePersist } from '@store/persist'

type TCardsListLayout = 'grid' | 'list' | 'slider'

interface IThemesSelector {
    themes: TImageThemes[]
}

/**
 * Renders the themes buttons to select the types of images to display
 *
 * @param {TImageThemes}   props.themes         - Source for the image
 */
export function ThemeSelector({themes}: IThemesSelector) {

    // const themes: TImageThemes = ['nature', 'architecture', 'animals', 'fashion', 'food']

    const currentTheme = useSelector((state: RootState) => state.app.currentTheme)
    const dataImages = useSelector((state: RootState) => state.app.dataImages)
    const displayStyle = useSelector((state: RootState) => state.app.displayStyle)
    const dispatch: AppDispatch = useDispatch()

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
                                onClick={() => {
                                    setThemePersist(themes[i])
                                    dispatch(setCurrentTheme(themes[i]))
                                }}
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