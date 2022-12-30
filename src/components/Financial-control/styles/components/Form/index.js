import React, { useState } from 'react';
import * as C from './styles';
const lang = require(`../../../../Languages/${process.env.REACT_APP_LANG}.json`);

const Form = ({ insertDocument }) => {
    const toDay = new Date().toISOString().substring(0, 10)
    const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];
    let provenience = Array.from(categoriesList || []).filter(item => item.type === 'provenience').sort((a, b) => a.name.localeCompare(b.name))
    let categories = Array.from(categoriesList || []).filter(item => item.type === 'category').sort((a, b) => a.name.localeCompare(b.name))
    let subCategories = Array.from(categoriesList || []).filter(item => item.type === 'subCategory').sort((a, b) => a.name.localeCompare(b.name))

    // Both
    const [date, setDate]  = useState(toDay);
    const [desc, setDesc]  = useState('');
    const [amount, setAmount] = useState('');
    const [forn, setForn]  = useState('');
    
    // Paid payments
    const [prov, setProv]  = useState(provenience[0].name);
    const [isExpense, setExpense] = useState(true);
    const [category, setCategory]  = useState(lang.select);
    const [subCategory, setSubCategory]  = useState(lang.select);

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
                expense: isExpense,
                prov: prov,
                category: category === lang.select ? "" : category,
                subCategory: subCategory === lang.select ? "" : subCategory,
                forn: forn,
                desc: desc,
                amount: amount.replace(/,/g, '.'),
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
        setCategory(lang.select);
        setSubCategory(lang.select);
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
                <C.InputContent>
                    <C.Label>{lang.category}</C.Label>
                    <C.Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        style={category === lang.select ? {color: 'gray'} : {color: 'black'}}
                    >
                        <option defaultValue disabled hidden>{lang.select}</option>
                        {categories.map(element => <option style={{color: 'black'}} key={element.name} value={element.name}>{element.name}</option>)}
                    </C.Select>
                </C.InputContent>
                <C.InputContent>
                    <C.Label>{lang.subCategory}</C.Label>
                    <C.Select
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        style={subCategory === lang.select ? {color: 'gray'} : {color: 'black'}}
                    >
                        <option defaultValue disabled hidden>{lang.select}</option>
                        {subCategories.map(element => <option style={{color: 'black'}} key={element.name} value={element.name}>{element.name}</option>)}
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