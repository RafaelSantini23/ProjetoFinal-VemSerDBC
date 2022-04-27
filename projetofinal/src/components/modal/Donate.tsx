import { Field, Form, Formik } from "formik"
import { ButtonForm } from "../../Global.styles"
import { DonateCreateDTO } from "../../models/DonateCreateDTO"
import Theme from "../../theme"
import { convertMoney, numberMask } from "../../utils/Utils"
import { ContainerDonation, InputCurrency } from "./Modal.styles"
import { donateForCampaign } from "../../store/actions/fundraiserAction"
import { RootState } from "../../store"
import { connect, DispatchProp } from "react-redux"
import { Params, useParams } from "react-router-dom";


function Donate({ donate, dispatch, onClick }: DonateCreateDTO & DispatchProp) {

  const { id }: Readonly<Params<string>> = useParams();


  return (
    <div>
      <ContainerDonation>
        <Formik
          initialValues={{
            value: 0,
          }}

          onSubmit={(values: DonateCreateDTO['donate']) => {

            const donateCampaign = {
              donate: {
                message: 'teste',
                value: convertMoney(values.value as string),
              }
            }
            donateForCampaign(dispatch, donateCampaign, id)
            onClick?.()

          }}
        >
          {props => (

            <Form>

              <label htmlFor="value"> Informe o valor: </label>

              <Field as={InputCurrency} mask={numberMask} id="value" name="value" />

              <ButtonForm colors={`${Theme.colors.dark}`} type='submit'>Doar</ButtonForm>

            </Form>
          )}
        </Formik>

      </ContainerDonation>

    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  donate: state.fundraiserReducer.donate
})


export default connect(mapStateToProps)(Donate)