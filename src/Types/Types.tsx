import { ButtonHTMLAttributes } from "react"

export type Category = {
    name: string
}


export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode,
    typeModal?: string,
    height: string,
    width?: string,
    values?: [],
    onClick?: any,
    id?: string,
    colabs?: any,

}

export type Colabs = {
    colabs: {
        id: number,
        name: string,
        profilePhoto: string;
    }[],
}