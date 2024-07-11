import type { ICard } from '@components/Card/Card'
import { Card } from '@components/Card/Card'
import styles from './slider.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@store/store'
import { setDisplayStyle } from '@store/appSlice'
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { IResponseImage } from 'src/pages/api/images'

type TCardsListLayout = 'grid' | 'list' | 'slider'

interface ICardsList {
    apiInitialResponse: IResponseImage[]
}

/**
 * Renders a list of Cards
 *
 * @param {IResponseImage[]}   props.apiInitialResponse     - Text describing the image
 */
export function Slider({apiInitialResponse}: {apiInitialResponse: IResponseImage[]} ) {

    const displayStyle = useSelector((state: RootState) => state.app.displayStyle)
    const refContent = useRef(null)

    const [horizontalScrollPos, setHorizontalScrollPos] = useState(0)
    const [translateDistance, setTranslateDistance] = useState(0)

    useEffect(()=> {
        console.log("HELOOO")



        const fetchData = async ()=> {
            const response = await fetch(`https://api.unsplash.com/search/photos?query=${'nature'}&per_page=27&page=${'2'}`, {
                headers: {
                    Authorization: `Client-ID -FYr5Hviy6RDha69QhVn7ml4ZXHw6W2cgppbvGbNz08`
                }
        })

            const data = await response.json()
            const test = JSON.stringify(response)
        }

        // fetchData()
    }, [])

    useLayoutEffect(()=> {
        if (refContent.current) {
            setTranslateDistance((refContent.current as HTMLElement).offsetHeight)
        }
    })


    const getLoadingType = (currentPos: number): 'lazy' | 'eager' => {
        if (currentPos > 15) return 'lazy'
        return 'eager'
    }

    const moveLeft = ()=> {
        setHorizontalScrollPos(horizontalScrollPos + translateDistance + 10)
    }

    const moveRight = ()=> {
        console.log("HEY CLICK")
        setHorizontalScrollPos(horizontalScrollPos - translateDistance - 10)
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
                        apiInitialResponse.map((cardData, i)=> {
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
            </div>

            <div className={styles.controlsContainer}>
                <button
                    className={styles.arrowLeft}
                    onClick={moveLeft}
                >
                    <Arrow />
                </button>
                <button
                    className={styles.arrowRight}
                    onClick={moveRight}
                >
                    <Arrow />
                </button>

            </div>
        </div>
    )
}

const Arrow = ()=> {
    return (
        <svg viewBox="0 0 27 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.55514 17.7814L23.8753 1.76029C24.8678 1.04792 26.25 1.75722 26.25 2.97887L26.25 35.0211C26.25 36.2428 24.8678 36.9521 23.8753 36.2397L1.55514 20.2186C0.721383 19.6201 0.721384 18.3799 1.55514 17.7814Z"
                fill="transparent"
                stroke="var(--c-grey-light)"
                strokeWidth={1}
            />
        </svg>
    )
}