import styles from './modalImage.module.scss'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@store/store'

/**
 * Renders a modal image on image zoom in
 *
 * @return {JSX.Element} - ModalImage component
 */
export function ModalImage(): JSX.Element {

    const [displayModal, setDisplayModal] = useState(false)
    const modalImage = useSelector((state: RootState) => state.app.modalImageSrc)

    useEffect(()=> {
        if (modalImage) setDisplayModal(true)

    }, [modalImage])

    return (
        <div className={styles.modalImage} data-display={displayModal}>
            <div className={styles.background} onClick={()=> setDisplayModal(false)}></div>
            <img className={styles.image} src={modalImage} alt="modal image" />
        </div>
    )
}