import { Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react"
import { connect, DispatchProp } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { ButtonForm, DatePickerStyled, DivValidate, InputFormat, InputStyle, LabelForm, SpanError } from "../../Global.styles";
import { DescriptionStyle, ContainerFormCampaign, ContainerCampaign, CreatableSelectStyle } from "./CreateCampaign.styles";
import { FundraiserDTO } from "../../models/FundraiserDTO";
import { RootState } from "../../store";
import { convertMoney, isLoggedin, numberMask,  validDate } from "../../utils/Utils";
import { createCampaign, getCategories } from "../../store/actions/fundraiserAction";
import moment from "moment";
import Theme from "../../theme";
import { InputCurrency } from "../../components/modal/Modal.styles";
import PreviewImage from "../../components/previewImage/PreviewImage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt"
import { CategoryOptionDTO } from "../../models/CategoryOptionDTO";
import { UsersCreateDTO } from "../../models/UsersCreateDTO";
import { setButton } from "../../store/actions/usersAction";
import MaskedInput from "react-text-mask";
import { CategoryDTO } from "../../models/CategoryDTO";
import { FileStyles } from "../../components/modal/EditCampaign.styles";

function CreateCampaign({ campaign, dispatch, categorys }: FundraiserDTO  & DispatchProp & CategoryOptionDTO) {
  const [dateValue, setDateValue] = useState<null | Date>(null);
  const suportedFormats = ['image/png', 'image/jpeg','image/jpg'];
  const navigate = useNavigate()

  const handleChange = (value: CategoryDTO['categories'], setFieldValue: Function) => {
    let list = value.map((item: any) => item.value)
    setFieldValue('categories', list)
  };
  
  const formatDatePicker = (value: Date, setFieldValue: Function) => {
    setDateValue(value);
    return setFieldValue('endingDate', moment(value).format('DD/MM/YYYY'))
  }


  useEffect(() => {
    getCategories(dispatch)
  }, [])

  const SignupSchema = Yup.object().shape({
    goal: Yup.string()
    .min(4, "Pelo menos 4 números!")
    .required('Campo Obrigatório!'),

    endingDate: Yup.string()
    .min(10, 'Data inválida!')
    .test('Data válida!', 'Data inválida!', (value) => validDate(value))
    .required('Campo Obrigatório!'),

    title: Yup.string()
    .required('Campo Obrigatório!'),

    description: Yup.string()
    .required('Campo Obrigatório!'),

    categories: Yup.array()
    .min(1, 'Campo Obrigatório!')
    .required('Campo Obrigatório!'),

    coverPhoto: Yup.mixed()
    .nullable()
    .test('fileSize', 'Tamanho máximo de 5MB', (value) => !value || (value && value.size <= 4000000))
    .test('fileFormat', 'Formato inválido!', (value) => !value || (value && suportedFormats.includes(value.type))),
    
  
  })



  return (
    <ContainerCampaign>
       <ContainerFormCampaign>
       <Formik
          initialValues={{
              automaticClose: false,
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
                  goal: convertMoney(values.goal as string),
                  endingDate: moment(values.endingDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                  automaticClose: values.automaticClose,
                  coverPhoto: values.coverPhoto,
                  categories: values.categories,
                  description: values.description,

              }

              createCampaign(campaign, navigate)
              setButton(dispatch, false)
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
                <Field as={InputFormat} mask={numberMask}  name="goal" id="goal"  placeholder="Digite o valor a ser atingido"/>
                {props.errors.goal && props.touched.goal ? (
                  <SpanError>{props.errors.goal as string}</SpanError>
                  ) : null}
              </DivValidate>
              <DivValidate>
                <LabelForm htmlFor='automaticClose'>
                  <Field type="checkbox" name="automaticClose" id="automaticClose" />
                  Encerrar a campanha após atingir a meta?
                </LabelForm>
              </DivValidate>
              <DivValidate>
                <LabelForm htmlFor='endingDate'>Data limite</LabelForm>
                <DatePickerStyled 
                  selected={dateValue} 
                  customInput={(<MaskedInput mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]} />)}
                  dateFormat="dd/MM/yyyy" 
                  locale={pt} 
                  name="endingDate" 
                  autoComplete="off"
                  id="endingDate" 
                  minDate={new Date()}
                  placeholderText="Informe a data de encerramento da campanha"
                  onChange={(date: Date) => formatDatePicker(date, props.setFieldValue)}
                />
                {props.errors.endingDate && props.touched.endingDate ? (
                  <SpanError>{props.errors.endingDate}</SpanError>
                  ) : null}
              </DivValidate>
              <DivValidate>
                <LabelForm htmlFor='coverPhoto'>Foto de capa</LabelForm>
                <FileStyles width="32%"  name="coverPhoto" id="coverPhoto" type="file" onChange={event => props.setFieldValue('coverPhoto', event.target.files?.[0])}/>        
                {props.errors.coverPhoto && props.touched.coverPhoto ? (
                  <SpanError>{props.errors.coverPhoto}</SpanError>
                  ) : null}
                  {props.values.coverPhoto && <PreviewImage file={props.values.coverPhoto}/>} 
              </DivValidate>
              <DivValidate>
                <LabelForm htmlFor='categories'>Categorias da campanha</LabelForm>
                <Field component={CreatableSelectStyle} options={categorys} isMulti="true" onChange={(event: CategoryDTO['categories']) => handleChange(event, props.setFieldValue)} name="categories" id="categories" placeholder="Digite a(s) categoria(s)" />
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
              <ButtonForm colors={`${Theme.colors.dark}`}  type='submit'>Cadastrar</ButtonForm>
            </Form>  
            )}          
          </Formik>
       </ContainerFormCampaign>
    </ContainerCampaign>
  )
}

const mapStateToProps = (state: RootState) => ({
    campaign: state.fundraiserReducer.campaign,
    categorys: state.fundraiserReducer.categorys,
})


export default connect(mapStateToProps)(CreateCampaign)