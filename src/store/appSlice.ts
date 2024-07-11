import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IResponseImage } from 'src/pages/api/images'

export type TImageThemes = 'nature' | 'architecture' | 'food' | 'fashion' | 'animals'

interface AppState {
    dataImages: IResponseImage[] | []
    displayGrid: boolean
    currentTheme: TImageThemes
}

const initialState: AppState = {
    dataImages: [],
    displayGrid: true,
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
        setDisplayGrid: (
            state,
            action: PayloadAction<boolean>) => {
                state.displayGrid = action.payload
        },
        setCurrentTheme: (
            state,
            action: PayloadAction<TImageThemes>) => {
                state.currentTheme = action.payload
        },
    },
})

export const { setdataImages, setDisplayGrid, setCurrentTheme } = appSlice.actions
export default appSlice.reducer