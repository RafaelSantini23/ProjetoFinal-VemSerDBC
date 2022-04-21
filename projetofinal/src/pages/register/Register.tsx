import { Field, Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { UsersCreateDTO } from "../../models/UsersCreateDTO";
import PasswordStrengthBar from "react-password-strength-bar";
import { validaNome, validaSenha, validaEmail } from "../../utils/Utils";

function Register() {

  const SignupSchema = Yup.object().shape({
    nome: Yup.string()
      .min(4, 'Minimo 4 caracteres!')
      .max(50, 'Too Long!')
      .matches(validaNome, 'Nome inválido!')
      .required('Campo Obrigatório!'),

    email: Yup.string()
      .email('Email inválido!')
      .matches(validaEmail, 'Email incorreto!').trim()
      .required('Campo Obrigatório!'),

    senha: Yup.string()
      .matches(validaSenha, 'Senha inválida!')
      .required('Campo Obrigatório!'),

    confirmasenha: Yup.string()
      .oneOf([Yup.ref("senha"), null], "Senhas diferentes!")
      .required('Campo Obrigatório!')
  });

  return (
    <div>
      <Link to="/">Voltar ao login</Link>
         <Formik
                initialValues={{
                    nome: '',
                    email: '',
                    senha: '',
                    confirmasenha: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={(
                    values: UsersCreateDTO['userCreate'],
                    { setSubmitting }: FormikHelpers<UsersCreateDTO['userCreate']>
                    ) => {
                        setSubmitting(false);
                    }}
                    >
                {props => (
                <Form>
                    <div>
                        <label htmlFor='nome'>Nome</label>
                        <Field  name="nome" id="nome" placeholder="Digite o seu nome" />
                        {props.errors.nome && props.touched.nome ? (
                          <span>{props.errors.nome}</span>
                          ) : null}
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field id="email" name="email" placeholder="Digite o seu e-mail" type="email"/>
                        {props.errors.email && props.touched.email ? (
                          <span>{props.errors.email}</span>
                          ) : null}
                    </div>
                    <div>
                        <label htmlFor='senha'>Senha</label>
                        <Field name="senha" id="senha"  placeholder="Digite a sua senha"/>
                        <PasswordStrengthBar password={props.values.senha} />
                        {props.errors.senha && props.touched.senha ? (
                          <span>{props.errors.senha}</span>
                          ) : null}
                    </div>
                    <div>
                        <label htmlFor='confirmasenha'>Confirme a Senha</label>
                        <Field name="confirmasenha" id="confirmasenha"  placeholder="Digite novamente a sua senha" />
                        {props.errors.confirmasenha && props.touched.confirmasenha ? (
                          <span>{props.errors.confirmasenha}</span>
                          ) : null}
                    </div>
                    <button  type='submit'>Cadastrar</button>
                </Form>  
                 )}          
            </Formik>
    </div>
  )
}
export default Register