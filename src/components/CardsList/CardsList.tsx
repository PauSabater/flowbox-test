import { Card } from '@components/Card/Card'
import styles from './cardsList.module.scss'
import { useSelector } from 'react-redux'
import type { RootState } from '@store/store'
import { Fragment } from 'react'
import type { IResponseImage } from 'src/pages/api/generateApiResponse'

/**
 * Renders a list of Cards
 *
 * @param {IResponseImage[]}   props.apiResponse     - Array of images to display from the API
 * @return {JSX.Element} - CardsList component
 */
export function CardsList({apiResponse}: {apiResponse: IResponseImage[]} ): JSX.Element {

    // Value from store:
    const displayStyle = useSelector((state: RootState) => state.app.displayStyle)

    /**
     * Get the loading type for the image
     *
     * @param {number}
     * @return {'lazy' | 'eager'} - Loading type
     */
    const getLoadingType = (currentPos: number): 'lazy' | 'eager' => {
        if (currentPos > 9) return 'lazy'
        return 'eager'
    }

    return (
        <div data-display-style={displayStyle || 'masonry'} className={styles.cardsList}>
            <div className={styles.column1}>

                {   // Render the cards in the first column
                    apiResponse.map((cardData, i)=> {
                        if (i % 1 == 0 && i % 2 != 0 && i % 3 != 0) return (
                            <Card {...cardData} loading={getLoadingType(i)} key={`card-${i}`}/>
                        )
                        else return <Fragment key={`fr-${i}`}></Fragment>
                    })
                }

            </div>
            <div className={styles.column2}>

                {   // Render the cards in the second column
                    apiResponse.map((cardData, i)=> {
                        if (i % 2 == 0 && i % 3 != 0) return (
                            <Card {...cardData} loading={getLoadingType(i)} key={`card-${i}`}/>
                        )
                        else return <Fragment key={`fr-${i}`}></Fragment>
                    })
                }

             </div>
            <div className={styles.column3}>

                {   // Render the cards in the third column
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