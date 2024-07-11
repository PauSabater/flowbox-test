import type { ICard } from '@components/Card/Card'
import { Card } from '@components/Card/Card'
import styles from './cardsList.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@store/store'
import { setDisplayStyle } from '@store/appSlice'
import { Fragment, useEffect } from 'react'
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
export function CardsList({apiInitialResponse}: {apiInitialResponse: IResponseImage[]} ) {

    // const dataImages = useSelector((state: RootState) => state.app.dataImages)
    const displayStyle = useSelector((state: RootState) => state.app.displayStyle)
    // const dispatch: AppDispatch = useDispatch()

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

            console.log(test)
        }

        fetchData()

    }, [])


    const getLoadingType = (currentPos: number): 'lazy' | 'eager' => {
        if (currentPos > 15) return 'lazy'
        return 'eager'
    }



    return (
        <div data-display-style={displayStyle} className={styles.cardsList}>

            <div className={styles.column1}>
                {
                    apiInitialResponse.map((cardData, i)=> {
                        if (i % 1 == 0 && i % 2 != 0 && i % 3 != 0) return (
                            <Card {...cardData} loading={getLoadingType(i)} key={`card-${i}`}/>
                        )
                        else return <Fragment key={`fr-${i}`}></Fragment>
                    })
                }
            </div>
            <div className={styles.column2}>
                {
                    apiInitialResponse.map((cardData, i)=> {
                        if (i % 2 == 0 && i % 3 != 0) return (
                            <Card {...cardData} loading={getLoadingType(i)} key={`card-${i}`}/>
                        )
                        else return <Fragment key={`fr-${i}`}></Fragment>
                    })
                }
             </div>
            <div className={styles.column3}>
                {
                    apiInitialResponse.map((cardData, i)=> {
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