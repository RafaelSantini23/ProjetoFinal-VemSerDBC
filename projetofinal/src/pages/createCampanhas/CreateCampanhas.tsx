import { useEffect } from "react"
import { connect, DispatchProp } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { AuthDTO } from "../../models/AuthDTO";
import { RootState } from "../../store";
import { isLoggedin } from "../../utils/Utils";



function CreateCampanhas({ auth, dispatch }: AuthDTO & DispatchProp) {
   const navigate = useNavigate()

    useEffect(() => {
        isLoggedin(navigate)
    }, [])

  return (
    <div>
       
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
    auth: state.AuthReducer.auth
})


export default connect(mapStateToProps)(CreateCampanhas)