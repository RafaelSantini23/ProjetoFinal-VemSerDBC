import { connect, DispatchProp } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { LinkStyle } from "../../Global.styles"
import { AuthDTO } from "../../models/AuthDTO"
import { RootState } from "../../store"
import { handleLogout } from "../../store/actions/AuthAction"
import Button from "../button/Button"
import Search from "../inputs/Search"
import { ItemStyles, ItensStyle } from "./Header.styles"

function Item({ auth, dispatch }: AuthDTO & DispatchProp) {
    const navigate = useNavigate()

  return (
      <>
            <ItemStyles>
                    <LinkStyle to="/campanhas">Explore</LinkStyle>
            </ItemStyles>
            <ItemStyles>
                <Search />
            </ItemStyles>
            <ItemStyles>
                    <Button onClick={() => navigate('/create-campanhas')}> Crie sua campanha </Button>
            </ItemStyles>
            <ItemStyles>
                <Button onClick={() => handleLogout(dispatch, navigate)}> Logout </Button>
            </ItemStyles>
      </>
  )
}

const mapStateToProps = (state: RootState) => ({
    auth: state.AuthReducer.auth
})

export default connect(mapStateToProps)(Item)