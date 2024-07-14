import styles from './searchBar.module.scss'
import { useEffect, useRef, useState } from 'react'
import { setCurrentTheme } from '@store/appSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@store/store'
import { setSeachValue } from '@store/appSlice'
import { getSearchValuePersist, setSearchValuePersist, setThemePersist } from '@store/persist'


/**
 * Renders a search bar to search images from the API
 *
 * @return {JSX.Element} - SearchBar component
 */
export function SearchBar(): JSX.Element {

    const refInput = useRef<HTMLInputElement>(null)
    const searchStoreVal = useSelector((state: RootState) => state.app.searchValue)
    const [inputValue, setInputValue] = useState(getSearchValuePersist || '')

    const dispatch: AppDispatch = useDispatch()

    useEffect(()=> {
        if (!searchStoreVal) {
            setInputValue('')
        }

    }, [searchStoreVal])


    const onBtnClick = () => {
        const value = refInput.current?.value

        if (value) {
            dispatch(setSeachValue(value))
            setSearchValuePersist(value)
            dispatch(dispatch(setCurrentTheme('')))
            setThemePersist('')
        }
    }

    const handleInputChange = ()=> {
        setInputValue(refInput.current?.value || '')
    }

    return (
        <div className={styles.searchBar}>
            <input
                ref={refInput}
                className={styles.input}
                type="text"
                placeholder="Search more images from Unsplash (Ex: trees)"
                value={inputValue}
                onChange={handleInputChange}
            />
            <button
                onClick={onBtnClick}
                className={styles.button}
            >
                search
            </button>
        </div>
    )
}
