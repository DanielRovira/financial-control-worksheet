import './index.css'
import React, { useState } from 'react';
import * as C from './styles';
import { TextField } from '@mui/material';
import CurrencyInput from 'react-currency-input-field'
const lang = require(`../../../../Languages/${process.env.REACT_APP_LANG}.json`);

const Form = ({ insertDocument, sheetType }) => {
    const toDay = new Date().toISOString().substring(0, 10)
    const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];
    let provenience = Array.from(categoriesList || []).filter(item => item.type === 'provenience').sort((a, b) => a.name.localeCompare(b.name))
    let categories = Array.from(categoriesList || []).filter(item => item.type === 'category').sort((a, b) => a.name.localeCompare(b.name))
    let subCategories = Array.from(categoriesList || []).filter(item => item.type === 'subCategory').sort((a, b) => a.name.localeCompare(b.name))
    let inputWidth = 150

    // Both
    const [date, setDate]  = useState(toDay);
    const [desc, setDesc]  = useState('');
    const [amount, setAmount] = useState('');
    const [forn, setForn]  = useState('');
    
    // Paid payments
    const [prov, setProv]  = useState(provenience[0]?.name);
    const [isExpense, setExpense] = useState(true);
    const [category, setCategory]  = useState(lang.select);
    const [subCategory, setSubCategory]  = useState(lang.select);
    const [otherCategory, setOtherCategory]  = useState('');
    const [otherSubCategory, setOtherSubCategory]  = useState('');

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
                category: category === lang.select ? "" : otherCategory !== '' ? otherCategory : category ,
                subCategory: subCategory === lang.select ? "" : otherSubCategory !== '' ? otherSubCategory : subCategory,
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

        insertDocument(transaction[sheetType]);
        
        setDesc('');
        setAmount('');
        setForn('');
        setLink('');
        setBank('');
        setIdnumber('');
        setOtherCategory('');
        setOtherSubCategory('');
        setCategory(lang.select);
        setSubCategory(lang.select);
    };

    return ( 
        <>
            <C.Container>
                <C.InputContent>
                    {/* <C.Label>{lang.date}</C.Label> */}
                    <C.Input
                        value={date}
                        type='date'
                        width={110}
                        onChange={(e) => setDate(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        />
                </C.InputContent>
                {sheetType === 'financialControl' && 
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
                    {category === lang.other ? 
                    <C.Input
                        autoFocus
                        onBlur={() => otherCategory === '' && setCategory(lang.select)}
                        value={otherCategory}
                        onChange={(e) => setOtherCategory(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        width={98}
                    />
                    :
                    <C.Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        style={category === lang.select ? {color: 'gray'} : {color: 'black'}}
                        width={110}
                    >
                        <option defaultValue disabled hidden>{lang.select}</option>
                        {categories.map(element => <option style={{color: 'black'}} key={element.name} value={element.name}>{element.name}</option>)}
                    </C.Select>

                }
                </C.InputContent>
                <C.InputContent>
                    <C.Label>{lang.subCategory}</C.Label>
                    {subCategory === lang.other ? 
                    <C.Input
                        autoFocus
                        onBlur={() => otherSubCategory === '' && setSubCategory(lang.select)}
                        value={otherSubCategory}
                        onChange={(e) => setOtherSubCategory(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        width={98}
                    />
                    :
                    <C.Select
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        style={subCategory === lang.select ? {color: 'gray'} : {color: 'black'}}
                        width={110}
                    >
                        <option defaultValue disabled hidden>{lang.select}</option>
                        {subCategories.map(element => <option style={{color: 'black'}} key={element.name} value={element.name}>{element.name}</option>)}
                    </C.Select>
                    }
                </C.InputContent>
                </>}
                {sheetType === 'todoPayments' && 
                <>
                <C.InputContent>
                    {/* <C.Label>{lang.link}</C.Label> */}
                    <TextField
                        value={link}
                        label={`${lang.link}`}
                        onChange={(e) => setLink(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        size="small"
                        sx={{ width: inputWidth }}
                    />
                </C.InputContent>
                <C.InputContent>
                    {/* <C.Label>{lang.bank}</C.Label> */}
                    <TextField
                        value={bank}
                        label={`${lang.bank}`}
                        onChange={(e) => setBank(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        size="small"
                        sx={{ width: inputWidth }}
                        />
                </C.InputContent>
                <C.InputContent>
                    {/* <C.Label>{lang.idnumber}</C.Label> */}
                    <TextField
                        value={idnumber}
                        label={`${lang.idnumber}`}
                        onChange={(e) => setIdnumber(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        size="small"
                        sx={{ width: inputWidth }}
                        />
                </C.InputContent>
                </>}
                <C.InputContent>
                    {/* <C.Label>{lang.supplier}</C.Label> */}
                    <TextField
                        value={forn}
                        label={`${lang.supplier}`}
                        onChange={(e) => setForn(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        size="small"
                        sx={{ width: inputWidth }}
                        />
                </C.InputContent>
                <C.InputContent>
                    {/* <C.Label>{lang.description}</C.Label> */}
                    <TextField
                        value={desc}
                        label={`${lang.description}`}
                        onChange={(e) => setDesc(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        size="small"
                        sx={{ width: inputWidth }}
                        />
                </C.InputContent>
                <C.InputContent className='input-contain'>
                    {/* <C.Label>{lang.value}</C.Label> */}
                    <CurrencyInput
                        className='input'
                        value={amount}
                        prefix={lang.valuePrefix}
                        allowDecimals
                        disableAbbreviations
                        decimalScale='2'
                        onValueChange={(e) => {setAmount(e)}}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        label={lang.value}
                        // placeholder={lang.valuePlaceholder}
                        />
                        <label className="placeholder-text">
                            <span className='text'>
                                {lang.value}
                            </span>
                        </label>
                </C.InputContent>
                <C.Button onClick={handleSave} style={{textTransform: 'uppercase'}} >{lang.add}</C.Button>
            </C.Container>

        </>
     );
}
 
export default Form;