import React, { useState } from 'react';
import * as C from './styles';
const lang = require(`../../../../Languages/${process.env.REACT_APP_LANG}.json`);

const Form = ({ insertDocument, categories }) => {
    const toDay = new Date().toISOString().substring(0, 10)
    const [date, setDate]  = useState(toDay);
    const [desc, setDesc]  = useState('');
    const [prov, setProv]  = useState('3R');
    const [forn, setForn]  = useState('');
    const [amount, setAmount] = useState('');
    const [isExpense, setExpense] = useState(true);
    let provenience = Array.from(categories || []).filter(item => item.type === 'provenience')

    const handleSave = () => {
        if (!desc || !amount || !date) {
            alert(lang.alert01);
            return;
        }   else if (amount.replace(/,/g, '.') < 0.01) {
            alert(lang.alert02);
            return;  
        }
        
        const transaction = {
            date: date,
            desc: desc,
            amount: amount.replace(/,/g, '.'),
            expense: isExpense,
            prov: prov,
            forn: forn,
        };

        insertDocument(transaction);
        
        setDesc('');
        setAmount('');
        setForn('');
    };

    return ( 
        <>
            <C.Container>
                <C.InputContent>
                    <C.Label>{lang.date}</C.Label>
                    <C.Input
                        value={date}
                        type='date'
                        width={110}
                        onChange={(e) => setDate(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        />
                </C.InputContent>
                <C.InputContent>
                    <C.Label>{lang.type}</C.Label>
                    <C.Select
                        onChange={() => setExpense(!isExpense)}
                    >
                        <option value={lang.expenses}>{lang.expenses}</option>
                        <option value={lang.entry}>{lang.entry}</option>
                    </C.Select>
                </C.InputContent>
                <C.InputContent>
                    <C.Label>{lang.source}</C.Label>
                    <C.Select
                        value={prov}
                        onChange={(e) => setProv(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                    >
                        {provenience.map(element => <option key={element.name} value={element.name}>{element.name}</option>)}
                    </C.Select>
                </C.InputContent>
                <C.InputContent>
                    <C.Label>{lang.supplier}</C.Label>
                    <C.Input
                        value={forn}
                        placeholder={`${lang.placeholder} ${lang.supplier}`}
                        onChange={(e) => setForn(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        />
                </C.InputContent>
                <C.InputContent>
                    <C.Label>{lang.description}</C.Label>
                    <C.Input
                        value={desc}
                        placeholder={`${lang.placeholder} ${lang.description}`}
                        onChange={(e) => setDesc(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        />
                </C.InputContent>
                <C.InputContent>
                    <C.Label>{lang.value}</C.Label>
                    <C.Currency
                        value={amount}
                        prefix={lang.valuePrefix}
                        placeholder={lang.valuePlaceholder}
                        allowDecimals
                        disableAbbreviations
                        decimalScale='2'
                        onValueChange={(e) => {setAmount(e)}}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        />
                </C.InputContent>
                <C.Button onClick={handleSave} style={{textTransform: 'uppercase'}} >{lang.add}</C.Button>
            </C.Container>

        </>
     );
}
 
export default Form;