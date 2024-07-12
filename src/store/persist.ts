import type { IResponseImage } from "src/pages/api/generateApiResponse"
import type { TDisplayStyle } from "./appSlice"

export const setDisplaStylePersist = (value: string)=> {
    localStorage.setItem('display-style', value)
}

export const setThemePersist = (value: string)=> {
    localStorage.setItem('theme', value)
}

export const setImagesPersist = (value: string)=> {
    localStorage.setItem('images', value)
}

export const getDisplaStylePersist = ()=> {
    return localStorage.getItem('display-style') || ''
}

export const getThemePersist = ()=> {
    return localStorage.getItem('theme') || ''
}

export const getImagesPersist = (): IResponseImage[] => {
    const imagesLocalstorage = localStorage.getItem('images')
    return imagesLocalstorage
        ? JSON.parse(imagesLocalstorage)
        : ''
}


