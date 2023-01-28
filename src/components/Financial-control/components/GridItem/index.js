import * as C from './styles'
import * as D from '../Form/styles'
import { useRef, useState, useEffect } from 'react';
import { Checkbox } from '@mui/material';
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaTrash, FaRegEdit, FaCheck } from 'react-icons/fa';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import {useClickAway} from 'react-use';
import { useParams } from 'react-router-dom';
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`);

const GridItem = ({ item, index, onDelete, updateDocument, sheetType, rawData, setUndoItem, checked, setChecked }) => {
    const params = useParams();
    const [isActive, setActive] = useState(false);
    const [dateTemp, setDateTemp] = useState(item.date)
    const [expenseTemp, setExpenseTemp] = useState(item.expense)
    const [sourceTemp, setSourceTemp] = useState(item.source)
    const [providerTemp, setProviderTemp] = useState(item.provider)
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
    const [deleteDelay, setDeleteDelay] = useState(false)

    const ref = useRef(null);
    const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];
    let sources = Array.from(categoriesList || []).filter(item => item.type === 'source').sort((a, b) => a.name.localeCompare(b.name))
    let categories = Array.from(categoriesList || []).filter(item => item.type === 'category').sort((a, b) => a.name.localeCompare(b.name))
    let subCategories = Array.from(categoriesList || []).filter(item => item.type === 'subCategory').sort((a, b) => a.name.localeCompare(b.name))

    const handleAmountType = (value) => {
        setAmountValue(value)
        if (value !== null) 
        {setAmountTemp(value.replace(/,/g, '.'))}
        else {setAmountTemp('0.00')}
    };

    const handleSelect = (event) => {
        checked.includes(item)
        ? setChecked(checked.filter(it => it !== item))
        : setChecked((prev) => [ ...prev, item])
      };

    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noreferrer');
    };

    const toggleEdit = (element) => {
        if (descTemp === '' || amountTemp === '' || dateTemp === '') {
            alert(lang.alert01);
            return;
        }   else if (amountTemp.toString().replace(/,/g, '.') < 0.01) {
            alert(lang.alert02);
            return;  
        }

        if (sheetType === 'financialControl') {
            if (
                dateTemp !== item.date||
                expenseTemp !== item.expense ||
                sourceTemp !== item.source ||
                categoryTemp !== item.category ||
                subCategoryTemp !== item.subCategory ||
                providerTemp !== item.provider ||
                descTemp !== item.desc ||
                Number(amountTemp) !== item.amount
                )   { updateDocument({ ...item,
                date: dateTemp,
                expense: expenseTemp,
                source: sourceTemp,
                category: categoryTemp === lang.other || "" ? otherCategoryTemp : categoryTemp,
                subCategory: subCategoryTemp === lang.other || "" ? otherSubCategoryTemp : subCategoryTemp,
                provider: providerTemp,
                desc: descTemp,
                amount: amountTemp });
                setUndoItem([item])
            }}

        if (sheetType === 'todoPayments') {
            if (
                dateTemp !== item.date||
                linkTemp !== item.link ||
                bankTemp !== item.bank ||
                idnumberTemp !== item.idnumber ||
                providerTemp !== item.provider ||
                descTemp !== item.desc ||
                Number(amountTemp) !== item.amount
                )   { updateDocument({ ...item, 
                date: dateTemp,
                link: linkTemp,
                bank: bankTemp,
                idnumber: idnumberTemp,
                provider: providerTemp,
                desc: descTemp,
                amount: amountTemp });
                setUndoItem([item])
        }}
        setCategoryTemp(otherCategoryTemp)
        setSubCategoryTemp(otherSubCategoryTemp)
        setActive(!isActive);

        !isActive && setTimeout(() => {  
            element.target.querySelector('input')?.focus()
        }, 5);

    };

    const setDefault = () => {
            setDateTemp(item.date)
            setExpenseTemp(item.expense)
            setSourceTemp(item.source)
            setProviderTemp(item.provider)
            setLinkTemp(item.link)
            setBankTemp(item.bank)
            setCategoryTemp(item.category)
            setSubCategoryTemp(item.subCategory)
            setOtherCategoryTemp(categoryTemp)
            setOtherSubCategoryTemp(subCategoryTemp)
            setIdnumberTemp(item.idnumber)
            setDescTemp(item.desc)
            setAmountTemp(item.amount)
            setAmountValue(item.amount)
            setDeleteDelay(false)
    }

    useEffect(() => {
        setTimeout(setDefault, 5)
    }, [rawData]) // eslint-disable-line react-hooks/exhaustive-deps

    useClickAway(ref, toggleEdit)

    if (deleteDelay) {return (<></>)}
    if (isActive === true && params.taskTitle !== 'TRASH') {
        return (
            <C.Tr ref={ref} style={{backgroundColor: 'var(--color1)'}}>
                <C.Td alignCenter><Checkbox checked={checked.includes(item._id) || checked.includes('all')} disabled /></C.Td>
                <C.Td alignCenter><C.TdCont>
                    <D.Input
                        style={{textAlign: 'center', padding: '1px 0 0 3.5px', height: '25px'}}
                        value={dateTemp}
                        type='date'
                        // width={110}
                        onChange={(e) => setDateTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                    />
                </C.TdCont></C.Td>
                {sheetType === 'financialControl' && 
                <>
                <C.Td alignCenter><C.TdCont>
                    <D.Select
                        style={{textAlign: 'center'}}
                        value={expenseTemp ? lang.expense : lang.entry}
                        onChange={() => setExpenseTemp(!expenseTemp)}
                    >
                        <option value={lang.entry}>{lang.entry}</option>
                        <option value={lang.expense}>{lang.expense}</option>
                    </D.Select>
                </C.TdCont></C.Td>
                <C.Td><C.TdCont>
                    <D.Select
                        style={{textAlign: 'center'}}
                        value={sourceTemp}
                        onChange={(e) => setSourceTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                    >
                        {sources.map(element => <option key={element.name} value={element.name}>{element.name}</option>)}
                    </D.Select>
                </C.TdCont></C.Td>
                <C.Td><C.TdCont>
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
                        style={categoryTemp === '' ? {color: 'gray', textAlign: 'center'} : {color: 'black', textAlign: 'center'}}
                        width={110}
                    >
                        <option defaultValue disabled hidden>{lang.select}</option>
                        {!categories.some(cat => cat.name === categoryTemp) && <option disabled hidden>{categoryTemp}</option>}
                        {categories.map(element => <option style={{color: 'black'}} key={element.name} value={element.name}>{element.name}</option>)}
                    </D.Select>
                    }
                </C.TdCont></C.Td>
                <C.Td><C.TdCont>
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
                        style={subCategoryTemp === '' ? {color: 'gray', textAlign: 'center'} : {color: 'black', textAlign: 'center'}}
                        width={110}
                    >
                        <option defaultValue disabled hidden>{lang.select}</option>
                        {!subCategories.some(cat => cat.name === subCategoryTemp) && <option disabled hidden>{subCategoryTemp}</option>}
                        {subCategories.map(element => <option style={{color: 'black'}} key={element.name} value={element.name}>{element.name}</option>)}
                    </D.Select>
                }
                </C.TdCont></C.Td>
                </>}
                {sheetType === 'todoPayments' && 
                <>
                <C.Td alignCenter><C.TdCont>{++index}</C.TdCont></C.Td>
                <C.Td><C.TdCont>
                    <D.Input
                        value={linkTemp}
                        placeholder={`${lang.placeholder} ${lang.link}`}
                        onChange={(e) => setLinkTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                        width={100}
                        lowercase
                    />
                </C.TdCont></C.Td>
                <C.Td><C.TdCont>
                    <D.Input
                        value={bankTemp}
                        placeholder={`${lang.placeholder} ${lang.bank}`}
                        onChange={(e) => setBankTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                        width={100}
                    />
                </C.TdCont></C.Td>
                <C.Td><C.TdCont>
                    <D.Input
                        value={idnumberTemp}
                        placeholder={`${lang.placeholder} ${lang.idnumber}`}
                        onChange={(e) => setIdnumberTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                        width={100}
                    />
                </C.TdCont></C.Td>
                </>}
                <C.Td><C.TdCont>
                    <D.Input
                        value={providerTemp}
                        placeholder={`${lang.placeholder} ${lang.provider}`}
                        onChange={(e) => setProviderTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                        width={100}
                    />
                </C.TdCont></C.Td>
                <C.Td><C.TdCont>
                    <D.Input
                        value={descTemp}
                        placeholder={`${lang.placeholder} ${lang.description}`}
                        onChange={(e) => setDescTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                        width={100}
                    />
                </C.TdCont></C.Td>
                <C.Td><C.TdCont>
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
                </C.TdCont></C.Td>
                <C.Td alignCenter className='nohover'><C.TdCont><FaCheck onClick={toggleEdit} style={{cursor: 'pointer', color: 'green'}}/></C.TdCont></C.Td>
                {/* <C.Td alignCenter className='nohover'><C.TdCont><FaTrash color='#BA0000' onClick={() => {onDelete(item); setDeleteDelay(true); setUndoItem(item); setActive(!isActive)}} style={{cursor: 'pointer'}}/></C.TdCont></C.Td> */}
            </C.Tr>
    )}
    else {
        return (
            <C.Tr>
                <C.Td className='checkboxContainer' alignCenter><Checkbox checked={checked.includes(item)} onChange={handleSelect} /></C.Td>
                <C.Td onDoubleClick={toggleEdit}><C.TdCont style={{ letterSpacing: '.6px' }}>{dateTemp.slice(-2)}/{dateTemp.slice(5,-3)}/{dateTemp.slice(0,-6)}</C.TdCont></C.Td>
                {sheetType === 'financialControl' && <>
                <C.Td onDoubleClick={toggleEdit} alignCenter><C.TdCont>{expenseTemp ? (<FaRegArrowAltCircleDown style={{transform: 'scale(1)'}} color='red' />) : (<FaRegArrowAltCircleUp style={{transform: 'scale(1)'}} color='green' />)}</C.TdCont></C.Td>
                <C.Td onDoubleClick={toggleEdit} alignCenter><C.TdCont style={{ marginLeft: '-13.5px'}}>{sourceTemp}</C.TdCont></C.Td>
                <C.Td onDoubleClick={toggleEdit} alignCenter><C.TdCont style={{ marginLeft: '-13.5px'}}>{categoryTemp}</C.TdCont></C.Td>
                <C.Td onDoubleClick={toggleEdit} alignCenter><C.TdCont style={{ marginLeft: '-13.5px'}}>{subCategoryTemp}</C.TdCont></C.Td>
                </>}
                {sheetType === 'todoPayments' && <>
                <C.Td onDoubleClick={toggleEdit} alignCenter><C.TdCont>{++index}</C.TdCont></C.Td>
                <C.Td onDoubleClick={toggleEdit} alignCenter>
                    <C.TdCont style={{height: '20px'}}>{linkTemp && <CloudDownloadIcon onClick={() => openInNewTab(linkTemp)} htmlColor='var(--navbar-color)' style={{position: 'relative', width: '50px', height: '30px', marginTop: '-5px', marginLeft: '-5px'}} />}</C.TdCont>
                </C.Td>
                <C.Td onDoubleClick={toggleEdit}><C.TdCont>{bankTemp}</C.TdCont></C.Td>
                <C.Td onDoubleClick={toggleEdit}><C.TdCont>{idnumberTemp}</C.TdCont></C.Td>
                </>}
                <C.Td onDoubleClick={toggleEdit}><C.TdCont>{providerTemp}</C.TdCont></C.Td>
                <C.Td onDoubleClick={toggleEdit}><C.TdCont>{descTemp}</C.TdCont></C.Td>
                <C.Td onDoubleClick={toggleEdit}><C.TdCont>{Number(amountTemp).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</C.TdCont></C.Td>
                {params.taskTitle !== 'TRASH' && <>
                <C.Td alignCenter className='nohover'><C.TdCont><FaRegEdit onClick={toggleEdit} style={{cursor: 'pointer'}} /></C.TdCont></C.Td>
                {/* <C.Td alignCenter className='nohover'><C.TdCont><FaTrash color='grey' style={{cursor: 'not-allowed', transform: 'scale(1)'}} /></C.TdCont></C.Td> */}
                </>}
                {params.taskTitle === 'TRASH' && <C.Td onDoubleClick={toggleEdit} alignCenter><C.TdCont>{item.costCenter}</C.TdCont></C.Td>}
            </C.Tr>
        )}
};

export default GridItem;