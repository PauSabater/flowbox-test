import styles from './displaySelector.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@store/store'
import { setDisplayStyle, type TDisplayStyle } from '@store/appSlice'
import { setDisplaStylePersist } from '@store/persist'


/**
 * Renders a selector to change the display style of the images
 *
 * @return {JSX.Element} - DisplaySelector component
 */
export function DisplaySelector(): JSX.Element {

    const displayStyles: TDisplayStyle[] = ['masonry', 'grid', 'list', 'slider']
    const displayStyle = useSelector((state: RootState) => state.app.displayStyle) || 'masonry'
    const dispatch: AppDispatch = useDispatch()

    return (
        <div className={styles.themeSelector}>
            <div className={styles.container}>
            {
                displayStyles.map((displayName: string, i)=> {
                    return (
                        <button
                            key={`btn-display-${i}`}
                            data-selected={displayStyle === displayName}
                            className={styles.button}
                            onClick={() => {
                                setDisplaStylePersist(displayStyles[i])
                                dispatch(setDisplayStyle(displayStyles[i]))
                            }}
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

/**
 * Renders an icon
 *
 * @param  {string}         props.src      - Icon source
 * @return {JSX.Element} - DisplayIcon component
 */
const DisplayIcon = ({src}: {src: string}): JSX.Element=> {
    return (
        <img data-inversed className={styles.icon} src={src}></img>
    )
}