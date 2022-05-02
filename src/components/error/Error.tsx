import { ContainerError, TitleError, ImageError } from "./Error.styles"
import ErroGif from '../../images/Error.gif'

function Error() {
  return (
    <ContainerError>
      <TitleError>Oh não, algo deu errado!</TitleError>
      <ImageError src={ErroGif} alt="erro" />
    </ContainerError>
  )
}
export default Error