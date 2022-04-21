import { NavigateFunction } from "react-router-dom";

// Regex
export const validaNome = /^[a-zA-Z]+$/;

export const validaEmail = /^.{3}\w+([-+.']\w+)*@?(dbccompany.com.br)$/

export const validaSenha = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}/;

//função que converte um valor para parseFloat e dps soma todos os elementos do array
export const soma = (array: number[] | string[]) => {
    let novoArray = array.map(valor =>
        parseFloat(valor.toString().replace(',', '.'))
    )
    

    return novoArray.reduce((total, valor) => total + valor, 0)

}




export const isLoggedin = (navigate: NavigateFunction) => {
    const token = localStorage.getItem('token');

    if(!token) {
        navigate('/');
    }

}


