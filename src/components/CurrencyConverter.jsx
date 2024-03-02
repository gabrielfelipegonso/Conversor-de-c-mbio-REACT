import classes from './CurrencyConverter.module.css'
import { useState,  useEffect } from 'react'
import axios from 'axios'

export const CurrencyConverter = () =>{
    const [rates, setRates] =useState(null);
    const [fromCurrency, setFromCurrency] = useState('USD');    
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState(0);
    const [convertedAmount, setConvertedAmount] = useState(0);
    useEffect(() => {
    convert();
}, [amount, fromCurrency, toCurrency]);
    const handleFromCurrency = (e) => {
        setFromCurrency(e.target.value);
       
    }
    const handleToCurrency = (e) => {
        setToCurrency(e.target.value);
     
    }
    const convertedApiLink = ()=>{
        return `https://v6.exchangerate-api.com/v6/a2f7525aa25bbf45027dab25/pair/${fromCurrency}/${toCurrency}`;
    }
    const convert = () =>{
        if(amount == ''){
        setConvertedAmount('');
            
        }
        else {

            axios.get(convertedApiLink()).then(
        Response => {
            
          
            setRates(Response.data.conversion_rate);

            setConvertedAmount((parseFloat(amount)*rates).toFixed(2));
            
        
        }
         

    );
    }}
const handleInp = (e) => {

    let value = e.target.value;
if(value ==''){
    setAmount(0);
}
    // Remover caracteres que não são dígitos, ponto ou sinal de menos (-)
    // value = value.replace(/\D/g, '');
    value = value.replace(/[^0-9.]/g, '');


  value = value.replace(/^0+(?=\d)/, "");
    let thereIsNaN = /[^0-9.]/.test(value);
   if(/^[0-9^.]+$/.test(value) && !thereIsNaN){

    setAmount(value);
   }else{
    setAmount(0);
   }

    // Atualizar o valor no estado
    
}
    return (
      <div className={classes.converter}>
       
        <h1 className={classes.titulo1}>Conversor de moedas</h1>

         
               {
             convertedAmount > 0 ?     <div className={classes.resultContainer}>  <p>{amount} {fromCurrency} equivale a {convertedAmount} {toCurrency} </p>  </div>: ''
            }
       
     


        <input  className={`${classes.inpSel} ${classes.input}`} value={amount} type="number" onChange={handleInp}/> 
        <span>Converter de</span>
        <select name="" value={fromCurrency} id="" className={classes.inpSel} onChange={handleFromCurrency}>
           <option value="BRL">Real</option>
            <option value="USD">Dólar americano</option>
            <option value="EUR">Euro</option>
            <option value="GBP">Libras esterlinas</option>
            <option value="CHF">Franco Suíço</option>
        </select>
        <span>para</span>
        <select  className={classes.inpSel} value={toCurrency} name="" id="" onChange={handleToCurrency}>
            <option value="BRL">Real</option>
            <option value="USD">Dólar americano</option>
            <option value="EUR">Euro</option>
            <option value="GBP">Libras esterlinas</option>
            <option value="CHF">Franco Suíço</option>
        </select>
      
      
    
        
    </div>
//a2f7525aa25bbf45027dab25 
//GET https://v6.exchangerate-api.com/v6/a2f7525aa25bbf45027dab25/pair/EUR/GBP

    )
}