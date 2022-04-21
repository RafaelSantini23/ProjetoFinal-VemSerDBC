import { useEffect } from "react"
import { connect } from "react-redux"
import { RootState } from "../../store"
import { Field, Form, Formik, FormikHelpers } from "formik";
import { AuthDTO } from "../../models/AuthDTO";
import { handleLogin } from "../../store/actions/AuthAction"






function Login({auth, dispatch}: any) {


  
  useEffect(() => {
    
  }, [])
  

  

    
  return (
    <div>
         <Formik
                initialValues={{
                    login: '',
                    senha: ''
                }}
                onSubmit={(
                    values: AuthDTO["auth"],
                    { setSubmitting }: FormikHelpers<AuthDTO['auth']>
                    ) => {
                        handleLogin(dispatch,values)
                        setSubmitting(false);
                    }}
                    >
                <Form>
                    <div>
                        <label htmlFor='login'>Usuário</label>
                        <Field  name="login" id="login" placeholder="Digite o nome do usuário" />
                    </div>
                    <div>
                        <label htmlFor='senha'>Password</label>
                        <Field name="senha" id="senha"  placeholder="Digite a sua senha" />
                    </div>
                    <button  type='submit'>Log in  </button>
                </Form>            
            {/* <SignUp> Don’t have an account? <a href="#">Sign Up</a> </SignUp>    */}
            </Formik>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
    auth: state.AuthReducer.auth
})


export default connect(mapStateToProps)(Login)