import styles from './card.module.scss'
import { useSelector } from 'react-redux'
import type { RootState } from '@store/store'
import { type TDisplayStyle } from '@store/appSlice'
import type { IResponseImage } from 'src/pages/api/generateApiResponse'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export interface ICard extends IResponseImage {
    loading: 'eager' | 'lazy'
    isSlider?: boolean
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
    loading,
    isSlider
 }: ICard) {

    const currentTheme = useSelector((state: RootState) => state.app.currentTheme)
    const displayStyle = useSelector((state: RootState) => state.app.displayStyle)
    const refContainer = useRef<HTMLDivElement>(null)
    const refImage = useRef<HTMLImageElement>(null)
    const refDescriptionContainer = useRef<HTMLDivElement>(null)
    const [animateImg, setAnimateImg] = useState<boolean>(false)
    const [previousDisplay, setPreviousDisplay] = useState<TDisplayStyle>(currentTheme as TDisplayStyle)


    useEffect(()=> {
        const elContainer: HTMLDivElement | null = refContainer.current

        // console.log("EFFECT")
        // console.log('previous '+previousDisplay)
        // console.log('next '+displayStyle)
        setHeightauto(elContainer as HTMLDivElement)


        if (elContainer && displayStyle === 'grid') {
            console.log("TO GRID")
            animateToFixedHeight(elContainer, 0.5)
        }

        if (elContainer && displayStyle === 'masonry') {
            console.log("TO FULL HEIGHT")
            animateToFullHeight(elContainer, 0.5)
        }
        else {
            console.log("TO AUTOO")
            setHeightauto(elContainer as HTMLDivElement)
        }

        setPreviousDisplay(displayStyle)
    }, [displayStyle])


    useEffect(()=> {
        onThemeChange()
    },[currentTheme])

    const animateToFixedHeight = (elToAnimate: HTMLElement, duration: number)=> {
        gsap.to(elToAnimate, {
            height: '15vw',
            duration: duration,
            ease: "power1.out"
        })
    }

    const animateToFullHeight = (elToAnimate: HTMLElement, duration: number)=> {
        // Since align center flexbox is used, only half of scroll height related to current height is considered
        // const scrollHeight = elToAnimate.scrollHeight * 2 - elToAnimate.offsetHeight
        // console.log(`${scrollHeight}px`)
        // if(scrollHeight !== 0)

        // gsap.to(elToAnimate, {
        //     height: `${scrollHeight}px`,
        //     duration: 1,
        //     ease: "power1.out"
        // })
    }

    const setHeightauto = (elToAnimate: HTMLDivElement)=> {
        gsap.set(elToAnimate, {
            height: 'auto'
        })
    }

    const onThemeChange = ()=> {
        const elContainer: HTMLDivElement | null = refContainer.current
        const elImage: HTMLImageElement | null = refImage.current
        if (elContainer && elImage) {
            // elContainer.style.setProperty('--card-height', 'auto')
            setHeightauto(elContainer)
        }
    }

    return (
        <div className={styles.cardContainer}>
            <div
                ref={refContainer}
                className={styles.container}
            >

                <div className={styles.link}>
                    <img
                        ref={refImage}
                        onLoad={onThemeChange}
                        className={`${styles.img} ${animateImg ? styles.animateAppear : ''}`}
                        width={width}
                        height={height}
                        src={urlMedium}
                        alt={alt}
                        loading={loading}
                        data-is-wider={parseInt(width) > parseInt(height)}
                        data-animate={animateImg}
                    />
                    <div className={styles.userInfo}>
                        <ImageUser src={userImg}></ImageUser>
                        <p>{user}</p>
                    </div>
                    <div className={styles.overlay}></div>
                    <LikesContainer num={likes}/>
                </div>
            </div>
            {
                !isSlider ?
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
                        <p className={styles.descriptionGrid}>{description || 'Lorem Ipsum title'}</p>
                        <p className={styles.dummyText}>{getDummyText(Math.floor(Math.random() * 5))}</p>
                    </div>
                : <></>
            }

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
