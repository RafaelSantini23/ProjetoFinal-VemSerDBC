import { Field, Formik } from "formik";
import { connect, DispatchProp } from "react-redux";
import { ButtonForm, CampaignForm, DatePickerStyled, DivValidate, InputFormat, InputStyle, LabelForm, SpanError } from "../../Global.styles";
import { FundraiserDTO } from "../../models/FundraiserDTO";
import { CheckCloseStyle, DescriptionStyle } from "../../pages/createCampanhas/CreateCampaign.styles";
import { RootState } from "../../store";
import Theme from "../../theme";
import { base64ToFile,  converteBRL,  convertImage64, convertMoney, numberMask, validDate } from "../../utils/Utils";
import * as Yup from 'yup';
import CreatableSelect from 'react-select/creatable';
import PreviewImage from "../previewImage/PreviewImage";
import { updateCampaign } from "../../store/actions/fundraiserAction";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { FileContainer, FileStyles, FirstColumn, FormStyled, SecondColumn } from "./EditCampaign.styles";
import pt from "date-fns/locale/pt";
import { useState } from "react";
import DefaultCapa from '../../imgs/dbc.png'
import MaskedInput from "react-text-mask";



type CategoryName = {
  name: string
}

function EditCampaign({ campaign, categoryList, onClick, dispatch }: FundraiserDTO & DispatchProp & any) {
  const [dateValue, setDateValue] = useState<null | Date>(new Date(moment(campaign.endingDate).utc() as any));

  const handleChange = (value: any, setFieldValue: any) => {
      
        let list = value.map((item: any) => item.value)

        setFieldValue('categories', list)
  };

    const formatDatePicker = (value: Date, setFieldValue: any) => {
      setDateValue(value);
      console.log(value);
      
      setFieldValue('endingDate', moment(value).format('DD/MM/YYYY'))
    }
    
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
    <div>
      <CampaignForm>
      <Formik
      enableReinitialize={true}
        initialValues={{
          automaticClose: campaign.automaticClose,
          categories: campaign.categories.map((item: CategoryName) => (item.name)),
          endingDate: moment(campaign.endingDate, 'YYYY-MM-DD').format('DD/MM/YYYY'),
          description: campaign.description,
          goal: converteBRL(campaign.goal),
          title: campaign.title,    
          coverPhoto: campaign.coverPhoto ? base64ToFile(convertImage64(campaign.coverPhoto), 'image/png') as any : null,
          }}

          validationSchema={SignupSchema}
          onSubmit={(
            values: FundraiserDTO['campaign']  
            ) => {                    
              const campaignEdit = {
                goal: convertMoney(values.goal as string),
                endingDate: moment(values.endingDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                coverPhoto: values.coverPhoto,
                description: values.description,
                categories: values.categories,
                title: values.title,
                automaticClose: values.automaticClose,
              }

            console.log(values.endingDate);
              
            updateCampaign(campaignEdit, dispatch, campaign.fundraiserId)

            console.log('campanha',campaignEdit);
            
            onClick?.()
          }}
            >
          {props => (
            <FormStyled>
                <FirstColumn>
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
                        <Field type="checkbox" defaultChecked={campaign.automaticClose ? true : false} name="automaticClose" id="automaticClose" />
                        Encerrar a campanha após atingir a meta?
                      </LabelForm>
                        {props.errors.automaticClose && props.touched.automaticClose ? (
                          <SpanError>{props.errors.automaticClose}</SpanError>
                          ) : null}
                      </DivValidate>
                      <DivValidate>
                        <LabelForm htmlFor='endingDate'>Data limite</LabelForm>
                        <DatePickerStyled 
                          selected={dateValue}
                          dateFormat="dd/MM/yyyy" 
                          customInput={(<MaskedInput mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]} />)}
                          locale={pt} 
                          name="endingDate" 
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
                          <LabelForm htmlFor='description'>Descrição</LabelForm>
                          <Field as={DescriptionStyle} name="description" id="description"  placeholder="Digite a descrição da campanha" />
                          {props.errors.description && props.touched.description ? (
                            <SpanError>{props.errors.description}</SpanError>
                            ) : null}
                        </DivValidate>
                  </FirstColumn>
                  <SecondColumn>
                        <DivValidate>
                          <LabelForm htmlFor='coverPhoto'>Foto de capa</LabelForm>
                          <FileContainer>

                          <FileStyles name="coverPhoto" id="coverPhoto" type="file" onChange={event => props.setFieldValue('coverPhoto', event.target.files?.[0])  } />
                          {props.values.coverPhoto  ? <PreviewImage file={props.values.coverPhoto} /> : <img src={DefaultCapa} width='100px' alt="imagem default" />  }  
                          </FileContainer>
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
                       
                        <ButtonForm colors={`${Theme.colors.dark}`}  type='submit'>Atualizar</ButtonForm>
                  </SecondColumn>
            </FormStyled>  
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