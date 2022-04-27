import { Field, Form, Formik, FormikHelpers } from "formik";
import { connect, DispatchProp } from "react-redux";
import { ButtonForm, CampaignForm, DivValidate, InputStyle, LabelForm, SpanError } from "../../Global.styles";
import { FundraiserDTO } from "../../models/FundraiserDTO";
import { CheckCloseStyle, DescriptionStyle } from "../../pages/createCampanhas/CreateCampaign.styles";
import { RootState } from "../../store";
import Theme from "../../theme";
import { base64ToFile,  converteBRL,  convertImage64, convertMoney, numberMask, validDate } from "../../utils/Utils";
import { InputCurrency } from "./Modal.styles";
import * as Yup from 'yup';
import CreatableSelect from 'react-select/creatable';
import PreviewImage from "../PreviewImage/PreviewImage";
import { updateCampaign } from "../../store/actions/fundraiserAction";
import moment from "moment";
import { useNavigate } from "react-router-dom";



function EditCampaign({ campaign, categoryList, onClick }: FundraiserDTO & DispatchProp & any) {
  const navigate = useNavigate()
  
    const handleChange = (value: any, setFieldValue: any) => {
      
        let list = value.map((item: any) => item.value)

        setFieldValue('categories', list)
    };

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
      console.log(campaign)
  return (
    <div>
      <CampaignForm>
      <Formik
        initialValues={{
          automaticClose: campaign.automaticClose,
          categories: campaign.categories.map((item: any) => (item.name)),
          endingDate: campaign.endingDate,
          description: campaign.description,
          goal: converteBRL(campaign.goal),
          title: campaign.title,    
          coverPhoto: base64ToFile(convertImage64(campaign.coverPhoto), 'image/png') as any,
          }}
          validationSchema={SignupSchema}
          onSubmit={(
            values: FundraiserDTO['campaign']  
            ) => {                    
              const campaignEdit = {
                goal: convertMoney(values.goal),
                endingDate: moment(values.endingDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                coverPhoto: values.coverPhoto,
                description: values.description,
                categories: values.categories,
                title: values.title,
                automaticClose: values.automaticClose,
              }
            updateCampaign(campaignEdit, campaign.fundraiserId)
            onClick?.()
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
              <LabelForm htmlFor='automaticClose'>
                <Field type="checkbox" defaultChecked={campaign.automaticClose === true ? true : false} name="automaticClose" id="automaticClose" />
                Encerrar a campanha após atingir a meta?
              </LabelForm>
                {props.errors.automaticClose && props.touched.automaticClose ? (
                  <SpanError>{props.errors.automaticClose}</SpanError>
                  ) : null}
              </DivValidate>
              <DivValidate>
                <LabelForm htmlFor='endingDate'>Data limite</LabelForm>
                <InputStyle name="endingDate" id="endingDate"  placeholder="Digite a data de encerramento da campanha" />
                {props.errors.endingDate && props.touched.endingDate ? (
                  <SpanError>{props.errors.endingDate}</SpanError>
                  ) : null}
              </DivValidate>
              <DivValidate>
                <LabelForm htmlFor='coverPhoto'>Foto de capa</LabelForm>
                <input name="coverPhoto" id="coverPhoto" type="file" onChange={event => props.setFieldValue('coverPhoto', event.target.files?.[0])}/>
                {props.values.coverPhoto && <PreviewImage file={props.values.coverPhoto}/>} 
                {/* <img src={convertImage64(campaign.coverPhoto)} width='100px' height='100px' alt="" /> */}
                {props.errors.coverPhoto && props.touched.coverPhoto ? (
                  <SpanError>{props.errors.coverPhoto}</SpanError>
                  ) : null}
              </DivValidate>
              <DivValidate>
                <LabelForm htmlFor='categories'>Categorias da campanha</LabelForm>
                <Field component={CreatableSelect} defaultValue={categoryList} isMulti="true" onChange={(event: React.ChangeEvent) => handleChange(event, props.setFieldValue)} name="categories" id="categories" placeholder="Digite a(s) categoria(s)">
                  
                </Field>
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
              <ButtonForm colors={`${Theme.colors.dark}`}  type='submit'>Atualizar</ButtonForm>
            </Form>  
          )}          
        </Formik>
      </CampaignForm>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
    campaign: state.fundraiserReducer.campaign,
    categoryList: state.fundraiserReducer.categoryList,
})



export default connect(mapStateToProps)(EditCampaign)