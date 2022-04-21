import styled from 'styled-components';
import Theme from './theme';

export const ContainerGlobal = styled.div`
    width: ${Theme.containerPrincipal.width};
    height: ${Theme.containerPrincipal.height};
    background-color: ${Theme.colors.dark};
    display: flex;
    justify-content: center;
    align-items: center;
    
    
`
export const ContainerFormUser = styled.div`
    width: ${Theme.containerForm.width};
    height: ${Theme.containerForm.height};
    margin: ${Theme.containerForm.margin};
    background-color: ${Theme.colors.light};
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    
`