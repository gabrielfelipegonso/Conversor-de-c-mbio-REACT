import classes from './CurrencyConverter.module.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const CurrencyConverter = () => {
    const [rates, setRates] = useState(0);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState(0);
    const [convertedAmount, setConvertedAmount] = useState(0);
    const ratesRef = useRef(rates);
    
    //  const fromCurrency = useRef(fromCurrency);
    //  const toCurrency = useRef(toCurrency);
    console.log(amount)
    useEffect(() => {
        convert(`https://v6.exchangerate-api.com/v6/a2f7525aa25bbf45027dab25/pair/${fromCurrency}/${toCurrency}`);
        console.log(fromCurrency);
        console.log(toCurrency);
    }, [amount, fromCurrency, toCurrency]);

    const handleFromCurrency = (e) => {
        setFromCurrency(e.target.value);
       
    };

    const handleToCurrency = (e) => {
        setToCurrency(e.target.value);
      
    };

   

    const convert = (cLink) => {
        if (amount === '') {
            setConvertedAmount(0);
            return;
        }

        axios.get(cLink)
            .then(response => {
                ratesRef.current = response.data.conversion_rate;
               
                setConvertedAmount((parseFloat(amount) * ratesRef.current).toFixed(2));
            })
            .catch(error => {
                console.error('Error fetching conversion rates:', error);
                setRates(null);
                setConvertedAmount(0);
            });
    };

    const handleInp = (e) => {
        let value = e.target.value;

        // Remover caracteres que não são dígitos, ponto ou sinal de menos (-)
        value = value.replace(/[^0-9.]/g, '');

        value = value.replace(/^0+(?=\d)/, "");

        let thereIsNaN = /[^0-9.]/.test(value);

        if (/^[0-9^.]+$/.test(value) && !thereIsNaN) {
            setAmount(value);
           
        } else {
            setAmount('');
         
        }
    };

    return (
        <div className={classes.converter}>
            <h1 className={classes.titulo1}>Conversor de moedas</h1>

                <div className={classes.resultContainer}>
                    <p className={classes.paragrafo}>{amount} {fromCurrency} equivale a {convertedAmount} {toCurrency}</p>
                </div>
        

            <input className={`${classes.inpSel} ${classes.input}`} value={amount} type="text" onChange={handleInp} />
            <span>Converter de</span>
            <select name="" value={fromCurrency} id="" className={classes.inpSel} onChange={handleFromCurrency}>
                <option value="BRL">Real</option>
                <option value="USD">Dólar americano</option>
                <option value="EUR">Euro</option>
                <option value="GBP">Libras esterlinas</option>
                <option value="CHF">Franco Suíço</option>
            </select>
            <span>para</span>
            <select className={classes.inpSel} value={toCurrency} name="" id="" onChange={handleToCurrency}>
                <option value="BRL">Real</option>
                <option value="USD">Dólar americano</option>
                <option value="EUR">Euro</option>
                <option value="GBP">Libras esterlinas</option>
                <option value="CHF">Franco Suíço</option>
            </select>
        </div>
    );
};
