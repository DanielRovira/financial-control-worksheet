import React, { useState } from 'react';
import * as C from './styles';
const lang = require(`../../../../Languages/${process.env.REACT_APP_LANG}.json`);

const Form = ({ insertDocument }) => {
    const toDay = new Date().toISOString().substring(0, 10)
    const [date, setDate]  = useState(toDay);
    const [link, setLink]  = useState('');
    const [bank, setBank]  = useState('');
    const [idnumber, setIdnumber]  = useState('');
    const [receiver, setReceiver]  = useState('');
    const [desc, setDesc]  = useState('');
    const [amount, setAmount] = useState('');

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
            link: link,
            bank: bank,
            idnumber: idnumber,
            receiver: receiver,
            desc: desc,
            amount: amount.replace(/,/g, '.'),
        };

        insertDocument(transaction);
        
        setDesc('');
        setAmount('');
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
                <C.InputContent>
                    <C.Label>{lang.receiver}</C.Label>
                    <C.Input
                        value={receiver}
                        placeholder={`${lang.placeholder} ${lang.receiver}`}
                        onChange={(e) => setReceiver(e.target.value)}
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