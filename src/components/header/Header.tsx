import { connect } from "react-redux"
import { AuthDTO } from "../../models/AuthDTO"
import { RootState } from "../../store";
import { HeaderStyle } from "./Header.styles"
import Menu from "./Menu"

function Header({auth}: AuthDTO) {

  const { isLogged }: AuthDTO['auth']  = auth;
  
  return (
    <>
    {isLogged && (
      <HeaderStyle>
          <Menu />
      </HeaderStyle>
      )}
      </>
  )
}

const mapStateToProps = (state: RootState) => ({
    auth: state.authReducer.auth
})

export default connect(mapStateToProps)(Header)