import { Field, Form, Formik } from "formik"
import { ButtonForm } from "../../Global.styles"
import Theme from "../../theme"
import { numberMask } from "../../utils/Utils"
import { ContainerDonation, InputCurrency } from "./Modal.styles"

function Donate() {
  return (
    <div>
            <ContainerDonation> 
                
                 <Formik
                  initialValues={{
                      money: '',
                  }}
                
                  onSubmit={ ( values ) => {
                      

                      }}
                      >
                     {props => (

                         <Form>

                                <label htmlFor="money"> Informe o valor: </label> 
                                    
                                <Field as={InputCurrency} mask={numberMask}  id="money" name="money"  />  

                                <ButtonForm colors={`${Theme.colors.dark}`} type='submit'>Doar</ButtonForm>

                        </Form>  
                             )}    
              </Formik>

            </ContainerDonation>  
           
    </div>
  )
}
export default Donate