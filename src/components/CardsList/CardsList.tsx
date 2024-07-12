import { Card } from '@components/Card/Card'
import styles from './cardsList.module.scss'
import { useSelector } from 'react-redux'
import type { RootState } from '@store/store'
import { Fragment } from 'react'
import type { IResponseImage } from 'src/pages/api/generateApiResponse'

/**
 * Renders a list of Cards
 *
 * @param {IResponseImage[]}   props.apiResponse     - Text describing the image
 */
export function CardsList({apiResponse}: {apiResponse: IResponseImage[]} ) {

    const displayStyle = useSelector((state: RootState) => state.app.displayStyle)

    const getLoadingType = (currentPos: number): 'lazy' | 'eager' => {
        if (currentPos > 9) return 'lazy'
        return 'eager'
    }

    return (
        <div data-display-style={displayStyle} className={styles.cardsList}>
            <div className={styles.column1}>
                {
                    apiResponse.map((cardData, i)=> {
                        if (i % 1 == 0 && i % 2 != 0 && i % 3 != 0) return (
                            <Card {...cardData} loading={getLoadingType(i)} key={`card-${i}`}/>
                        )
                        else return <Fragment key={`fr-${i}`}></Fragment>
                    })
                }
            </div>
            <div className={styles.column2}>
                {
                    apiResponse.map((cardData, i)=> {
                        if (i % 2 == 0 && i % 3 != 0) return (
                            <Card {...cardData} loading={getLoadingType(i)} key={`card-${i}`}/>
                        )
                        else return <Fragment key={`fr-${i}`}></Fragment>
                    })
                }
             </div>
            <div className={styles.column3}>
                {
                    apiResponse.map((cardData, i)=> {
                        if (i % 3 == 0) return (
                            <Card {...cardData} loading={getLoadingType(i)} key={`card-${i}`}/>
                        )
                        else return <Fragment key={`fr-${i}`}></Fragment>
                    })
                }
            </div>
        </div>
    )
}