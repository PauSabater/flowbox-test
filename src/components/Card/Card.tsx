import styles from './card.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@store/store'
import { setDisplayStyle } from '@store/appSlice'
import type { IResponseImage } from 'src/pages/api/images'
import { Link } from "react-router-dom"
import { useEffect, useRef } from 'react'

export interface ICard extends IResponseImage {
    loading: 'eager' | 'lazy'
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
    urlMedium,
    user,
    userImg,
    likes,
    loading
 }: ICard) {

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
        <div data-display-style={displayStyle} className={styles.cardContainer}>
            <div
                ref={refContainer}
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
                        src={urlMedium}
                        alt={alt}
                        loading={loading}
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
                <p className={styles.description}>{description || 'Lorem Ipsum title'}</p>
                <div className={styles.userInfo}>
                    <ImageUser src={userImg}></ImageUser>
                    <p>{user}</p>
                    <LikesContainer num={likes}/>
                </div>
                <p className={styles.dummyText}>{getDummyText(Math.floor(Math.random() * 5))}</p>
            </div>
        </div>
    )
}

const getDummyText = (i: number)=> {

    const texts = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Facilisis magna etiam tempor orci eu. Phasellus egestas tellus rutrum tellus. Magna etiam tempor orci eu. Senectus et netus et malesuada fames ac turpis egestas. Urna nec tincidunt praesent semper feugiat nibh sed. Tincidunt vitae semper quis lectus nulla at volutpat diam.',
        'Enim blandit volutpat maecenas volutpat. Lacus vestibulum sed arcu non odio euismod lacinia at quis. Vel pretium lectus quam id leo in vitae turpis. Duis at tellus at urna. Amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar. Aenean euismod elementum nisi quis.',
        'Fermentum leo vel orci porta non pulvinar neque. Ac ut consequat semper viverra. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. In ante metus dictum at tempor commodo ullamcorper a lacus. Malesuada nunc vel risus.',
        'Cras semper auctor neque vitae. Nec nam aliquam sem et tortor consequat id porta nibh. Amet dictum sit amet justo donec enim diam vulputate ut. '
    ]

    return texts[i]

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
