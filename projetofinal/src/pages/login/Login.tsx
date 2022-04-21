import { useEffect } from "react"
import { connect, DispatchProp } from "react-redux"
import { Form, Formik, FormikHelpers } from "formik";
import { RootState } from "../../store"
import { AuthDTO } from "../../models/AuthDTO";
import { handleLogin } from "../../store/actions/AuthAction"
import { ButtonForm, ContainerFormUser, ContainerGlobal, InputStyle, LabelForm, LinkStyle, LogoDiv } from "../../Global.styles";
import Logo from '../../imgs/logo.svg'
import { useNavigate } from "react-router-dom";


function Login({auth, dispatch}: AuthDTO & DispatchProp) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
           navigate('/campanhas')
        } else {
            navigate('/')
        }
    },[])


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
                        handleLogin(dispatch,values, navigate)
                        setSubmitting(false);
                    }}
                    >
                <Form>
                    <LogoDiv>
                        <img src={Logo} height={'200px'} alt="Logo" />
                    </LogoDiv>
                    <div>
                        <LabelForm htmlFor='login'>Usuário</LabelForm>
                        <InputStyle  name="login" id="login" placeholder="Digite o nome do usuário" />
                    </div>
                    <div>
                        <LabelForm htmlFor='senha'>Password</LabelForm>
                        <InputStyle name="senha" id="senha"  placeholder="Digite a sua senha" />
                    </div>
                    <ButtonForm  type='submit'>Entrar</ButtonForm>
                </Form>            
            </Formik>
            <LinkStyle to="/registrar">Não possuo cadastro</LinkStyle>
        </ContainerFormUser>
    </ContainerGlobal>
  )
}

const mapStateToProps = (state: RootState) => ({
    auth: state.AuthReducer.auth
})


export default connect(mapStateToProps)(Login)