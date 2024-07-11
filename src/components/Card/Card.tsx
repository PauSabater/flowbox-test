import styles from './card.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@store/store'
import { setDisplayGrid } from '@store/appSlice'
import type { IResponseImage } from 'src/pages/api/images'
import { Link } from "react-router-dom"

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

    return (
        <div className={styles.container}>

            {/* <Link to={'/'}> */}
            <div className={styles.link}>
                <img
                    className={styles.img}
                    width={width}
                    height={height}
                    src={urlSmall}
                    alt={alt}
                />
                {/* </Link> */}
                <div className={styles.userInfo}>
                    <img
                        height="35"
                        width="35"
                        src={userImg}
                        className={styles.imgUser}
                    >
                    </img>
                    <p>{user}</p>
                    {/* <p>{likes}</p> */}
                </div>
            </div>

        </div>
    )
}
