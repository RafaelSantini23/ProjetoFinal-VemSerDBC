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
    const maskReais = (value: string) => {
        return (Number(value.replace(/\D/g, "")) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        };
        
        const unMaskReais = (value: string) => {
        return typeof (value) === 'number' ? value : (Number(value.replace(/\D/g, "")) / 100);
        }
        
        
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

                      }}
                      >
                     
                         <Form>
                      <label htmlFor="money"> Informe o valor: </label> 
                      
                      <Field onChange={(event: any) => maskReais(event.target.value) } id="money" name="money"  />  
                      <ButtonForm type='submit'>Doar</ButtonForm>
                  </Form>  
                            
                       
                             
              </Formik>

            </ContainerDonation>  
            }
            </Content>
            
            </ModalPrincipal>
    </ModalContainer>
  )
}
export default Modal

