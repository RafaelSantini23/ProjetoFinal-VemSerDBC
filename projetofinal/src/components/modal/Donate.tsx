import { Field, Form, Formik } from "formik"
import { ButtonForm } from "../../Global.styles"
import { DonateCreateDTO } from "../../models/DonateCreateDTO"
import Theme from "../../theme"
import { convertMoney, numberMask } from "../../utils/Utils"
import { ContainerDonation, InputCurrency } from "./Modal.styles"
import { donateForCampaign } from "../../store/actions/fundraiserAction"
import { RootState } from "../../store"
import { connect, DispatchProp } from "react-redux"

function Donate({donate, dispatch, onClick}: any & DispatchProp) {

  console.log(donate);
  
  

  return (
    <div>
            <ContainerDonation> 
                
                 <Formik
                  initialValues={{
                      value: 0,
                  }}
                
                  onSubmit={ ( values: DonateCreateDTO ) => {

                        const donateCampaign = {
                            message: 'teste',
                            value: convertMoney(values.value as string),
                        }

                        donateForCampaign(dispatch,donateCampaign)
                        
                        onClick()

                      }}
                      >
                     {props => (

                         <Form>

                                <label htmlFor="value"> Informe o valor: </label> 
                                    
                                    <Field as={InputCurrency} mask={numberMask}  id="value" name="value"  />  

                                <ButtonForm colors={`${Theme.colors.dark}`}  type='submit'>Doar</ButtonForm>

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