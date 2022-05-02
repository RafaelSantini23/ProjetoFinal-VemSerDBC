import { NotFoundPage, NotFoundTitle } from "./NotFound.styles"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function NotFound() {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/campaigns')
    }, 1200);
  },[])

  return (
    <NotFoundPage>
      <NotFoundTitle>Página não encontrada!</NotFoundTitle>
    </NotFoundPage>
  )
}

export default NotFound