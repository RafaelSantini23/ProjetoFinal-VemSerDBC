import { Form, Formik } from "formik";
import React, { ButtonHTMLAttributes } from "react"
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
} from "./Modal.styles"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode,
    colabs?: {
        id: string,
        name: string,
        photo: string;
    }[],
    donate?: boolean,
    height: string

}




function Modal({  onClick, colabs, donate, height }: ButtonProps ) {

    //regex para formatar o valor em reais conforme digita no input
    const formatValue = (value: string) => {
        const onlyNumber = value.replace(/[^0-9]/g, '')
        const [integer, decimal] = onlyNumber.split(/(?=\d{3})/)
        return `${integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${decimal}`
    }

   const convertNumber = (newText: string) => {


    newText = newText.replace(/\D/g, '');
     newText = newText.replace(/(\d{1,2})$/, ',$1');
     newText = newText.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
       return newText;

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

                    console.log(values);
                    
                    
                      }}
                      >
                      { props => (

                          
                          <Form>
                      <label htmlFor="money"> Informe o valor: </label> 
                      <InputDonation id="money" name="money"   onChange={() => convertNumber(props.values.money)} />  
                      
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