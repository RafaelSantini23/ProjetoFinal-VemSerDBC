import { connect, DispatchProp } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { AuthDTO } from "../../models/AuthDTO"
import { RootState } from "../../store"
import { handleLogout } from "../../store/actions/AuthAction"
import Button from "../button/Button"

function Item({ auth, dispatch }: AuthDTO & DispatchProp) {
    const navigate = useNavigate()

  return (
    <li>
        <Link to="/campanhas">Explore</Link>
        <Button onClick={() => navigate('/create-campanhas')}> Crie sua campanha </Button>
        <Button onClick={() => handleLogout(dispatch, navigate)}> Logout </Button>
    </li>
  )
}

const mapStateToProps = (state: RootState) => ({
    auth: state.AuthReducer.auth
})

export default connect(mapStateToProps)(Item)