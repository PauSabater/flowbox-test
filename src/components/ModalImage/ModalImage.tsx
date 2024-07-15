import styles from './modalImage.module.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@store/store'
import { setModalImageSrc } from '@store/appSlice'

/**
 * Renders a modal image on image zoom in
 *
 * @return {JSX.Element} - ModalImage component
 */
export function ModalImage(): JSX.Element {

    const [displayModal, setDisplayModal] = useState(false)
    const modalImage = useSelector((state: RootState) => state.app.modalImageSrc)
    const dispatch: AppDispatch = useDispatch()

    useEffect(()=> {
        if (modalImage) setDisplayModal(true)

    }, [modalImage])


    const onBackgroundClick = ()=> {
        dispatch(setModalImageSrc(''))
        setDisplayModal(false)
    }

    return (
        <div className={styles.modalImage} data-display={displayModal}>
            <div className={styles.background} onClick={onBackgroundClick}></div>
            <img className={styles.image} src={modalImage} alt="modal image" />
        </div>
    )
}