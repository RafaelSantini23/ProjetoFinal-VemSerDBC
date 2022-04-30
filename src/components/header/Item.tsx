import { useEffect, useState } from "react"
import { connect, DispatchProp } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { LinkStyle } from "../../Global.styles"
import { AuthDTO } from "../../models/AuthDTO"
import { RootState } from "../../store"
import { handleLogout } from "../../store/actions/authAction"
import { getUserProfile } from "../../store/actions/usersAction"
import Theme from "../../theme"
import Button from "../button/Button"
import Search from "../inputs/Search"
import { ItemStyles } from "./Header.styles"
import { ItemProfile, TituloProfile } from "./Item.styles"
import DefaultImage from '../../imgs/defaultImage.jpeg'
import { ImgModal } from "../modal/Modal.styles"
import { ImgProfile } from "./Item.styles"
import { UsersCreateDTO } from "../../models/UsersCreateDTO"
import { setButton } from "../../store/actions/usersAction"

function Item({ user, dispatch, navigateTo }:  UsersCreateDTO & DispatchProp) {
    const navigate = useNavigate()
    // const [ navigateTo, setNavigateTo ] = useState(false)
    
    // const navigateToPath = (path: string, condition: boolean) => {
    //     setNavigateTo(condition)
    //     navigate(path)
    // }

    useEffect(() => {
        getUserProfile(dispatch)
        console.log(user);
    }, [])
    

  return (
      <>
            <ItemStyles>
                    <LinkStyle color={`${Theme.colors.light}`} to="/campanhas" >Explore</LinkStyle>
            </ItemStyles>
            <ItemStyles>
                <Search />
            </ItemStyles>
            <ItemStyles>
                   { navigateTo ? <Button onClick={() => setButton(dispatch, false, '/campanhas', navigate)}> Voltar As Campanhas </Button> : <Button onClick={() => setButton(dispatch, true, 'create-campanhas', navigate)}> Criar Campanhas </Button> } 
            </ItemStyles>
            <ItemStyles>
                <Button onClick={() => handleLogout(dispatch, navigate)}> Logout </Button>
            </ItemStyles>
            <ItemProfile>
                  <TituloProfile> { user.name }  </TituloProfile> 
                  <ImgProfile src={user.profilePhoto ? user.profilePhoto : DefaultImage} />
            </ItemProfile>
      </>
  )
}

const mapStateToProps = (state: RootState) => ({
    auth: state.authReducer.auth,
    user: state.userReducer.user,
    navigateTo: state.userReducer.navigateTo
})

export default connect(mapStateToProps)(Item)