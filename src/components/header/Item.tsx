import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { connect, DispatchProp } from "react-redux"
import { LinkStyle } from "../../Global.styles"
import { RootState } from "../../store"
import { setButton } from "../../store/actions/usersAction"
import { ItemStyles } from "./Header.styles"
import { ImgProfile } from "./Item.styles"
import { handleLogout } from "../../store/actions/authAction"
import { getUserProfile } from "../../store/actions/usersAction"
import { UsersCreateDTO } from "../../models/UsersCreateDTO"
import { FundraiserListDTO } from "../../models/FundraiserListDTO"
import { convertImage64, firstUpper } from "../../utils/Utils"
import {
    DivMenu, 
    ItemProfile, 
    TituloProfile, 
    ButtonProfile,
} from "./Item.styles"
import Theme from "../../theme"
import Button from "../button/Button"
import DefaultImage from '../../images/defaultImage.jpeg'


function Item({ user, dispatch, navigateTo, loading }:  UsersCreateDTO & DispatchProp & FundraiserListDTO) {
    const navigate = useNavigate()
    useEffect(() => {
        getUserProfile(dispatch)
    }, [])
    

  return (
      <>
      <DivMenu>
            <ItemStyles>
                    <LinkStyle color={`${Theme.colors.light}`} to="/campaigns" onClick={() => setButton(dispatch,false)} >Explore </LinkStyle>
            </ItemStyles>
            <ItemStyles>
                   { navigateTo ? <Button onClick={() => setButton(dispatch, false, '/campaigns', navigate)}> Voltar As Campanhas </Button> : <Button onClick={() => setButton(dispatch, true, 'create-campaigns', navigate)}> Criar Campanhas </Button> } 
            </ItemStyles>
            <ItemStyles>
            </ItemStyles>
      </DivMenu>
            <ItemProfile>
                <ButtonProfile onClick={() => handleLogout(dispatch, navigate)}> Logout </ButtonProfile>
                { loading ? <div>Carregando...</div> : <> <TituloProfile> { firstUpper(user.name as string) }  </TituloProfile> 
                  <ImgProfile src={user.profilePhoto  ? convertImage64(user.profilePhoto as string) : DefaultImage} /> </> }
            </ItemProfile>
      </>
  )
}

const mapStateToProps = (state: RootState) => ({
    auth: state.authReducer.auth,
    user: state.userReducer.user,
    navigateTo: state.userReducer.navigateTo,
    loading: state.userReducer.loading,
    campaignList: state.fundraiserReducer.campaignList,
})

export default connect(mapStateToProps)(Item)