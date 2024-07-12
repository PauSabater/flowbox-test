import { Card } from '@components/Card/Card'
import styles from './slider.module.scss'
import { useSelector } from 'react-redux'
import type { RootState } from '@store/store'
import {  useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { IResponseImage } from 'src/pages/api/generateApiResponse'
import { Controls } from './components/Controls/Controls'


/**
 * Renders a list of Cards
 *
 * @param {IResponseImage[]}   props.apiResponse     - Text describing the image
 */
export function Slider({apiResponse}: {apiResponse: IResponseImage[]} ) {

    const displayStyle = useSelector((state: RootState) => state.app.displayStyle)
    const refContent = useRef(null)
    const [horizontalScrollPos, setHorizontalScrollPos] = useState(0)
    const [translateDistance, setTranslateDistance] = useState(0)
    const [currentSlideNumber, setCurrentSlideNumber] = useState(0)

    useLayoutEffect(()=> {
        setTimeout(()=> {
            const elContent: HTMLElement | null = refContent.current
            if (elContent) setTranslateDistance((elContent as HTMLElement).offsetHeight)
        }, 50)
    }, [])

    useEffect(()=> {
        if (displayStyle === 'slider') {
            setTimeout(()=> {
                const elContent: HTMLElement | null = refContent.current
                if (elContent) setTranslateDistance((elContent as HTMLElement).offsetHeight)
            }, 50)
        }
    },[displayStyle])

    const getLoadingType = (currentPos: number): 'lazy' | 'eager' => {
        if (currentPos > 15) return 'lazy'
        return 'eager'
    }

    const moveLeft = (positions = 1)=> {
        if (currentSlideNumber > 0) {
            setCurrentSlideNumber(currentSlideNumber - positions)
            setHorizontalScrollPos(horizontalScrollPos + (translateDistance * positions) + (10  * positions))
        } else {
            // Trigger bounce at the end:
            triggerBouce(true)
        }
    }

    const moveRight = (positions = 1)=> {
        if (currentSlideNumber < (apiResponse.length - 2)) {
            setCurrentSlideNumber(currentSlideNumber + positions)
            setHorizontalScrollPos(horizontalScrollPos - (translateDistance * positions) - (10  * positions))
        } else {
            // Trigger bounce at the end:
            triggerBouce(false)
        }
    }

    const triggerBouce = (isLeft: boolean)=> {
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