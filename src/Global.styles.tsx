import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Field } from 'formik';
import styled from 'styled-components';
import InputMask from 'react-input-mask';
import MaskedInput from 'react-text-mask';
import ReactDatePicker from 'react-datepicker';
import Theme from './theme';


export const ContainerGlobal = styled.div`
    width: ${Theme.containerPrincipal.width};
    min-height: ${Theme.containerPrincipal.height};
    background-color: ${Theme.colors.dark};
    display: flex;
    justify-content: flex-end;
    
    
`
export const ContainerFormUser = styled.div`
    width: ${Theme.containerForm.width};
    min-height: ${Theme.containerPrincipal.height};
    background-color: ${Theme.colors.light};
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    
`

export const ButtonForm = styled.button<{marginTop?: string, colors?: string}>`
    width: 100%;
    height: 40px;
    border-radius: 8px;
    font-weight: 500;
    background: ${props => props.colors};
    color: #fff;
    padding: 0 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 0;
    transition: 0.8s;
    margin-top: ${props => props.marginTop};
    &:hover {
        filter: brightness(0.9);
        background-color: ${Theme.colors.secondary};
    }
    :disabled {
        background-color: ${Theme.colors.secondary};
    }
   
    
    
`

export const ButtonContributors = styled.button<{marginTop?: string, colors?: string}>`
width: 45%;
height: 40px;
border-radius: 8px;
font-weight: 500;
background: ${props => props.colors};
color: #fff;
padding: 0 32px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
border: 0;
transition: 0.8s;
margin-top: ${props => props.marginTop};
&:hover {
    filter: brightness(0.9);
    background-color: ${Theme.colors.secondary};
}
:disabled {
    background-color: ${Theme.colors.secondary};
}

`

export const DivValidate = styled.div`
    position: relative;
    padding-bottom: 20px;
`;

export const DivPassword = styled.div`
position: relative;
`;

export const IconPassword = styled.a`
    position: absolute;
    right: 2%;
    bottom: 12%;
`;

export const EyeVisible = styled(AiOutlineEye)`
    font-size: 20px;
`;

export const EyeInvisible = styled(AiOutlineEyeInvisible)`
    font-size: 20px;
`;

export const SpanError = styled.span`
    position: absolute;
    left: 1%;
    bottom: 1%;
    color: red;
`;

export const ErrorPass = styled.span`
    position: absolute;
    font-size: 14px;
    width: 280px;
    height: 30px;
    padding-top: 4px;
    left: 1%;
    bottom: 0%;
    color: red;

`

export const InputStyle = styled(Field)`
    width: 350px;
    height: 40px;
    border-radius: 8px;
    padding: 0 8px;
    background: #fff;
    border: 1px solid #a8a8b3;
    font: 400 16px 'Roboto', sans-serif;
    
`

export const LabelForm = styled.label`
    font-size: ${Theme.labelForm.fontSize};
    display: block;
    color: #9FA2B4;
    margin-top: 15px;
`

export const LogoDiv = styled.div`
    width: 100%;
    height: 100px;
    margin-bottom: 85px;
`

export const LinkStyle = styled(Link)<{mt?: string}>`
    color: ${props => props.color};
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    margin-top: ${props => props.mt};
    :hover {
        text-decoration: underline;
    }
`

export const CampaignForm = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const inputDate = styled(InputMask)`
    width: 350px;
    height: 40px;
    border-radius: 8px;
    padding: 0 8px;
    background: #fff;
    border: 1px solid #a8a8b3;
    font: 400 16px 'Roboto', sans-serif;
`

export const TotalContribution = styled.small`
    display: block;

`

export const ContainerOwner = styled.div`
    display: flex;
    width: 100%;
`



export const NotContributors = styled.h1`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`
export const categories = styled.span`
`

export const CampaignInfo = styled.div`
`


export const DatePickerStyled = styled(ReactDatePicker)`
    width: 350px;
    height: 40px;
    border-radius: 8px;
    padding: 0 8px;
    background: #fff;
    border: 1px solid #a8a8b3;
`;

export const InputFormat = styled(MaskedInput)`
    width: 350px;
    height: 40px;
    border-radius: 8px;
    padding: 0 8px;
    background: #fff;
    border: 1px solid #a8a8b3;
    font: 400 16px 'Roboto', sans-serif;
`

export const Error =  styled.p`
    font-size: 32px;
    text-align: center;
    width: 100%;
    font-weight: bold;
`

export const ErrorDiv = styled.div`
    width: 100%;    
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0px;
`