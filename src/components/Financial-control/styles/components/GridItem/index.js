import React, { useRef, useState } from 'react';
import * as C from './styles'
import * as D from '../Form/styles'
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaTrash, FaRegEdit } from 'react-icons/fa';
import {useClickAway} from 'react-use';
const lang = require(`../../../../Languages/${process.env.REACT_APP_LANG}.json`);

const GridItem = ({ item, index, onDelete, updateDocument }) => {
    const [isActive, setActive] = useState(false);
    const [dateTemp, setDateTemp] = useState(item.date)
    const [expenseTemp, setExpenseTemp] = useState(item.expense)
    const [provTemp, setProvTemp] = useState(item.prov)
    const [fornTemp, setFornTemp] = useState(item.forn)
    const [linkTemp, setLinkTemp] = useState(item.link)
    const [bankTemp, setBankTemp] = useState(item.bank)
    const [categoryTemp, setCategoryTemp] = useState(item.category)
    const [subCategoryTemp, setSubCategoryTemp] = useState(item.subCategory)
    const [otherCategoryTemp, setOtherCategoryTemp] = useState(categoryTemp)
    const [otherSubCategoryTemp, setOtherSubCategoryTemp] = useState(subCategoryTemp)
    const [idnumberTemp, setIdnumberTemp] = useState(item.idnumber)
    const [descTemp, setDescTemp] = useState(item.desc)
    const [amountTemp, setAmountTemp] = useState(item.amount)
    const [amountValue, setAmountValue] = useState(item.amount)
    const ref = useRef(null);
    const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];
    let provenience = Array.from(categoriesList || []).filter(item => item.type === 'provenience').sort((a, b) => a.name.localeCompare(b.name))
    let categories = Array.from(categoriesList || []).filter(item => item.type === 'category').sort((a, b) => a.name.localeCompare(b.name))
    let subCategories = Array.from(categoriesList || []).filter(item => item.type === 'subCategory').sort((a, b) => a.name.localeCompare(b.name))

    const handleAmountType = (value) => {
        setAmountValue(value)
        if (value != null) 
        {setAmountTemp(value.replace(/,/g, '.'))}
        else {setAmountTemp('0.00')}
    };

    const toggleEdit = () => {
        if (descTemp === '' || amountTemp === '' || dateTemp === '') {
            alert(lang.alert01);
            return;
        }   else if (amountTemp.toString().replace(/,/g, '.') < 0.01) {
            alert(lang.alert02);
            return;  
        }

        if (localStorage.getItem('sheetType') === 'financialControl') {
            if (
                dateTemp !== item.date||
                expenseTemp !== item.expense ||
                provTemp !== item.prov ||
                categoryTemp !== item.category ||
                subCategoryTemp !== item.subCategory ||
                fornTemp !== item.forn ||
                descTemp !== item.desc ||
                amountTemp !== item.amount
                )   { updateDocument({ ...item,
                date: dateTemp,
                expense: expenseTemp,
                prov: provTemp,
                category: categoryTemp === lang.other || "" ? otherCategoryTemp : categoryTemp,
                subCategory: subCategoryTemp === lang.other || "" ? otherSubCategoryTemp : subCategoryTemp,
                forn: fornTemp,
                desc:descTemp,
                amount: amountTemp });
            }}

        if (localStorage.getItem('sheetType') === 'todoPayments') {
            if (
                dateTemp !== item.date||
                linkTemp !== item.link ||
                bankTemp !== item.bank ||
                idnumberTemp !== item.idnumber ||
                fornTemp !== item.forn ||
                descTemp !== item.desc ||
                amountTemp !== item.amount
                )   { updateDocument({ ...item, 
                date: dateTemp,
                link: linkTemp,
                bank: bankTemp,
                idnumber: idnumberTemp,
                forn: fornTemp,
                desc: descTemp,
                amount: amountTemp });
        }}
        setCategoryTemp(otherCategoryTemp)
        setSubCategoryTemp(otherSubCategoryTemp)
        console.log(categoryTemp)
        setActive(!isActive);
    };

    useClickAway(ref, toggleEdit)

    if (isActive === true) {
        return (
            <C.Tr ref={ref}>
                <C.Td alignCenter width={9}>
                    <D.Input
                            value={dateTemp}
                            type='date'
                            width={110}
                            onChange={(e) => setDateTemp(e.target.value)}
                            onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                            />
                </C.Td>
                {localStorage.getItem('sheetType') === 'financialControl' && 
                <>
                <C.Td alignCenter>
                    <D.Select
                        value={expenseTemp ? lang.expense : lang.entry}
                        onChange={() => setExpenseTemp(!expenseTemp)}
                    >
                        <option value={lang.entry}>{lang.entry}</option>
                        <option value={lang.expense}>{lang.expense}</option>
                    </D.Select>
                </C.Td>
                <C.Td>
                    <D.Select
                        value={provTemp}
                        onChange={(e) => setProvTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                    >
                        {provenience.map(element => <option key={element.name} value={element.name}>{element.name}</option>)}
                    </D.Select>
                </C.Td>
                <C.Td>
                    {categoryTemp === lang.other ?
                    <D.Input
                        autoFocus
                        value={otherCategoryTemp}
                        onChange={(e) => setOtherCategoryTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                        width={98}
                    />
                    :
                    <D.Select
                        value={categoryTemp === '' ? lang.select : categoryTemp}
                        onChange={(e) => {setCategoryTemp(e.target.value); e.target.value === lang.other ? categories.some(cat => cat.name === categoryTemp) ? setOtherCategoryTemp('') : setOtherCategoryTemp(categoryTemp) : setOtherCategoryTemp(e.target.value)}}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                        style={categoryTemp === '' ? {color: 'gray'} : {color: 'black'}}
                        width={110}
                    >
                        <option defaultValue disabled hidden>{lang.select}</option>
                        {!categories.some(cat => cat.name === categoryTemp) && <option disabled hidden>{categoryTemp}</option>}
                        {categories.map(element => <option style={{color: 'black'}} key={element.name} value={element.name}>{element.name}</option>)}
                    </D.Select>
                    }
                </C.Td>
                <C.Td>
                    {subCategoryTemp === lang.other ?
                    <D.Input
                        autoFocus
                        value={otherSubCategoryTemp}
                        onChange={(e) => setOtherSubCategoryTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                        width={98}
                    />
                    :
                    <D.Select
                        value={subCategoryTemp === '' ? lang.select : subCategoryTemp}
                        onChange={(e) => {setSubCategoryTemp(e.target.value); e.target.value === lang.other ? subCategories.some(cat => cat.name === subCategoryTemp) ? setOtherSubCategoryTemp('') : setOtherSubCategoryTemp(subCategoryTemp) : setOtherSubCategoryTemp(e.target.value)}}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                        style={subCategoryTemp === '' ? {color: 'gray'} : {color: 'black'}}
                        width={110}
                    >
                        <option defaultValue disabled hidden>{lang.select}</option>
                        {!subCategories.some(cat => cat.name === subCategoryTemp) && <option disabled hidden>{subCategoryTemp}</option>}
                        {subCategories.map(element => <option style={{color: 'black'}} key={element.name} value={element.name}>{element.name}</option>)}
                    </D.Select>
                }
                </C.Td>
                </>}
                {localStorage.getItem('sheetType') === 'todoPayments' && 
                <>
                <C.Td alignCenter padding={8}>{++index}</C.Td>
                <C.Td>
                    <D.Input
                        value={linkTemp}
                        placeholder={`${lang.placeholder} ${lang.link}`}
                        onChange={(e) => setLinkTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                    />
                </C.Td>
                <C.Td>
                    <D.Input
                        value={bankTemp}
                        placeholder={`${lang.placeholder} ${lang.bank}`}
                        onChange={(e) => setBankTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                    />
                </C.Td>
                <C.Td>
                    <D.Input
                        value={idnumberTemp}
                        placeholder={`${lang.placeholder} ${lang.idnumber}`}
                        onChange={(e) => setIdnumberTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                    />
                </C.Td>
                </>}
                <C.Td>
                    <D.Input
                        value={fornTemp}
                        placeholder={`${lang.placeholder} ${lang.supplier}`}
                        onChange={(e) => setFornTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                    />
                </C.Td>
                <C.Td>
                    <D.Input
                        value={descTemp}
                        placeholder={`${lang.placeholder} ${lang.description}`}
                        onChange={(e) => setDescTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                    />
                </C.Td>
                <C.Td>
                    <D.Currency
                        value={amountValue}
                        prefix={lang.valuePrefix}
                        placeholder={lang.valuePlaceholder}
                        allowDecimals
                        disableAbbreviations
                        decimalScale='2'
                        onValueChange={(e) => handleAmountType(e)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                        width={100}
                    />
                </C.Td>
                <C.Td alignCenter><FaRegEdit onClick={toggleEdit} style={{cursor: 'pointer'}}/></C.Td>
                <C.Td alignCenter><FaTrash onClick={() => {onDelete(item); setActive(!isActive)}} style={{cursor: 'pointer'}}/></C.Td>
            </C.Tr>
    )}
    else {
        return (
            <C.Tr>
                <C.Td alignCenter width={10}>{dateTemp.slice(-2)}-{dateTemp.slice(5,-3)}-{dateTemp.slice(0,-6)}</C.Td>
                {localStorage.getItem('sheetType') === 'financialControl' && <>
                <C.Td alignCenter>{expenseTemp ? (<FaRegArrowAltCircleDown color='red' />) : (<FaRegArrowAltCircleUp color='green' />)}</C.Td>
                <C.Td padding={8} alignCenter>{provTemp}</C.Td>
                <C.Td padding={8}>{categoryTemp}</C.Td>
                <C.Td padding={8}>{subCategoryTemp}</C.Td>
                </>}
                {localStorage.getItem('sheetType') === 'todoPayments' && <>
                <C.Td padding={8} alignCenter>{++index}</C.Td>
                <C.Td padding={8} alignCenter>{linkTemp}</C.Td>
                <C.Td padding={8}>{bankTemp}</C.Td>
                <C.Td padding={8}>{idnumberTemp}</C.Td>
                </>}
                <C.Td padding={8}>{fornTemp}</C.Td>
                <C.Td padding={8}>{descTemp}</C.Td>
                <C.Td padding={8}>{Number(amountTemp).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</C.Td>
                <C.Td alignCenter><FaRegEdit onClick={toggleEdit} style={{cursor: 'pointer'}} /></C.Td>
                <C.Td alignCenter><FaTrash color='grey' style={{cursor: 'not-allowed'}} /></C.Td>
            </C.Tr>
        )}
};

export default GridItem;