import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IResponseImage } from 'src/pages/api/images'

export type TImageThemes = 'nature' | 'architecture' | 'food' | 'fashion' | 'animals'
export type TDisplayStyle = 'grid' | 'masonry' | 'list' | 'slider'


interface AppState {
    dataImages: IResponseImage[] | []
    displayStyle: TDisplayStyle
    currentTheme: TImageThemes
}

const initialState: AppState = {
    dataImages: [],
    displayStyle: 'masonry',
    currentTheme: 'nature'
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setdataImages: (
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

export const { setdataImages, setDisplayStyle, setCurrentTheme } = appSlice.actions
export default appSlice.reducer