import React, { useState } from 'react';
import * as C from './styles';
const lang = require(`../../../../Languages/${process.env.REACT_APP_LANG}.json`);

const Form = ({ insertDocument }) => {
    const toDay = new Date().toISOString().substring(0, 10)
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    let provenience = Array.from(categories || []).filter(item => item.type === 'provenience')

    // Both
    const [date, setDate]  = useState(toDay);
    const [desc, setDesc]  = useState('');
    const [amount, setAmount] = useState('');
    const [forn, setForn]  = useState('');
    
    // Paid payments
    const [prov, setProv]  = useState('3R');
    const [isExpense, setExpense] = useState(true);

    // To pay payments
    const [link, setLink]  = useState('');
    const [bank, setBank]  = useState('');
    const [idnumber, setIdnumber]  = useState('');

    const handleSave = () => {
        if (!desc || !amount || !date) {
            alert(lang.alert01);
            return;
        }   else if (amount.replace(/,/g, '.') < 0.01) {
            alert(lang.alert02);
            return;  
        }

        const transaction = {
            financialControl: {
                date: date,
                desc: desc,
                amount: amount.replace(/,/g, '.'),
                expense: isExpense,
                prov: prov,
                forn: forn,
            },
            todoPayments: {
                date: date,
                link: link,
                bank: bank,
                idnumber: idnumber,
                forn: forn,
                desc: desc,
                amount: amount.replace(/,/g, '.'),
            }
        }

        insertDocument(transaction[localStorage.getItem('sheetType')]);
        
        setDesc('');
        setAmount('');
        setForn('');
        setLink('');
        setBank('');
        setIdnumber('');
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
                {localStorage.getItem('sheetType') === 'financialControl' && 
                <>
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
                </>}
                {localStorage.getItem('sheetType') === 'todoPayments' && 
                <>
                <C.InputContent>
                    <C.Label>{lang.link}</C.Label>
                    <C.Input
                        value={link}
                        placeholder={`${lang.placeholder} ${lang.link}`}
                        onChange={(e) => setLink(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                    />
                </C.InputContent>
                <C.InputContent>
                    <C.Label>{lang.bank}</C.Label>
                    <C.Input
                        value={bank}
                        placeholder={`${lang.placeholder} ${lang.bank}`}
                        onChange={(e) => setBank(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        />
                </C.InputContent>
                <C.InputContent>
                    <C.Label>{lang.idnumber}</C.Label>
                    <C.Input
                        value={idnumber}
                        placeholder={`${lang.placeholder} ${lang.idnumber}`}
                        onChange={(e) => setIdnumber(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        />
                </C.InputContent>
                </>}
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