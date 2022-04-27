import { Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react"
import { connect, DispatchProp } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { ButtonForm, DivValidate, inputDate, InputStyle, LabelForm, SpanError } from "../../Global.styles";
import { CheckCloseStyle, DivButton, DescriptionStyle, ContainerFormCampaign, ContainerCampaign } from "./CreateCampaign.styles";
import { FundraiserDTO } from "../../models/FundraiserDTO";
import { RootState } from "../../store";
import { convertMoney, isLoggedin, numberMask,  validDate } from "../../utils/Utils";
import { createCampaign } from "../../store/actions/fundraiserAction";
import CreatableSelect from 'react-select/creatable';
import moment from "moment";
import Theme from "../../theme";
import { InputCurrency } from "../../components/modal/Modal.styles";



function CreateCampaign({ campaign, dispatch }: FundraiserDTO & DispatchProp) {
  const navigate = useNavigate()

  const handleChange = (value: any, setFieldValue: any) => {
    let list = value.map((item: any) => item.value)
    setFieldValue('categories', list)
  };

  const bananas = [
    {label: 'banana', value:'banana'}
  ]
  
    
  useEffect(() => {
      isLoggedin(navigate)
  }, [])

  
  const SignupSchema = Yup.object().shape({
    goal: Yup.string()
    .min(4, "Pelo menos 4 números!")
    .required('Campo Obrigatório!'),

    endingDate: Yup.string()
    .min(10, 'Data inválida!')
    .test('Data válida!', 'Data inválida!', (value) => validDate(value))

    .required('Campo Obrigatório!'),

    automaticClose: Yup.boolean()
    .oneOf([true , false], 'Campo Obrigatório!')
    .nullable(),

    title: Yup.string()
    .required('Campo Obrigatório!'),

    description: Yup.string()
    .required('Campo Obrigatório!'),

    categories: Yup.array()
    .min(1, 'Campo Obrigatório!')
    .required('Campo Obrigatório!'),
  });




  return (
    <ContainerCampaign>
      <DivButton>
        <ButtonForm colors={`${Theme.colors.dark}`} onClick={() => navigate('/campanhas')}>Voltar as campanhas</ButtonForm>
      </DivButton>
       <ContainerFormCampaign>
       <Formik
                initialValues={{
                    automaticClose: null,
                    categories: '',
                    endingDate: '',
                    description: '',
                    goal: '',
                    title: '',    
                  }}
                  validationSchema={SignupSchema}
                onSubmit={(
                    values: FundraiserDTO['campaign'],
                    { setSubmitting }: FormikHelpers<FundraiserDTO['campaign']>
                    ) => {        
                    
                      const campaign = {
                        title: values.title,
                        goal: convertMoney(values.goal),
                        endingDate: moment(values.endingDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                        automaticClose: values.automaticClose,
                        coverPhoto: values.coverPhoto,
                        categories: values.categories,
                        description: values.description,
                      }

                      console.log(values);
                      

                    createCampaign(dispatch, campaign, navigate)

                    setSubmitting(false);
                    }}
                    >
                  {props => (
                  <Form>
                      <DivValidate>
                          <LabelForm htmlFor="title">Titulo</LabelForm>
                          <InputStyle id="title" name="title" placeholder="Digite o titulo da campanha" type="title"/>
                          {props.errors.title && props.touched.title ? (
                            <SpanError>{props.errors.title}</SpanError>
                            ) : null}
                      </DivValidate>
                      <DivValidate>
                          <LabelForm htmlFor='goal'>Meta da campanha</LabelForm>
                          <Field as={InputCurrency} mask={numberMask}  name="goal" id="goal"  placeholder="Digite o valor a ser atingido"/>
                          {props.errors.goal && props.touched.goal ? (
                            <SpanError>{props.errors.goal as string}</SpanError>
                            ) : null}
                      </DivValidate>
                      <DivValidate>
                          <LabelForm htmlFor='automaticClose'>Encerrar a campanha após atingir a meta?</LabelForm>
                          <label>
                             <CheckCloseStyle type="radio" value="true" name="automaticClose" id="automaticClose"/>
                             Sim
                          </label>
                          <label>
                             <CheckCloseStyle type="radio" value="false" name="automaticClose" id="automaticClose"/>
                             Não
                          </label>
                          {props.errors.automaticClose && props.touched.automaticClose ? (
                            <SpanError>{props.errors.automaticClose}</SpanError>
                            ) : null}
                      </DivValidate>
                      <DivValidate>
                          <LabelForm htmlFor='endingDate'>Data limite</LabelForm>
                          <Field as={inputDate} mask="99/99/9999"  name="endingDate" id="endingDate"  placeholder="Digite a data de encerramento da campanha" />
                          {props.errors.endingDate && props.touched.endingDate ? (
                            <SpanError>{props.errors.endingDate}</SpanError>
                            ) : null}
                      </DivValidate>
                      <DivValidate>
                            <LabelForm htmlFor='coverPhoto'>Foto de capa</LabelForm>
                            <input name="coverPhoto" id="coverPhoto" type="file" onChange={event => props.setFieldValue('coverPhoto', event.target.files?.[0])}/>
                            {props.errors.coverPhoto && props.touched.coverPhoto ? (
                              <SpanError>{props.errors.coverPhoto}</SpanError>
                              ) : null}
                      </DivValidate>
                      <DivValidate>
                          <LabelForm htmlFor='categories'>Categorias da campanha</LabelForm>
                          <Field component={CreatableSelect} options={bananas} isMulti="true" onChange={(event: React.ChangeEvent) => handleChange(event, props.setFieldValue)} name="categories" id="categories" placeholder="Digite a(s) categoria(s)" />
                          {props.errors.categories && props.touched.categories ? (
                            <SpanError>{props.errors.categories as string}</SpanError>
                            ) : null}
                      </DivValidate>
                      <DivValidate>
                          <LabelForm htmlFor='description'>Descrição</LabelForm>
                          <Field as={DescriptionStyle} name="description" id="description"  placeholder="Digite a descrição da campanha" />
                          {props.errors.description && props.touched.description ? (
                            <SpanError>{props.errors.description}</SpanError>
                            ) : null}
                      </DivValidate>
                     
                      <ButtonForm colors={`${Theme.colors.dark}`} type='submit'>Cadastrar</ButtonForm>
                  </Form>  
                  )}          
              </Formik>
       </ContainerFormCampaign>
    </ContainerCampaign>
  )
}

const mapStateToProps = (state: RootState) => ({
    campaign: state.fundraiserReducer.campaign
})


export default connect(mapStateToProps)(CreateCampaign)