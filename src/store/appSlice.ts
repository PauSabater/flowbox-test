import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IResponseImage } from 'src/pages/api/generateApiResponse'

export type TImageThemes = 'nature' | 'architecture' | 'food' | 'fashion' | 'animals' | ''
export type TDisplayStyle = 'grid' | 'masonry' | 'list' | 'slider'


interface AppState {
    searchValue: string,
    dataImages: IResponseImage[] | []
    displayStyle: TDisplayStyle
    currentTheme: TImageThemes
    modalImageSrc: string
}

const initialState: AppState = {
    searchValue: '',
    dataImages: [],
    displayStyle: 'masonry',
    currentTheme: 'nature',
    modalImageSrc: ''
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setModalImageSrc: (
            state,
            action: PayloadAction<string>) => {
                state.modalImageSrc = action.payload
        },
        setSeachValue: (
            state,
            action: PayloadAction<string>) => {
                state.searchValue = action.payload
        },
        setDataImages: (
            state,
            action: PayloadAction<IResponseImage[]>) => {
                state.dataImages = action.payload
        },
        setDisplayStyle: (
            state,
            action: PayloadAction<TDisplayStyle>) => {
                state.displayStyle = action.payload
        },
        setCurrentTheme: (
            state,
            action: PayloadAction<TImageThemes>) => {
                state.currentTheme = action.payload
        },
    },
})

export const { setDataImages, setDisplayStyle, setCurrentTheme, setSeachValue, setModalImageSrc } = appSlice.actions
export default appSlice.reducer