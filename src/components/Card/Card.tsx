import styles from './card.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@store/store'
import { setDisplayStyle } from '@store/appSlice'
import type { IResponseImage } from 'src/pages/api/images'
import { Link } from "react-router-dom"
import { useEffect, useRef } from 'react'

export interface ICard {
    description: string,
    srcImage: string,
}

/**
 * Renders an Card with an image and an optionally displayed text
 *
 * @param {string}         props.description      - Text describing the image
 * @param {string}         props.srcImage         - Source for the image
 */
export function Card({
    width,
    height,
    created,
    updated,
    description,
    alt,
    urlSmall,
    user,
    userImg,
    likes
 }: IResponseImage) {

    const displayStyle = useSelector((state: RootState) => state.app.displayStyle)
    const refContainer = useRef<HTMLDivElement>(null)
    const refDescriptionContainer = useRef<HTMLDivElement>(null)

    useEffect(()=> {
        console.log("DISPLAY CHAGED")
        const elContainer: HTMLDivElement | null = refContainer.current

        if (elContainer && displayStyle === 'grid') {
            animateToFixedHeight(elContainer)
        }

        if (elContainer && displayStyle === 'masonry') {
            animateToFullHeight(elContainer)
        }
    }, [displayStyle])

    const animateToFixedHeight = (elToAnimate: HTMLElement)=> {
        elToAnimate.style.setProperty('--card-height', elToAnimate.offsetHeight + 'px')
        setTimeout(()=> elToAnimate.style.setProperty('--card-height', '15vw'), 100)
    }

    const animateToFullHeight = (elToAnimate: HTMLElement)=> {
        // Since align center flexbox is used, only half of scroll height related to current height is considered
        const scrollHeight = elToAnimate.scrollHeight * 2 - elToAnimate.offsetHeight

        elToAnimate.style.setProperty('--card-height', elToAnimate.offsetHeight + 'px')
        setTimeout(()=> {
            elToAnimate.style.setProperty('--card-height', scrollHeight + 'px')
        }, 100)
    }

    return (
        <div className={styles.cardContainer}>
            <div
                ref={refContainer}
                data-display-style={displayStyle}
                className={styles.container}
                // style={{ `--card-height`: `10px` }}
                // style={{ '--card-height': '10px' }}
                // style={{ --card-height: 'blue', lineHeight : 10, padding: 20 }}
                // style={{`--card-height: ${displayStyle === 'grid' ? '14vw' : 'auto'}`}
            >

                <div className={styles.link}>
                    <img
                        className={styles.img}
                        width={width}
                        height={height}
                        src={urlSmall}
                        alt={alt}
                    />
                    <div className={styles.userInfo}>
                        <ImageUser src={userImg}></ImageUser>
                        <p>{user}</p>
                    </div>
                    <div className={styles.overlay}></div>
                    <LikesContainer num={likes}/>
                </div>
            </div>
            <div
                ref={refDescriptionContainer}
                className={styles.descriptionContainer}
            >
                <div className={styles.userInfo}>
                    <ImageUser src={userImg}></ImageUser>
                    <p>{user}</p>
                    <LikesContainer num={likes}/>
                </div>
                <p className={styles.description}>{description}</p>
            </div>
        </div>
    )
}


const LikesContainer = ({num}: {num: string})=> {
    return (
        <div className={styles.likesContainer}>
            <p>{num}</p>
            <ImageLike/>
        </div>
    )
}

const ImageLike = ()=> {
    return (
        <img
            width="20"
            height="20"
            src={'/like.svg'}
        />
    )
}

const ImageUser = ({src}: {src: string})=> {
    return (
        <img
            height="35"
            width="35"
            src={src}
            className={styles.imgUser}
        />
    )
}

const Overlay = ()=> {
    return <div className={styles.overlay}></div>
}
