import moment from "moment";
import { NavigateFunction } from "react-router-dom";
import { createNumberMask } from "text-mask-addons";
import 'moment/locale/pt-br';
import "react-datepicker/dist/react-datepicker.css";

// Regex
export const validaNome = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/;

export const validaEmail = /^.{2}\w+([-+.']\w+)*@?(dbccompany.com.br)$/

export const validaSenha = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}/;

// Format Date
export const formataData = (props: string) => {
  return moment(props, 'YYYY-MM-DD HH:mm:ss').locale('pt-br').fromNow()
}

export const validDate = (value: string | undefined) => {
  const data = moment()
  return moment(value, "DDMMYYYY").isValid() && moment(value, "DDMMYYYY").isAfter(moment(data, "DDMMYYYY")) 
}

// Format Functions

export const converteNumber = (props: string) => parseFloat(props.replace(',', '.'));

export const converteBRL = (valor: number | string) => {
  if (typeof(valor) === 'string') {
    const novoValor = converteNumber(valor)
    return novoValor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  }
  return valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

export const formataCorTotal = (meta: number, total: number) => {
  let cor;
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

export const  defaultMaskOptions = {
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

export const numberMask = createNumberMask(defaultMaskOptions)


export const isLoggedin = (navigate: NavigateFunction) => {
    const token = localStorage.getItem('token');

    if(!token) {
        navigate('/');
    }

}


export const convertImage64 = (value: string) => {
  return `data:image/png;base64,${value}`;
}

export const convertMoney = (value: string) => {
  value = value.split('R$').join('');

  if(value.includes('.')) {
   value = value.split('.').join('');
  }

  if(value.includes(',')) {
    value = value.split(',').join('.');
  }
  
  return parseFloat(value);
}



export const base64ToFile = (base64: string, filename: string) => {
  const arr = base64.split(',');
  const mime = arr[0]?.match(/:(.*?);/)?.[1];
  const bstr = window.atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}


//Função que transforma primeira letra de cada palavra em maiúscula

export const firstUpper = (value: string) => {
  return value.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  }
  );
}