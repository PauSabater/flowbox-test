import styles from './card.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@store/store'
import { setModalImageSrc, type TDisplayStyle } from '../../store/appSlice'
import type { IResponseImage } from 'src/pages/api/generateApiResponse'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export interface ICard extends IResponseImage {
    loading: 'eager' | 'lazy'
    isSlider?: boolean
}

/**
 * Renders an Card with an image and the corresponding parameters to show depending on the view
 *
 * @param {string}         props.description      - Text describing the image
 * @param {string}         props.user             - User name
 * @param {string}         props.userImg          - User image
 * @param {string}         props.likes            - Number of likes
 * @param {string}         props.loading          - Image loading type
 * @param {string}         props.isSlider         - If the card is in a slider
 * @param {string}         props.width            - Image width
 * @param {string}         props.height           - Image height
 * @param {string}         props.alt              - Image alt
 * @param {string}         props.urlMedium        - Image url medium
 *
 * @return {JSX.Element} - Card component
 */
export function Card({
    width,
    height,
    description,
    alt,
    urlMedium,
    user,
    userImg,
    likes,
    loading,
    isSlider
 }: ICard): JSX.Element {

    // Store values:
    const currentTheme = useSelector((state: RootState) => state.app.currentTheme)
    const displayStyle = useSelector((state: RootState) => state.app.displayStyle)

    const refContainer = useRef<HTMLDivElement>(null)
    const refImage = useRef<HTMLImageElement>(null)
    const refDescriptionContainer = useRef<HTMLDivElement>(null)

    const dispatch: AppDispatch = useDispatch()

    // This state is used to animate the height of the container when the display style changes
    const [previousDisplay, setPreviousDisplay] = useState<TDisplayStyle>(currentTheme as TDisplayStyle)

    /**
     * Actions on display style change
     */
    useEffect(()=> {
        const elContainer: HTMLDivElement | null = refContainer.current
        const duration = previousDisplay === 'list' || previousDisplay === 'slider' ? 0 : 0.3

        if (elContainer && displayStyle === 'grid') {
            animateToFixedHeight(elContainer, duration)
        }

        if (elContainer && displayStyle === 'masonry') {
            animateToFullHeight(elContainer, duration)
        }

        setPreviousDisplay(displayStyle)
    }, [displayStyle])

    /**
     * Actions on resize event for masonry display
     */
    useEffect(()=> {
        addEventListener("resize", () => {
            if (displayStyle === 'masonry' && refContainer.current) {
                setHeightauto(refContainer.current)
            }
        })
    })

    /**
     * Actions on theme change
     */
    useEffect(()=> {
        onThemeChange()
    },[currentTheme])

    /**
     * Actions on theme change
     * @return {boolean} - If the device is mobile or tablet
     */
    const isMobileTablet = (): boolean => {
        return window.innerWidth > 1023
    }

    /**
     * Animate the height of the container to a fixed value
     * @param {HTMLElement} elToAnimate  - Element to animate
     * @param {number} duration          - Animation duration
     * @return {void}
     */
    const animateToFixedHeight = (elToAnimate: HTMLElement, duration: number): void=> {
        gsap.to(elToAnimate, {
            height: isMobileTablet() ? '15vw' : '60vw',
            duration: duration,
            ease: "power1.out"
        })
    }

    /**
     * Animates the height of the container to the full height of the content
     *
     * @param {HTMLElement} elToAnimate  - Element to animate
     * @param {duration} duration        - Animation duration
     * @return {void}
     */
    const animateToFullHeight = (elToAnimate: HTMLElement, duration: number): void => {
        // Since align center flexbox is used, only half of scroll height related to current height is considered
        const scrollHeight = elToAnimate.scrollHeight * 2 - elToAnimate.offsetHeight
        if(scrollHeight !== 0)

        gsap.to(elToAnimate, {
            height: `${scrollHeight}px`,
            duration: duration,
            ease: "power1.out"
        })
    }

    /**
     * Sets the height of the element to auto
     *
     * @param {HTMLDivElement}  elToAnimate  - Element to animate
     * @return {void}
     */
    const setHeightauto = (elToAnimate: HTMLDivElement): void=> {
        gsap.set(elToAnimate, {
            height: 'auto'
        })
    }

    /**
     * Actions on theme change
    */
    const onThemeChange = ()=> {
        const elContainer: HTMLDivElement | null = refContainer.current
        const elImage: HTMLImageElement | null = refImage.current
        if (elContainer && elImage) {
            setHeightauto(elContainer)
        }
    }

    /**
     * Actions on image load
     */
    const onImgLoad = ()=> {
        gsap.fromTo(refImage.current, {opacity: 0}, {opacity: 1, duration: 0.5})

        if (currentTheme === '' && displayStyle === 'masonry') {
            const elContainer: HTMLDivElement | null = refContainer.current
            if (elContainer) setHeightauto(elContainer)
        }
    }

    /**
     * Actions on image container click, when the image is clicked, the modal is opened
     */
    const onImgContainerClick = ()=> {
        dispatch(setModalImageSrc(urlMedium))
    }

    return (
        <div className={styles.cardContainer} data-card>
            <div
                ref={refContainer}
                className={styles.container}
            >

                <div onClick={onImgContainerClick} className={styles.link}>
                    <img
                        ref={refImage}
                        onLoad={onImgLoad}
                        className={`${styles.img}`}
                        width={width}
                        height={height}
                        src={urlMedium}
                        alt={alt}
                        loading={loading}
                        data-is-wider={parseInt(width) > parseInt(height)}
                    />
                    <div className={styles.overlay}></div>
                    <div className={styles.userInfo}>
                        <ImageUser src={userImg}></ImageUser>
                        <p>{user}</p>
                    </div>
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

/**
 * Renders the number of likes and the like icon
 *
 * @param {string} num - Number of likes
 * @return {JSX.Element} - Likes container
 */
const LikesContainer = ({num}: {num: string}): JSX.Element=> {
    return (
        <div className={styles.likesContainer}>
            <p className={styles.likesNum}>{num}</p>
            <ImageLike/>
        </div>
    )
}

/**
 * Renders the like icon
 *
 * @return {JSX.Element} - Like icon
 */
const ImageLike = (): JSX.Element=> {
    return (
        <img
            width="20"
            height="20"
            src={'/like.svg'}
            loading='lazy'
            data-brighter
        />
    )
}

/**
 * Renders the user image
 *
 * @param {string} src - Image source
 * @return {JSX.Element} - User image
 */
const ImageUser = ({src}: {src: string}): JSX.Element=> {
    return (
        <img
            height="35"
            width="35"
            src={src}
            className={styles.imgUser}
            loading={'lazy'}
        />
    )
}

/**
 * Returns a dummy text
 */
const getDummyText = (i: number)=> {

    const texts = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Facilisis magna etiam tempor orci eu. Phasellus egestas tellus rutrum tellus. Magna etiam tempor orci eu. Senectus et netus et malesuada fames ac turpis egestas. Urna nec tincidunt praesent semper feugiat nibh sed. Tincidunt vitae semper quis.',
        'Enim blandit volutpat maecenas volutpat. Lacus vestibulum sed arcu non odio euismod lacinia at quis. Vel pretium lectus quam id leo in vitae turpis. Duis at tellus at urna. Amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar.',
        'Fermentum leo vel orci porta non pulvinar neque. Ac ut consequat semper viverra. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. In ante metus dictum at tempor commodo ullamcorper a lacus. Malesuada nunc vel risus.',
        'Cras semper auctor neque vitae. Nec nam aliquam sem et tortor consequat id porta nibh. Amet dictum sit amet justo donec enim diam vulputate ut. '
    ]

    return texts[i]
}
