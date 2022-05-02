import { useEffect, useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { connect, DispatchProp } from "react-redux";
import { useNavigate } from "react-router-dom";
import PasswordStrengthBar from "react-password-strength-bar";
import * as Yup from 'yup';
import { UsersCreateDTO } from "../../models/UsersCreateDTO";
import { validaNome, validaSenha, validaEmail } from "../../utils/Utils";
import { registerUser } from "../../store/actions/usersAction";
import { RootState } from "../../store";
import {
  SpanError,
  LinkStyle,
  LabelForm,
  InputStyle,
  EyeVisible,
  ButtonForm,
  DivPassword,
  DivValidate,
  IconPassword,
  EyeInvisible,
  ContainerGlobal,
  ContainerFormUser,
  ErrorPass,
} from "../../Global.styles";
import { ImgLogin, TitleLogin } from "../login/login.styles";
import { setButton } from "../../store/actions/usersAction";
import Theme from "../../theme";
import ThemeImg from '../../images/theme.png';

function Register({ user, dispatch }: UsersCreateDTO & DispatchProp) {
  const navigate = useNavigate();
  const [passVisible, setPassVisible] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token) {
       navigate('/campaigns')
    } else {
        navigate('/register')
    }

},[])

  const SignupSchema = Yup.object().shape({
    login: Yup.string()
      .min(2, 'Minimo 4 caracteres!')
      .max(50, 'Too Long!')
      .matches(validaNome, 'Nome inválido!')
      .required('Campo Obrigatório!'),

    email: Yup.string()
      .email('Email inválido!')
      .matches(validaEmail, 'Email incorreto!')
      .required('Campo Obrigatório!'),

    password: Yup.string()
      .matches(validaSenha, 'Deve conter: 8 Caracteres, 1 Letra Maiúscula e 1 Minúscula, 1 Número e 1 Símbolo! ')
      .required('Campo Obrigatório!'),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Senhas diferentes!")
      .required('Campo Obrigatório!'),
  });


  return (
    <ContainerGlobal>
      <ContainerFormUser>
      <ImgLogin>
            <img src={ThemeImg}  height={'250px'} alt="theme" />
            <TitleLogin> Sistema de arrecadações Colabore</TitleLogin>
        </ImgLogin>
        <LinkStyle color={`${Theme.colors.dark}`} mt="20px" to="/">Voltar ao login</LinkStyle>
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
                      setButton(dispatch, false)
                      setSubmitting(false)
                    }}
                    >
                {props => ( 
                  <Form>
                      <DivValidate>
                          <LabelForm htmlFor="email">Email</LabelForm>
                          <InputStyle 
                            name="email" 
                            id="email" 
                            placeholder="Digite o seu e-mail" 
                            type="email"
                          />
                          {props.errors.email && props.touched.email ? (
                            <SpanError>{props.errors.email}</SpanError>
                            ) : null}
                      </DivValidate>
                      <DivValidate>
                          <LabelForm htmlFor='login'>Nome Completo</LabelForm>
                          <InputStyle
                            name="login"
                            id="login" 
                            placeholder="Digite o seu nome"
                          />
                          {props.errors.login && props.touched.login ? (
                            <SpanError>{props.errors.login}</SpanError>
                            ) : null}
                      </DivValidate>
                      <DivValidate>
                        <LabelForm htmlFor='password'>Senha</LabelForm>
                        <DivPassword>
                          <InputStyle
                            name="password"
                            id="password"
                            type={passVisible ? "password" : "text"}
                            placeholder="Digite a sua senha" 
                          />
                          <IconPassword onClick={() => setPassVisible(!passVisible)}>
                            {passVisible ? <EyeInvisible /> : <EyeVisible />}
                          </IconPassword>
                        </DivPassword>
                        <PasswordStrengthBar
                          password={props.values.password}
                          scoreWords={['fraco', 'fraco', 'médio', 'bom', 'forte']}
                          shortScoreWord='fraco'
                          minLength={8}
                        />
                        {props.errors.password && props.touched.password ? (
                          <ErrorPass>{props.errors.password}</ErrorPass>
                        ) : null}
                      </DivValidate>
                      <DivValidate>
                        <LabelForm htmlFor='confirmPassword'>Confirme a Senha</LabelForm>
                        <InputStyle 
                          name="confirmPassword" 
                          id="confirmPassword" 
                          type={passVisible ? "password" : "text"}  
                          placeholder="Digite novamente a sua senha" 
                        />
                        {props.errors.confirmPassword && props.touched.confirmPassword ? (
                          <SpanError>{props.errors.confirmPassword}</SpanError>
                          ) : null}
                      </DivValidate>
                      <DivValidate>   
                        <LabelForm htmlFor='profilePhoto'>Foto de Perfil</LabelForm>
                        <input 
                          name="profilePhoto" 
                          id="profilePhoto" 
                          type="file" 
                          onChange={event => props.setFieldValue('profilePhoto', event.target.files?.[0])}
                        />
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