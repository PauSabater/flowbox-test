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

export const setSearchValuePersist = (value: string)=> {
    localStorage.setItem('search-value', value)
}

export const setModePersist = (value: string)=> {
    localStorage.setItem('mode', value)
}

export const getDisplaStylePersist = ()=> {
    return localStorage.getItem('display-style') || ''
}

export const getThemePersist = ()=> {
    return localStorage.getItem('theme') || ''
}

export const getImagesPersist = (): IResponseImage[] => {
    const imagesLocalstorage = localStorage.getItem('images')
    return imagesLocalstorage !== 'undefined' && imagesLocalstorage
        ? JSON.parse(imagesLocalstorage)
        : ''
}

export const getSearchValuePersist = (): string => {
    return localStorage.getItem('search-value') || ''
}

export const getModePersist = (): string => {
    return localStorage.getItem('mode') || ''
}