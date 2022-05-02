import { Form } from "formik";
import styled from "styled-components";


export const FileContainer = styled.div`
    display: flex;
    flex-direction: column;
`


export const FirstColumn = styled.div`


`

export const SecondColumn = styled.div`


`

export const FormStyled = styled(Form)`
    display: flex;
    justify-content: space-around;
    width: 100%;
`

export const FileStyles = styled.input<{width: string}>`
    cursor: pointer;
    ::-webkit-file-upload-button {
    background: none;
    border: none;
    cursor: pointer;
    color: white;
    
}
width: ${props => props.width};
border-radius: 4px;

`

