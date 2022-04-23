import styled from "styled-components";
import { Field } from "formik";
import { Link } from "react-router-dom";
import Theme from '../../theme';

export const ContainerCampaign = styled.div`
    background-color: ${Theme.colors.background};
    min-height: ${Theme.containerPrincipal.height};
    width: ${Theme.containerPrincipal.width};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
`;

export const ContainerFormCampaign = styled.div`
    border-radius: 8px;
    background-color: ${Theme.colors.light};
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);
`;

export const DivButton = styled.div`
    width: 200px;
    margin-bottom: 20px;
`;

export const CheckCloseStyle = styled(Field)`
    margin: 0 4px 0 10px;
`;

export const DescriptionStyle = styled.textarea`
    min-width: 350px;
    max-width: 350px;
    min-height: 150px;
    max-height: 150px;
    padding: 10px;
    border: 1px solid #a8a8b3;
    border-radius: 8px;
    font: 400 16px 'Roboto', sans-serif;
`;