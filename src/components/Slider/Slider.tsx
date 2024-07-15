import { Card } from '../../components/Card/Card'
import styles from './slider.module.scss'
import { useSelector } from 'react-redux'
import type { RootState } from '@store/store'
import {  useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { IResponseImage } from 'src/pages/api/generateApiResponse'
import { Controls } from './components/Controls/Controls'


/**
 * Renders a slider with a list of Cards
 *
 * @param {IResponseImage[]}   props.apiResponse     - Images data from the API
 * @return {JSX.Element} - Slider component
 */
export function Slider({apiResponse}: {apiResponse: IResponseImage[]} ): JSX.Element {

    const displayStyle = useSelector((state: RootState) => state.app.displayStyle)
    const refContent = useRef(null)

    // Keeps track of the horizontal scroll position
    const [horizontalScrollPos, setHorizontalScrollPos] = useState(0)
    // Keeps track of the distance to translate the slider
    const [translateDistance, setTranslateDistance] = useState(0)
    // Keeps track of the current slide number
    const [currentSlideNumber, setCurrentSlideNumber] = useState(0)
    // Keeps track of the current window height to reset the slider
    const [currentWindowHeight, setCurrentWindowHeight] = useState(0)

    /*
     * Set the translate distance after the content is loaded
     */
    useLayoutEffect(()=> {
        setCurrentWindowHeight(window.innerHeight)

        setTimeout(()=> {
            const elContent: HTMLElement | null = refContent.current
            if (elContent) setTranslateDistance((elContent as HTMLElement).offsetHeight)
        }, 50)
    }, [])

    /*
     * Set the translate distance after the display style changes
     */
    useEffect(()=> {
        if (displayStyle === 'slider') {
            setTimeout(()=> {
                const elContent: HTMLElement | null = refContent.current
                if (elContent) setTranslateDistance((elContent as HTMLElement).offsetHeight)
            }, 50)
        }
    },[displayStyle])

    /**
     * Actions on resize to reset translate distance on vertical window resize
     */
    useEffect(()=> {
        addEventListener("resize", () => {
            if (displayStyle === 'slider' && refContent.current && currentWindowHeight !== window.innerHeight) {
                const slideDistance = (refContent.current as HTMLElement).offsetHeight
                setTranslateDistance(slideDistance)
                setHorizontalScrollPos(0)
                setCurrentSlideNumber(0)
                setCurrentWindowHeight(window.innerHeight)
            }
        })
    })

    /**
     * Get the loading type for the image
     *
     * @param {number} currentPos - Current position of the card
     * @return {'lazy' | 'eager'} - Loading type
     */
    const getLoadingType = (currentPos: number): 'lazy' | 'eager' => {
        if (currentPos > 15) return 'lazy'
        return 'eager'
    }

    /**
     * Move the slider to the left
     *
     * @param {number} positions - Number of positions to move
     * @return {void}
     */
    const moveLeft = (positions: number = 1): void=> {
        if (currentSlideNumber > 0) {
            setCurrentSlideNumber(currentSlideNumber - positions)
            setHorizontalScrollPos(horizontalScrollPos + (translateDistance * positions) + (10  * positions))
        } else {
            // Trigger bounce at the end:
            triggerBouce(true)
        }
    }

    /**
     * Move the slider to the right
     *
     * @param {number} positions - Number of positions to move
     * @return {void}
     */
    const moveRight = (positions: number = 1): void=> {
        if (currentSlideNumber < (apiResponse.length - 2)) {
            setCurrentSlideNumber(currentSlideNumber + positions)
            setHorizontalScrollPos(horizontalScrollPos - (translateDistance * positions) - (10  * positions))
        } else {
            // Trigger bounce at the end:
            triggerBouce(false)
        }
    }

    /**
     * Trigger bounce effect
     *
     * @param isLeft
     * @return {void}
     */
    const triggerBouce = (isLeft: boolean): void=> {
        // Trigger bounce at the end:
        const finalPos = isLeft ? 0 : horizontalScrollPos
        const distance = isLeft
            ? horizontalScrollPos + (translateDistance / 5)
            : horizontalScrollPos - (translateDistance / 5)

        setHorizontalScrollPos(distance)
        setTimeout(()=> {
            setHorizontalScrollPos(finalPos)
        }, 100)
    }

    /**
     * Actions on range change
     *
     * @param {string} value  - Value of the range
     */
    const onRangeChange = (value: string)=> {
        const numRange = parseInt(value)
        const posDiference = numRange - currentSlideNumber

        if (numRange > currentSlideNumber) {
            moveRight(posDiference)
        }
        else {
            moveLeft(posDiference * -1)
        }
    }

    return (
        <div data-display-style={displayStyle} className={styles.slider}>

            <div className={styles.sliderContainer}>
                <div
                    ref={refContent}
                    className={styles.slideingContent}
                    style={{ 'transform': `translateX(${horizontalScrollPos}px)` }}
                >

                    {
                        apiResponse.map((cardData, i)=> {
                            return (
                                <Card
                                    {...cardData}
                                    loading={getLoadingType(i)}
                                    isSlider={true}
                                    key={`card-${i}`}
                                />
                            )
                        })
                    }

                </div>
                <div className={styles.gradient}></div>
            </div>

            <Controls
                onClickLeft={moveLeft}
                onClickRight={moveRight}
                currentPos={currentSlideNumber}
                totalPos={apiResponse.length}
                callbackRangeChange={onRangeChange}
            />
        </div>
    )
}