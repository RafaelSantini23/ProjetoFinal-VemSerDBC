import { Form, Formik, FormikHelpers } from "formik";
import { useEffect } from "react"
import { connect, DispatchProp } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { ContainerFormUser, ContainerGlobal } from "../../Global.styles";
import { AuthDTO } from "../../models/AuthDTO";
import { RootState } from "../../store";
import { isLoggedin } from "../../utils/Utils";



function CreateCampanhas({ auth, dispatch }: AuthDTO & DispatchProp) {
   const navigate = useNavigate()

    useEffect(() => {
        isLoggedin(navigate)
    }, [])

  return (
      <div></div>
    // <ContainerGlobal>
    //    <ContainerFormUser>
    //    <Formik
    //             initialValues={{
    //                 email: '',
    //                 name: '',
    //                 password: '',
    //                 confirmPassword: '',   
    //               }}
    //               // validationSchema={SignupSchema}
    //             onSubmit={(
    //                 values,
    //                 { setSubmitting }: FormikHelpers
    //                 ) => {
                   
    //                 console.log('entrei');
                    
    //                 registerUser(dispatch, user, navigate);
    //                 setSubmitting(false);
    //                 }}
    //                 >
    //               {props => (
    //               <Form>
    //                   <div>
    //                       <LabelForm htmlFor="email">Email</LabelForm>
    //                       <InputStyle id="email" name="email" placeholder="Digite o seu e-mail" type="email"/>
    //                       {props.errors.email && props.touched.email ? (
    //                         <span>{props.errors.email}</span>
    //                         ) : null}
    //                   </div>
    //                   <div>
    //                       <LabelForm htmlFor='name'>Nome</LabelForm>
    //                       <InputStyle  name="name" id="name" placeholder="Digite o seu nome" />
    //                       {props.errors.name && props.touched.name ? (
    //                         <span>{props.errors.name}</span>
    //                         ) : null}
    //                   </div>
    //                   <div>
    //                       <LabelForm htmlFor='password'>Senha</LabelForm>
    //                       <InputStyle name="password" id="password"  placeholder="Digite a sua senha"/>
    //                       <PasswordStrengthBar password={props.values.password} />
    //                       {props.errors.password && props.touched.password ? (
    //                         <span>{props.errors.password}</span>
    //                         ) : null}
    //                   </div>
    //                   <div>
    //                       <LabelForm htmlFor='confirmPassword'>Confirme a Senha</LabelForm>
    //                       <InputStyle name="confirmPassword" id="confirmPassword"  placeholder="Digite novamente a sua senha" />
    //                       {props.errors.confirmPassword && props.touched.confirmPassword ? (
    //                         <span>{props.errors.confirmPassword}</span>
    //                         ) : null}
    //                   </div>
    //                   <div>
                            
    //                         <LabelForm htmlFor='profilePhoto'>Foto de Perfil</LabelForm>
    //                         <InputStyle name="profilePhoto" id="profilePhoto"  placeholder="Selecione uma foto de perfil" type="file" onChange={(event:  React.ChangeEvent) => handleUpload(event)}/>
    //                         {props.errors.profilePhoto && props.touched.profilePhoto ? (
    //                           <span>{props.errors.profilePhoto}</span>
    //                           ) : null}

    //                       {/* <LabelForm htmlFor='profilePhoto'>Foto: </LabelForm>
    //                       <InputStyle name="profilePhoto" id="profilePhoto"  placeholder="mande o link da imagem" />
    //                       {props.errors.profilePhoto && props.touched.profilePhoto ? (
    //                         <span>{props.errors.profilePhoto}</span>
    //                         ) : null} */}
                          

    //                   </div>
    //                   <ButtonForm type='submit'>Cadastrar</ButtonForm>
    //               </Form>  
    //               )}          
    //           </Formik>
    //    </ContainerFormUser>
    // </ContainerGlobal>
  )
}

const mapStateToProps = (state: RootState) => ({
    auth: state.authReducer.auth
})


export default connect(mapStateToProps)(CreateCampanhas)