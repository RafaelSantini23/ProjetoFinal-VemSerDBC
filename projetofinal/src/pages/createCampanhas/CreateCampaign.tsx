import { Form, Formik, FormikHelpers } from "formik";
import { useEffect } from "react"
import { connect, DispatchProp } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ButtonForm, ContainerFormUser, ContainerGlobal, InputStyle, LabelForm, LinkStyle } from "../../Global.styles";
import { CheckCloseStyle, DescriptionStyle } from "./CreateCampaign.styles";
import { FundraiserDTO } from "../../models/FundraiserDTO";
import { RootState } from "../../store";
import { isLoggedin } from "../../utils/Utils";
import { createCampaign } from "../../store/actions/fundraiserAction";



function CreateCampaign({ campaign, dispatch }: FundraiserDTO & DispatchProp) {
   const navigate = useNavigate()

    useEffect(() => {
        isLoggedin(navigate)
    }, [])

  return (
    <ContainerGlobal>
       <ContainerFormUser>
       <LinkStyle mT="20px" to="/campanhas">Voltar as campanhas</LinkStyle>
       <Formik
                initialValues={{
                    automaticClose: false,
                    categories: [],
                    validdate: '',
                    description: '',
                    goal: '',
                    title: '',    
                  }}
                  // validationSchema={SignupSchema}
                onSubmit={(
                    values,
                    { setSubmitting }: FormikHelpers<FundraiserDTO['campaign']>
                    ) => {        
                        // values.goal = parseFloat(values.goal)
                      const campaign = {
                        title: values.title,
                        goal: values.goal,
                        validdate: values.validdate,
                        automaticClose: values.automaticClose,
                        coverPhoto: values.coverPhoto,
                        categories: values.categories,
                        description: values.description,
                      }
                      console.log(values.description)
                    createCampaign(dispatch, campaign, navigate)
                    setSubmitting(false);
                    }}
                    >
                  {props => (
                  <Form>
                      <div>
                          <LabelForm htmlFor="title">Titulo</LabelForm>
                          <InputStyle id="title" name="title" placeholder="Digite o titulo da campanha" type="title"/>
                          {props.errors.title && props.touched.title ? (
                            <span>{props.errors.title}</span>
                            ) : null}
                      </div>
                      <div>
                          <LabelForm htmlFor='goal'>Meta da campanha</LabelForm>
                          <InputStyle name="goal" id="goal"  placeholder="Digite o valor a ser atingido"/>
                          {props.errors.goal && props.touched.goal ? (
                            <span>{props.errors.goal}</span>
                            ) : null}
                      </div>
                      <div>
                          <LabelForm htmlFor='automaticClose'>Encerrar a campanha após atingir a meta?</LabelForm>
                          <label>
                             <CheckCloseStyle type="radio" value="true" name="automaticClose" id="automaticClose"/>
                             Sim
                          </label>
                          <label>
                             <CheckCloseStyle type="radio" value="false" name="automaticClose" id="automaticClose"/>
                             Não
                          </label>
                      </div>
                      <div>
                          <LabelForm htmlFor='validdate'>Data limite</LabelForm>
                          <InputStyle name="validdate" id="validdate"  placeholder="Digite a data de encerramento da campanha" />
                          {props.errors.validdate && props.touched.validdate ? (
                            <span>{props.errors.validdate}</span>
                            ) : null}
                      </div>
                      <div>
                            <LabelForm htmlFor='coverPhoto'>Foto de capa</LabelForm>
                            <input name="coverPhoto" id="coverPhoto" type="file" onChange={event => props.setFieldValue('coverPhoto', event.target.files?.[0])}/>
                            {props.errors.coverPhoto && props.touched.coverPhoto ? (
                              <span>{props.errors.coverPhoto}</span>
                              ) : null}
                      </div>
                      <div>
                          <LabelForm htmlFor='categories'>Categorias da campanha</LabelForm>
                          <InputStyle name="categories" id="categories"  placeholder="Digite a(s) categoria(s) da campanha" />
                          {props.errors.categories && props.touched.categories ? (
                            <span>{props.errors.categories}</span>
                            ) : null}
                      </div>
                      <div>
                          <LabelForm htmlFor='description'>Descrição</LabelForm>
                          <DescriptionStyle name="description" id="description"  placeholder="Digite a descrição da campanha" onChange={event => props.setFieldValue('description', event.target.value)}/>
                          {props.errors.description && props.touched.description ? (
                            <span>{props.errors.description}</span>
                            ) : null}
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
    campaign: state.fundraiserReducer.campaign
})


export default connect(mapStateToProps)(CreateCampaign)