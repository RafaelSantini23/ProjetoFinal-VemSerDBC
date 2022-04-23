import { ButtonHTMLAttributes } from "react"
import { ButtonForm } from "../../Global.styles"
import Theme from "../../theme"



type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode,
}


function Button({ onClick, children}: ButtonProps) {
  return (
    <ButtonForm colors={`${Theme.colors.secondary}`} onClick={onClick}> {children} </ButtonForm>
  )
}


export default Button