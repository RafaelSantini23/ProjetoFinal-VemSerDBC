import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';
import { UsersCreateDTO } from "../../models/UsersCreateDTO";
import PasswordStrengthBar from "react-password-strength-bar";
import { validaNome, validaSenha, validaEmail } from "../../utils/Utils";
import { ButtonForm, ContainerFormUser, ContainerGlobal, DivValidate, InputStyle, LabelForm, LinkStyle, LogoDiv, SpanError } from "../../Global.styles";
import { registerUser } from "../../store/actions/usersAction";
import { RootState } from "../../store";
import { connect, DispatchProp } from "react-redux";
import { useNavigate } from "react-router-dom";
import Theme from "../../theme";
import { ImgLogin, TitleLogin } from "../login/login.styles";
import ThemeImg from '../../imgs/theme.png';


function Register({ user, dispatch }: UsersCreateDTO & DispatchProp) {
  const navigate = useNavigate();

  const SignupSchema = Yup.object().shape({
    login: Yup.string()
      .min(4, 'Minimo 4 caracteres!')
      .max(50, 'Too Long!')
      .matches(validaNome, 'Nome inválido!')
      .required('Campo Obrigatório!'),

    email: Yup.string()
      .email('Email inválido!')
      .matches(validaEmail, 'Email incorreto!')
      .required('Campo Obrigatório!'),

    password: Yup.string()
      .matches(validaSenha, 'Senha inválida!')
      .required('Campo Obrigatório!'),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Senhas diferentes!")
      .required('Campo Obrigatório!'),
  });



  return (
    <ContainerGlobal>
      <ContainerFormUser>
      <ImgLogin>
            <img src={ThemeImg}  height={'250px'} alt="" />
            <TitleLogin> Sistema de arrecadações DevSer</TitleLogin>
        </ImgLogin>
        <LinkStyle color={`${Theme.colors.dark}`} mT="20px" to="/">Voltar ao login</LinkStyle>
          <Formik
                  initialValues={{
                    email: '',
                    login: '',
                    password: '',
                    confirmPassword: '',  
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={(
                      values: UsersCreateDTO['user'],
                      { setSubmitting }: FormikHelpers<UsersCreateDTO['user']>
                      ) => {

                        const user = {
                          email: values.email,
                          login: values.login,
                          password: values.password,
                          profilePhoto: values.profilePhoto
                        }                        
                        registerUser(dispatch, user, navigate);
                        setSubmitting(false)
                      }}
                      >
                  {props => ( 
                  <Form>
                      <DivValidate>
                          <LabelForm htmlFor="email">Email</LabelForm>
                          <InputStyle name="email" id="email" placeholder="Digite o seu e-mail" type="email"/>
                          {props.errors.email && props.touched.email ? (
                            <SpanError>{props.errors.email}</SpanError>
                            ) : null}
                      </DivValidate>
                      <DivValidate>
                          <LabelForm htmlFor='login'>Nome</LabelForm>
                          <InputStyle  name="login" id="login" placeholder="Digite o seu nome"/>
                          {props.errors.login && props.touched.login ? (
                            <SpanError>{props.errors.login}</SpanError>
                            ) : null}
                      </DivValidate>
                      <DivValidate>
                          <LabelForm htmlFor='password'>Senha</LabelForm>
                          <PasswordStrengthBar password={props.values.password} />
                          <InputStyle name="password" id="password"  placeholder="Digite a sua senha"/>
                          {props.errors.password && props.touched.password ? (
                            <SpanError>{props.errors.password}</SpanError>
                            ) : null}
                      </DivValidate>
                      <DivValidate>
                          <LabelForm htmlFor='confirmPassword'>Confirme a Senha</LabelForm>
                          <InputStyle name="confirmPassword" id="confirmPassword"  placeholder="Digite novamente a sua senha" />
                          {props.errors.confirmPassword && props.touched.confirmPassword ? (
                            <SpanError>{props.errors.confirmPassword}</SpanError>
                            ) : null}
                      </DivValidate>
                      <DivValidate>   
                            <LabelForm htmlFor='profilePhoto'>Foto de Perfil</LabelForm>
                            <input name="profilePhoto" id="profilePhoto" type="file" onChange={event => props.setFieldValue('profilePhoto', event.target.files?.[0])}/>
                      </DivValidate>
                      <ButtonForm colors={`${Theme.colors.dark}`} type='submit'>Cadastrar</ButtonForm>
                  </Form>  
                  )}          
              </Formik>
      </ContainerFormUser>
    </ContainerGlobal>
  )
}

const mapStateToProps = (state: RootState) => ({
  user: state.userReducer.user
});  


export default connect(mapStateToProps)(Register)