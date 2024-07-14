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
 * Renders the controls for the slider
 *
 * @param {Function}   props.onClickLeft         - Function to execute on left arrow click
 * @param {Function}   props.onClickRight        - Function to execute on right arrow click
 * @param {Function}   props.callbackRangeChange - Function to execute on range change
 * @param {number}     props.currentPos          - Current position of the slider
 * @param {number}     props.totalPos            - Total number of positions
 * @return {JSX.Element} - Controls component
 */
export function Controls({
    onClickLeft,
    onClickRight,
    currentPos,
    totalPos,
    callbackRangeChange
}: IControls ): JSX.Element {

    /**
     * Executes the callback function on range change
     *
     * @param {ChangeEvent<HTMLInputElement>} e - Event object
     * @return {void}
     */
    const onRangeChange = (e: ChangeEvent<HTMLInputElement>): void=> {
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

/**
 * Renders an arrow
 *
 * @return {JSX.Element} - Arrow component
 */
const Arrow = (): JSX.Element=> {
    return (
        <svg viewBox="0 0 27 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.55514 17.7814L23.8753 1.76029C24.8678 1.04792 26.25 1.75722 26.25 2.97887L26.25 35.0211C26.25 36.2428 24.8678 36.9521 23.8753 36.2397L1.55514 20.2186C0.721383 19.6201 0.721384 18.3799 1.55514 17.7814Z"
                fill="var(--c-grey-light)"
                stroke="var(--c-br-transparent)"
                strokeWidth={1}
            />
        </svg>
    )
}