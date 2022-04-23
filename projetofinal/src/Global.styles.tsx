import styled from 'styled-components';
import { Field } from 'formik';
import Theme from './theme';
import { Link } from 'react-router-dom';

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
    
`

export const DivValidate = styled.div`
    position: relative;
    padding-bottom: 20px;
`;

export const SpanError = styled.span`
    position: absolute;
    left: 1%;
    bottom: 1%;
    color: red;
`;

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

export const LinkStyle = styled(Link)<{mT?: string}>`
    color: ${props => props.color};
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    margin-top: ${props => props.mT};
    :hover {
        text-decoration: underline;
    }
`



