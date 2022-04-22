import { ButtonHTMLAttributes } from "react"
import { ButtonForm } from "../../Global.styles"



type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode,
}


function Button({ onClick, children}: ButtonProps) {
  return (
    <ButtonForm onClick={onClick}> {children} </ButtonForm>
  )
}


export default Button