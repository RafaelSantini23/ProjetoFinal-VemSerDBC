import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';
import { UsersCreateDTO } from "../../models/UsersCreateDTO";
import PasswordStrengthBar from "react-password-strength-bar";
import { validaNome, validaSenha, validaEmail } from "../../utils/Utils";
import { ButtonForm, ContainerFormUser, ContainerGlobal, InputStyle, LabelForm, LinkStyle, LogoDiv } from "../../Global.styles";
import { registerUser } from "../../store/actions/usersAction";
import { RootState } from "../../store";
import { connect, DispatchProp } from "react-redux";
import { useNavigate } from "react-router-dom";


function Register({ user, dispatch }: UsersCreateDTO & DispatchProp) {
  const navigate = useNavigate();

  
  const handleUpload = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const files = target.files?.[0];

    console.log(files);
  }
  
  console.log(user);

  // const SignupSchema = Yup.object().shape({
  //   nome: Yup.string()
  //     .min(4, 'Minimo 4 caracteres!')
  //     .max(50, 'Too Long!')
  //     .matches(validaNome, 'Nome inválido!')
  //     .required('Campo Obrigatório!'),

  //   email: Yup.string()
  //     .email('Email inválido!')
  //     .matches(validaEmail, 'Email incorreto!').trim()
  //     .required('Campo Obrigatório!'),

  //   senha: Yup.string()
  //     .matches(validaSenha, 'Senha inválida!')
  //     .required('Campo Obrigatório!'),

  //   confirmasenha: Yup.string()
  //     .oneOf([Yup.ref("senha"), null], "Senhas diferentes!")
  //     .required('Campo Obrigatório!'),
  //     profilePhoto: Yup.string().required('Campo Obrigatório!')
  // });

  return (
    <ContainerGlobal>
      <ContainerFormUser>
        <LinkStyle mT="20px" to="/">Voltar ao login</LinkStyle>
          <Formik
                  initialValues={{
                      email: '',
                      name: '',
                      password: '',
                      confirmPassword: '',   
                  }}
                  // validationSchema={SignupSchema}
                  onSubmit={(
                      values: UsersCreateDTO['user'],
                      { setSubmitting }: FormikHelpers<UsersCreateDTO['user']>
                      ) => {
                        const user = {
                          email: values.email,
                          name: values.name,
                          password: values.password,
                          profilePhoto: values.profilePhoto
                        }
                        console.log('entrei');
                        
                        registerUser(dispatch, user, navigate);
                        setSubmitting(false);
                      }}
                      >
                  {props => (
                  <Form>
                      <div>
                          <LabelForm htmlFor="email">Email</LabelForm>
                          <InputStyle id="email" name="email" placeholder="Digite o seu e-mail" type="email"/>
                          {props.errors.email && props.touched.email ? (
                            <span>{props.errors.email}</span>
                            ) : null}
                      </div>
                      <div>
                          <LabelForm htmlFor='name'>Nome</LabelForm>
                          <InputStyle  name="name" id="name" placeholder="Digite o seu nome" />
                          {props.errors.name && props.touched.name ? (
                            <span>{props.errors.name}</span>
                            ) : null}
                      </div>
                      <div>
                          <LabelForm htmlFor='password'>Senha</LabelForm>
                          <InputStyle name="password" id="password"  placeholder="Digite a sua senha"/>
                          <PasswordStrengthBar password={props.values.password} />
                          {props.errors.password && props.touched.password ? (
                            <span>{props.errors.password}</span>
                            ) : null}
                      </div>
                      <div>
                          <LabelForm htmlFor='confirmPassword'>Confirme a Senha</LabelForm>
                          <InputStyle name="confirmPassword" id="confirmPassword"  placeholder="Digite novamente a sua senha" />
                          {props.errors.confirmPassword && props.touched.confirmPassword ? (
                            <span>{props.errors.confirmPassword}</span>
                            ) : null}
                      </div>
                      <div>
                            
                            <LabelForm htmlFor='profilePhoto'>Foto de Perfil</LabelForm>
                            <InputStyle name="profilePhoto" id="profilePhoto"  placeholder="Selecione uma foto de perfil" type="file" onChange={(event:  React.ChangeEvent) => handleUpload(event)}/>
                            {props.errors.profilePhoto && props.touched.profilePhoto ? (
                              <span>{props.errors.profilePhoto}</span>
                              ) : null}

                          {/* <LabelForm htmlFor='profilePhoto'>Foto: </LabelForm>
                          <InputStyle name="profilePhoto" id="profilePhoto"  placeholder="mande o link da imagem" />
                          {props.errors.profilePhoto && props.touched.profilePhoto ? (
                            <span>{props.errors.profilePhoto}</span>
                            ) : null} */}
                          

                      </div>
                      <ButtonForm type='submit'>Cadastrar</ButtonForm>
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