import styles from './controls.module.scss'
import { type ChangeEvent } from 'react'


interface IControls {
    onClickLeft: Function,
    onClickRight: Function,
    callbackRangeChange: Function,
    currentPos: number,
    totalPos: number
}

/**
 * Renders a list of Cards
 *
 * @param {IResponseImage[]}   props.apiInitialResponse     - Text describing the image
 */
export function Controls({
    onClickLeft,
    onClickRight,
    currentPos,
    totalPos,
    callbackRangeChange
}: IControls ) {

    const onRangeChange = (e: ChangeEvent<HTMLInputElement>)=> {
        callbackRangeChange(e.target.value)
    }

    return (
        <>
            <button
                className={styles.arrowLeft}
                onClick={()=> onClickLeft()}
            >
                <Arrow/>
            </button>
            <button
                className={styles.arrowRight}
                onClick={()=> onClickRight()}
            >
                <Arrow/>
            </button>

            <div className={styles.controlsContainer}>
                <button
                    className={styles.arrowLeft}
                    onClick={()=> onClickLeft()}
                >
                    <Arrow />
                </button>
                <input
                    className={styles.range}
                    type='range'
                    min='0'
                    max={totalPos - 3}
                    step='1'
                    onChange={(e)=> onRangeChange(e)}
                    value={currentPos}
                />
                <button
                    className={styles.arrowRight}
                    onClick={()=> onClickRight()}
                >
                    <Arrow />
                </button>
            </div>
        </>
    )
}

const Arrow = ()=> {
    return (
        <svg viewBox="0 0 27 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.55514 17.7814L23.8753 1.76029C24.8678 1.04792 26.25 1.75722 26.25 2.97887L26.25 35.0211C26.25 36.2428 24.8678 36.9521 23.8753 36.2397L1.55514 20.2186C0.721383 19.6201 0.721384 18.3799 1.55514 17.7814Z"
                fill="var(--c-grey-light)"
                stroke="var(--c-grey-light)"
                strokeWidth={1}
            />
        </svg>
    )
}