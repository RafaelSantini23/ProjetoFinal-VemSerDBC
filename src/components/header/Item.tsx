import { useEffect } from "react"
import { connect, DispatchProp } from "react-redux"
import { useNavigate } from "react-router-dom"
import { LinkStyle } from "../../Global.styles"
import { RootState } from "../../store"
import { handleLogout } from "../../store/actions/authAction"
import { getUserProfile } from "../../store/actions/usersAction"
import Theme from "../../theme"
import Button from "../button/Button"
import { ItemStyles } from "./Header.styles"
import { ItemProfile, TituloProfile } from "./Item.styles"
import DefaultImage from '../../imgs/defaultImage.jpeg'
import { ImgProfile } from "./Item.styles"
import { UsersCreateDTO } from "../../models/UsersCreateDTO"
import { setButton } from "../../store/actions/usersAction"
import { convertImage64, firstUpper } from "../../utils/Utils"

function Item({ user, dispatch, navigateTo, loading }:  UsersCreateDTO & DispatchProp) {
    const navigate = useNavigate()
    useEffect(() => {
        getUserProfile(dispatch)
        console.log(user);
    }, [])
    

  return (
      <>
            <ItemStyles>
                    <LinkStyle color={`${Theme.colors.light}`} to="/campanhas" onClick={() => setButton(dispatch,false)} >Explore </LinkStyle>
            </ItemStyles>
            <ItemStyles>
                   { navigateTo ? <Button onClick={() => setButton(dispatch, false, '/campanhas', navigate)}> Voltar As Campanhas </Button> : <Button onClick={() => setButton(dispatch, true, 'create-campanhas', navigate)}> Criar Campanhas </Button> } 
            </ItemStyles>
            <ItemStyles>
                <Button onClick={() => handleLogout(dispatch, navigate)}> Logout </Button>
            </ItemStyles>
            <ItemProfile>
                { loading ? <div>Loading...</div> : <> <TituloProfile> { firstUpper(user.name as string) }  </TituloProfile> 
                  <ImgProfile src={user.profilePhoto  ? convertImage64(user.profilePhoto as string) : DefaultImage} /> </> }
                  
            </ItemProfile>
      </>
  )
}

const mapStateToProps = (state: RootState) => ({
    auth: state.authReducer.auth,
    user: state.userReducer.user,
    navigateTo: state.userReducer.navigateTo,
    loading: state.userReducer.loading
})

export default connect(mapStateToProps)(Item)