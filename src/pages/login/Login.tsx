import { useEffect } from "react"
import { connect, DispatchProp } from "react-redux"
import { Form, Formik, FormikHelpers } from "formik";
import { RootState } from "../../store"
import { AuthDTO } from "../../models/AuthDTO";
import { handleLogin } from "../../store/actions/authAction"
import { ButtonForm, ContainerFormUser, ContainerGlobal, DivValidate, InputStyle, LabelForm, LinkStyle, LogoDiv, SpanError } from "../../Global.styles";
import Logo from '../../imgs/logo.svg'
import { useNavigate } from "react-router-dom";
import ThemeImg from '../../imgs/theme.png'
import { ImgLogin, TitleLogin } from "./login.styles";
import Theme from "../../theme";
import * as Yup from 'yup';

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


    const SignupSchema = Yup.object().shape({
        login: Yup.string()
        .required('Campo Obrigatório!'),
        password: Yup.string()
        .required('Campo Obrigatório!'),
        
      })


  return (
    <ContainerGlobal>
        <ImgLogin>
            <img src={ThemeImg}  height={'250px'} alt="" />
            <TitleLogin> Sistema de arrecadações DevSer</TitleLogin>
        </ImgLogin>
        <ContainerFormUser>

         <Formik
                initialValues={{
                    login: '',
                    password: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={(
                    values: AuthDTO["auth"],
                    { setSubmitting }: FormikHelpers<AuthDTO['auth']>
                    ) => {
                        handleLogin(dispatch,values, navigate)
                        setSubmitting(false);
                    }}
                    >
                {props => 
                <Form>
                    <LogoDiv>
                        <img src={Logo} height={'200px'} alt="Logo" />
                    </LogoDiv>
                    <DivValidate>
                        <LabelForm htmlFor='login'>Usuário</LabelForm>
                        <InputStyle  name="login" id="login" placeholder="Digite o nome do usuário" />
                        {props.errors.login && props.touched.login ? (
                            <SpanError>{props.errors.login}</SpanError>
                            ) : null}
                    </DivValidate>
                    <DivValidate>
                        <LabelForm htmlFor='password'>Password</LabelForm>
                        <InputStyle name="password" id="password"  placeholder="Digite a sua senha" />
                        {props.errors.password && props.touched.password ? (
                            <SpanError>{props.errors.password}</SpanError>
                            ) : null}
                    </DivValidate>
                    <ButtonForm colors={`${Theme.colors.dark}`} marginTop="20px"  type='submit'>Entrar</ButtonForm>
                </Form>            
            }
            </Formik>
            <LinkStyle color={`${Theme.colors.dark}`} mT='20px' to="/register">Não possuo cadastro</LinkStyle>
        </ContainerFormUser>
    </ContainerGlobal>
  )
}

const mapStateToProps = (state: RootState) => ({
    auth: state.authReducer.auth
})


export default connect(mapStateToProps)(Login)