import { ReactNode, useEffect } from "react"
import { connect } from "react-redux"
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import { RootState } from "../../store"
import { AuthDTO } from "../../models/AuthDTO";
import { handleLogin } from "../../store/actions/AuthAction"
import { ContainerFormUser, ContainerGlobal } from "../../Global.styles";






function Login({auth, dispatch}: any) {

    
  
  return (
    <ContainerGlobal>
        <ContainerFormUser>

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
                    <button  type='submit'>Entrar</button>
                </Form>            
            {/* <SignUp> Don’t have an account? <a href="#">Sign Up</a> </SignUp>    */}
            </Formik>
            <Link to="/register">Não possuo cadastro</Link>
        </ContainerFormUser>
    </ContainerGlobal>
  )
}

const mapStateToProps = (state: RootState) => ({
    auth: state.AuthReducer.auth
})


export default connect(mapStateToProps)(Login)