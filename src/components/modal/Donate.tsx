import { connect, DispatchProp } from "react-redux"
import { Field, Form, Formik } from "formik"
import { Params, useParams } from "react-router-dom";
import * as Yup from 'yup';
import { DonateCreateDTO } from "../../models/DonateCreateDTO"
import { convertMoney, numberMask } from "../../utils/Utils"
import { donateForCampaign } from "../../store/actions/fundraiserAction"
import { RootState } from "../../store"
import Theme from "../../theme"
import { ContainerDonation, InputCurrency } from "./Modal.styles"
import {
   ButtonForm, 
   DivValidate, 
   SpanError 
} from "../../Global.styles"
import { confirmAlert } from "react-confirm-alert";
import { Notify } from "notiflix";


function Donate({ dispatch, onClick }: DonateCreateDTO & DispatchProp) {
  const { id }: Readonly<Params<string>> = useParams();
  
  const SignupSchema = Yup.object().shape({
    value: Yup.string()
    .min(2, 'Campo Obrigatório!')
    .required('Campo Obrigatório!'),
  });
  return (
    <div>
      <ContainerDonation>
        <Formik
          initialValues={{
            value: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={(values: DonateCreateDTO['donate']) => {
            const donateCampaign = {
                value: convertMoney(values.value as string),
            }

            confirmAlert({
              title: 'Confirme para doar',
              message: 'Deseja realmente doar este valor?',
              buttons: [
                {
                  label: 'Sim',
                  onClick: () => (donateForCampaign(donateCampaign, dispatch, id as string), onClick?.(), Notify.success('Doação realizada com sucesso!')),
                },
                {
                  label: 'Não',
                  onClick: () => (Notify.success('Cancelado!')),
                }
              ]
            });
            
            
          }}
        >
          {props => (

            <Form>

              <label htmlFor="value"> Informe o valor: </label>

              <DivValidate>
              <Field as={InputCurrency} mask={numberMask} id="value" name="value" />
              {props.errors.value && props.touched.value ? (
                <SpanError>{props.errors.value}</SpanError>
                ) : null}
                </DivValidate>


              <ButtonForm colors={`${Theme.colors.dark}`} type='submit'>Doar</ButtonForm>

            </Form>
          )}
        </Formik>

      </ContainerDonation>

    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  donate: state.fundraiserReducer.donate,
  loadingDetails: state.fundraiserReducer.loadingDetails,
})


export default connect(mapStateToProps)(Donate)