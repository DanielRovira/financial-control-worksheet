import './index.css'
import * as C from './styles';
import { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button } from '@mui/material';
import CurrencyInput from 'react-currency-input-field'
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`);

const Form = ({ insertDocument, sheetType, categoriesList }) => {
    const toDay = new Date().toISOString().substring(0, 10)
    // const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];
    let sources = Array.from(categoriesList || []).filter(item => item.type === 'source').sort((a, b) => a.name.localeCompare(b.name))
    let categories = Array.from(categoriesList || []).filter(item => item.type === 'category').sort((a, b) => a.name.localeCompare(b.name))
    let subCategories = Array.from(categoriesList || []).filter(item => item.type === 'subCategory').sort((a, b) => a.name.localeCompare(b.name))

    // Both
    const [date, setDate]  = useState(toDay);
    const [desc, setDesc]  = useState('');
    const [amount, setAmount] = useState('');
    const [provider, setProvider]  = useState('');
    
    // Paid payments
    const [source, setSource]  = useState('');
    const [isExpense, setExpense] = useState(null);
    const [category, setCategory]  = useState('');
    const [subCategory, setSubCategory]  = useState('');
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
                expense: isExpense === null ? true : isExpense,
                source: source ? source : sources[0]?.name,
             // category: category === lang.select ? "" : otherCategory !== '' ? otherCategory : category ,
                category: category === '' ? '' : otherCategory !== '' ? otherCategory : category ,
                subCategory: subCategory === '' ? '' : otherSubCategory !== '' ? otherSubCategory : subCategory,
                provider: provider,
                desc: desc,
                amount: amount.replace(/,/g, '.'),
            },
            todoPayments: {
                date: date,
                link: link,
                bank: bank,
                idnumber: idnumber,
                provider: provider,
                desc: desc,
                amount: amount.replace(/,/g, '.'),
            }
        }

        insertDocument(transaction[sheetType]);
        
        setDesc('');
        setAmount('');
        setProvider('');
        setLink('');
        setBank('');
        setIdnumber('');
        setOtherCategory('');
        setOtherSubCategory('');
        setCategory('');
        setSubCategory('');
    };

    return ( 
        <C.Form>
            <C.Container>
                <C.InputContent>
                    {/* <C.Label>{lang.date}</C.Label> */}
                    <TextField
                        value={date}
                        type='date'
                        width={110}
                        onChange={(e) => setDate(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        size="small"
                        label={lang.date}
                        />
                </C.InputContent>
                {sheetType === 'financialControl' && 
                <>
                <C.InputContent>
                    {/* <C.Label>{lang.type}</C.Label> */}
                    <FormControl>
                        <InputLabel size="small" >{lang.type}</InputLabel>
                        <Select
                            defaultValue={""}
                            onChange={(e) => setExpense(e.target.value)}
                            size="small"
                            label={lang.type}
                            MenuProps={{disableScrollLock: true,}}
                        >
                            <MenuItem value={true}>{lang.expense}</MenuItem>
                            <MenuItem value={false}>{lang.entry}</MenuItem>
                        </Select>
                        {isExpense === null && <FormHelperText className='not-selectable' sx={{position: 'absolute', top: '35px', textAlign: 'center', width: '80%'}}>{lang.expense}</FormHelperText>}
                    </FormControl>
                </C.InputContent>
                <C.InputContent>
                    {/* <C.Label>{lang.source}</C.Label> */}
                    <FormControl>
                        <InputLabel size="small" >{lang.source}</InputLabel>
                        <Select
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                            size="small"
                            label={lang.source}
                            MenuProps={{disableScrollLock: true,}}
                        >
                            {sources.map(element => <MenuItem key={element.name} value={element.name}>{element.name}</MenuItem>)}
                    </Select>
                    {!source && <FormHelperText className='not-selectable' sx={{position: 'absolute', top: '35px', textAlign: 'center', width: '80%'}}>{sources[0]?.name}</FormHelperText>}
                    </FormControl>
                </C.InputContent>
                <C.InputContent>
                    {/* <C.Label>{lang.category}</C.Label> */}
                    {category === lang.other ? 
                    <TextField
                        focused 
                        autoFocus
                        onBlur={() => otherCategory === '' && setCategory('')}
                        value={otherCategory}
                        onChange={(e) => setOtherCategory(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        label={lang.category}
                        size="small"
                    />
                    :
                    <FormControl>
                        <InputLabel size="small" >{lang.category}</InputLabel>
                        <Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                            size="small"
                            label={lang.category}
                            MenuProps={{disableScrollLock: true,}}
                        >
                            {categories.map(element => <MenuItem key={element.name} value={element.name}>{element.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                }
                </C.InputContent>
                <C.InputContent>
                    {/* <C.Label>{lang.subCategory}</C.Label> */}
                    {subCategory === lang.other ? 
                    <TextField
                        focused
                        autoFocus
                        onBlur={() => otherSubCategory === '' && setSubCategory('')}
                        value={otherSubCategory}
                        onChange={(e) => setOtherSubCategory(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        label={lang.subCategory}
                        size="small"
                    />
                    :
                    <FormControl>
                        <InputLabel size="small" >{lang.subCategory}</InputLabel>
                        <Select
                            value={subCategory}
                            onChange={(e) => setSubCategory(e.target.value)}
                            onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                            size="small"
                            label={lang.subCategory}
                            MenuProps={{disableScrollLock: true,}}
>
                            {subCategories.map(element => <MenuItem key={element.name} value={element.name}>{element.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    }
                </C.InputContent>
                </>}
                {sheetType === 'todoPayments' && 
                <>
                <C.InputContent>
                    {/* <C.Label>{lang.link}</C.Label> */}
                    <TextField
                        value={link}
                        label={lang.link}
                        onChange={(e) => setLink(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        size="small"
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
                        />
                </C.InputContent>
                </>}
                <C.InputContent>
                    {/* <C.Label>{lang.provider}</C.Label> */}
                    <TextField
                        value={provider}
                        label={`${lang.provider}`}
                        onChange={(e) => setProvider(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {handleSave()}}}
                        size="small"
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
                <Button onClick={handleSave} variant='contained' >{lang.add}</Button>
            </C.Container>

        </C.Form>
     );
}
 
export default Form;