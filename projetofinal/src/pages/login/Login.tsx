import { useEffect } from "react"
import { connect } from "react-redux"
import { RootState } from "../../store"
import { setToken } from "../../store/actions/AuthAction"



function Login({auth, dispatch}: any) {
  
  useEffect(() => {
    setToken(dispatch);
  }, [])
  
    console.log(auth);
    
  return (
    <div>
        
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
    auth: state.AuthReducer.auth
})


export default connect(mapStateToProps)(Login)