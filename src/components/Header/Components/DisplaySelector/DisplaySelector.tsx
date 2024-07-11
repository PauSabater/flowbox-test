import styles from './displaySelector.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@store/store'
import { setDisplayStyle, type TDisplayStyle, type TImageThemes } from '@store/appSlice'
import { setCurrentTheme } from '@store/appSlice'


/**
 * Renders the themes buttons to select the types of images to display
 *
 */
export function DisplaySelector() {

    const displayStyles: TDisplayStyle[] = ['masonry', 'grid', 'list', 'slider']

    const currentTheme = useSelector((state: RootState) => state.app.currentTheme)
    const dataImages = useSelector((state: RootState) => state.app.dataImages)
    const displayStyle = useSelector((state: RootState) => state.app.displayStyle)
    const dispatch: AppDispatch = useDispatch()

    return (
        <div className={styles.themeSelector}>
            <div className={styles.container}>
                <p>Display style:</p>
            {
                displayStyles.map((displayName: string, i)=> {
                    return (
                        <button
                            key={`btn-display-${i}`}
                            data-selected={displayStyle === displayName}
                            className={styles.button}
                            onClick={() => dispatch(setDisplayStyle(displayStyles[i]))}
                        >
                            <DisplayIcon src={`/${displayName}.svg`}/>
                        </button>
                    )
                })
            }
            </div>
        </div>
    )
}

const DisplayIcon = ({src}: {src: string})=> {
    return (
        <img className={styles.icon} src={src}></img>
    )
}