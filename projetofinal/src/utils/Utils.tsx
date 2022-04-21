import moment from "moment";
import 'moment/locale/pt-br';
import { NavigateFunction } from "react-router-dom";

// Regex
export const validaNome = /^[a-zA-Z]+$/;

export const validaEmail = /^.{3}\w+([-+.']\w+)*@?(dbccompany.com.br)$/

export const validaSenha = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}/;

// Format Date
export const formataData = (props: string) => {
  return moment(props, 'DD MM YYYY HH:mm:ss').locale('pt-br').fromNow()
}

// Format Functions

export const converteNumber = (props: string) => parseFloat(props.replace(',', '.'));

export const somaTotal = (array: string[]) => {
  const novoArray = array.map(valor => 
    converteNumber(valor)
);
    return novoArray.reduce((total, valor) => total + valor, 0);
}

export const converteBRL = (valor: number | string) => {
  if (typeof(valor) === 'string') {
    const novoValor = converteNumber(valor)
    return novoValor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  }
  return valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

export const formataTags = (array: string[]) => {
  return array.join('/')
}

export const formataCorTotal = (meta: number, total: number) => {
  let cor;
  console.log(meta, total)
  switch(true) {
    case (total < meta * 0.30):
      return cor = 'red'
    case (total > meta * 0.30 && total < meta * 0.80):
      return cor = 'orange'
    case (total > meta * 0.80):
      return cor = 'green'
  }
  return cor;
}

export const isLoggedin = (navigate: NavigateFunction) => {
    const token = localStorage.getItem('token');

    if(!token) {
        navigate('/');
    }

}


