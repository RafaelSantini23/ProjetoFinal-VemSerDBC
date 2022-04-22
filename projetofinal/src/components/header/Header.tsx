import Menu from "./Menu"
import { HeaderStyle } from "./Header.styles"
import { AuthDTO } from "../../models/AuthDTO"
import { connect } from "react-redux"
import { RootState } from "../../store";

function Header({auth}: AuthDTO) {
  console.log(auth);

  const { isLogged }: AuthDTO['auth']  = auth;
  
  console.log(isLogged);
  

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