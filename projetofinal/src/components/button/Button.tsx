import { ButtonHTMLAttributes } from "react"
import { ButtonStyles } from "./Button.styles"


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode,
}


function Button({ onClick, children}: ButtonProps) {
  return (
    <ButtonStyles onClick={onClick}> {children} </ButtonStyles>
  )
}


export default Button