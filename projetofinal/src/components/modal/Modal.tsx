import { Field, Form, Formik } from "formik";
import React, { ButtonHTMLAttributes, ComponentType } from "react"
import { ButtonForm } from "../../Global.styles";
import { ButtonClose,
    Content,
    ImgModal,
    ColabName,
    ColabInfo,
    IconClose,
    ModalColab,
    HeaderModal,
    ModalContainer,
    ModalPrincipal,
    InputDonation,
    ContainerDonation,
    InputCurrency,
} from "./Modal.styles"
import InputMask from 'react-input-mask';
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'



type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode,
    colabs?: {
        id: string,
        name: string,
        photo: string;
    }[],
    donate?: boolean,
    height: string,

}






function Modal({  onClick, colabs, donate, height }: ButtonProps ) {
    //mask money para field formik
    

    const defaultMaskOptions = {
          prefix: 'R$',
          suffix: '',
          includeThousandsSeparator: true,
          thousandsSeparatorSymbol: '.',
          allowDecimal: true,
          decimalSymbol: ',',
          decimalLimit: 4, 
          integerLimit: 7, 
          allowNegative: false,
          allowLeadingZeroes: false,
        }
    
    const numberMask = createNumberMask(defaultMaskOptions)
  

  return (
    <ModalContainer>
        <ModalPrincipal >
        <HeaderModal>
            <ButtonClose onClick={onClick}> <IconClose /> </ButtonClose> 
        </HeaderModal>
        <Content height={`${height}`} >
                {colabs?.map((child) => (
                    <ModalColab>
                        <ColabInfo>
                            <ImgModal width='250px' src={child.photo} alt="profile" />
                            <ColabName>
                                {child.name}
                            </ColabName>
                        </ColabInfo>
                    </ModalColab>
                ))}

            {donate && 
            <ContainerDonation> 
                
                 <Formik
                  initialValues={{
                      money: '',
                  }}
                
                  onSubmit={ ( values ) => {

                    console.log(values);
                    
                    
                      }}
                      >
                     {props => (

                         <Form>

                      <label htmlFor="money"> Informe o valor: </label> 
                        
                      <Field as={InputCurrency} mask={numberMask}  id="money" name="money"  />  

                      <ButtonForm type='submit'>Doar</ButtonForm>
                  </Form>  
                             )}
                            
                       
                             
              </Formik>

            </ContainerDonation>  
            }
            </Content>
            
            </ModalPrincipal>
    </ModalContainer>
  )
}
export default Modal

