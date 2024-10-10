import * as C from './styles'
import { useRef, useState, useEffect } from 'react';
import { Autocomplete, Checkbox, MenuItem, ToggleButton, TextField, Select } from '@mui/material';
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaRegEdit, FaCheck } from 'react-icons/fa';
import {CloudDownload as CloudDownloadIcon, UnfoldMore as UnfoldMoreIcon, UnfoldLess as UnfoldLessIcon } from '@mui/icons-material';
import {useClickAway} from 'react-use';
import { useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { languageAtom } from 'components/global';

const GridItem = ({ item, index, updateDocument, sheetType, rawData, setUndoItem, checked, setChecked, setOperationType, filter, handleOpenSnackbar, handleSelectMultiple, setCheckedIndex }) => {
    const language = useAtomValue(languageAtom);
    const lang = require(`components/Languages/${language}.json`);
    const params = useParams();
    const [isActive, setActive] = useState(false);
    const [expandRow, setExpandRow] = useState(false);
    const [dateTemp, setDateTemp] = useState(item.date)
    const [expenseTemp, setExpenseTemp] = useState(item.expense)
    const [sourceTemp, setSourceTemp] = useState(item.source)
    const [providerTemp, setProviderTemp] = useState(item.provider)
    const [linkTemp, setLinkTemp] = useState(item.link)
    const [bankTemp, setBankTemp] = useState(item.bank)
    const [categoryTemp, setCategoryTemp] = useState(item.category)
    const [subCategoryTemp, setSubCategoryTemp] = useState(item.subCategory)
    const [idnumberTemp, setIdnumberTemp] = useState(item.idnumber)
    const [descTemp, setDescTemp] = useState(item.desc)
    const [amountTemp, setAmountTemp] = useState(item.amount)
    const [deleteDelay, setDeleteDelay] = useState(false)
    const user = JSON.parse(localStorage.getItem("user")) || [];
    const ref = useRef(null);
    const sections = JSON.parse(localStorage.getItem("sections")) || [];
    const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];
    let sources = Array.from(categoriesList || []).filter(item => item.type === 'source').sort((a, b) => a.name.localeCompare(b.name))
    let categories = Array.from(categoriesList || []).filter(item => item.type === 'category').sort((a, b) => a.name.localeCompare(b.name))
    let subCategories = Array.from(categoriesList || []).filter(item => item.type === 'subCategory').sort((a, b) => a.name.localeCompare(b.name))
    let tempId = item._id ? item._id : Date.now()

    const handleAmountType = (value) => {
        // if (value === ',00') {setAmountTemp('0.00')}
        // else {setAmountTemp(value?.replace(/,/g, '.'))}
        setAmountTemp(value)
    };

    const handleSelect = (event) => {
        if (event.nativeEvent.shiftKey) {
            handleSelectMultiple(index)
            return
        }
        
        if (checked.includes(item)) {
            item._id && setChecked(checked.filter(it => it !== item));
            item._id && setCheckedIndex((prev) => prev.filter(it => it !== index));
        }
        
        else {
            item._id && setChecked((prev) => [...prev, item]);
            item._id && setCheckedIndex((prev) => [...prev, index] );
        }

      };

    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noreferrer');
    };

    const toggleEdit = (element) => {
        if (descTemp === '' || !amountTemp || dateTemp === '') {
            alert(lang.alert01);
            return;
        }   else if (amountTemp?.toString().replace(/,/g, '.') < 0.01) {
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
                Number(amountTemp?.toString().replace(/,/g, '.')) !== item.amount
                )   { updateDocument({ ...item,
                date: dateTemp,
                expense: expenseTemp,
                source: sourceTemp,
                category: categoryTemp,
                subCategory: subCategoryTemp,
                provider: providerTemp,
                desc: descTemp,
                amount: Number(amountTemp?.toString().replace(/,/g, '.')) }, true);
                setUndoItem([item])
                handleOpenSnackbar()
            }}

        if (sheetType === 'todoPayments') {
            if (
                dateTemp !== item.date||
                linkTemp !== item.link ||
                bankTemp !== item.bank ||
                idnumberTemp !== item.idnumber ||
                providerTemp !== item.provider ||
                descTemp !== item.desc ||
                Number(amountTemp?.toString().replace(/,/g, '.')) !== item.amount
                )   { updateDocument({ ...item, 
                date: dateTemp,
                link: linkTemp,
                bank: bankTemp,
                idnumber: idnumberTemp,
                provider: providerTemp,
                desc: descTemp,
                amount: Number(amountTemp?.toString().replace(/,/g, '.')) }, true);
                setUndoItem([item])
                handleOpenSnackbar()
        }}
        setOperationType('update')
        setChecked([])
        
        let parent = element.currentTarget
        !isActive && setTimeout(() => {  
            parent.querySelector('input')?.focus()
        }, 50);

        setTimeout(() => {  
            setActive(!isActive)
        }, 10);

    };

    const setDefault = () => {  //Altera os dados quando mudam (principalmente pra quando der Undo). Is active serve pra não alterar um dado que esta jendo alterado.
        if (!isActive) {
            setDateTemp(item.date)
            setExpenseTemp(item.expense)
            setSourceTemp(item.source)
            setProviderTemp(item.provider)
            setLinkTemp(item.link)
            setBankTemp(item.bank)
            setCategoryTemp(item.category)
            setSubCategoryTemp(item.subCategory)
            setIdnumberTemp(item.idnumber)
            setDescTemp(item.desc)
            setAmountTemp(item.amount)
            setDeleteDelay(false)}
    }

    useEffect(() => {
        setTimeout(setDefault, 5)
    }, [rawData]) // eslint-disable-line react-hooks/exhaustive-deps

    useClickAway(ref, toggleEdit)

    if (deleteDelay) {return (<></>)}
    if (isActive && params.taskTitle !== 'TRASH' && !filter && user.permissions[params.taskTitle][sheetType] === 'edit') {
        return (
            <C.Tr ref={ref} style={{backgroundColor: 'var(--color1)'}}>
                <C.Td alignCenter><Checkbox checked={checked.includes(item._id)} disabled /></C.Td>
                <C.Td alignCenter><C.TdCont>
                    <TextField
                        style={{textAlign: 'center', padding: '1px 0 0 3.5px'}}
                        value={dateTemp}
                        type='date'
                        onChange={(e) => setDateTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                    />
                </C.TdCont></C.Td>
                {sheetType === 'financialControl' && 
                <>
                <C.Td alignCenter><C.TdCont>
                    <Select
                        value={expenseTemp ? lang.expense : lang.entry}
                        onChange={() => setExpenseTemp(!expenseTemp)}
                        MenuProps={{disableScrollLock: true, disablePortal: true,}}
                    >
                        <MenuItem value={lang.entry}>{lang.entry}</MenuItem>
                        <MenuItem value={lang.expense}>{lang.expense}</MenuItem>
                    </Select>
                </C.TdCont></C.Td>
                <C.Td className='Hide' ><C.TdCont expandRow={expandRow}>
                    <Select
                        value={sourceTemp}
                        onChange={(e) => setSourceTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                        MenuProps={{disableScrollLock: true, disablePortal: true,}}
                    >
                        {sources.map(element => <MenuItem key={element.name} value={element.name}>{element.name}</MenuItem>)}
                    </Select>
                </C.TdCont></C.Td>
                <C.Td className='Hide' ><C.TdCont expandRow={expandRow}>
                    <Autocomplete 
                        freeSolo
                        openOnFocus
                        disablePortal
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                        options={categories.map((options) => options.name)}
                        inputValue={categoryTemp}
                        onInputChange={(event, newInputValue) => setCategoryTemp(newInputValue)}
                        renderInput={(params) => (
                            <TextField 
                            {...params}
                            placeholder={`${lang.category}`}
                            multiline={expandRow}
                            />)}
                    />
                </C.TdCont></C.Td>
                <C.Td className='Hide' ><C.TdCont>
                    <Autocomplete 
                            freeSolo
                            openOnFocus
                            disablePortal
                            onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                            options={subCategories.map((options) => options.name)}
                            inputValue={subCategoryTemp}
                            onInputChange={(event, newInputValue) => setSubCategoryTemp(newInputValue)}
                            renderInput={(params) => (
                                <TextField 
                                {...params}
                                placeholder={`${lang.subCategory}`}
                                multiline={expandRow}
                                />)}
                    />
                </C.TdCont></C.Td>
                </>}
                {sheetType === 'todoPayments' && 
                <>
                <C.Td alignCenter><C.TdCont>{++index}</C.TdCont></C.Td>
                <C.Td><C.TdCont>
                    <TextField
                        value={linkTemp}
                        placeholder={`${lang.placeholder} ${lang.link}`}
                        onChange={(e) => setLinkTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                        // lowercase
                    />
                </C.TdCont></C.Td>
                <C.Td className='Hide' ><C.TdCont expandRow={expandRow}>
                    <TextField
                        value={bankTemp}
                        placeholder={`${lang.bank}`}
                        onChange={(e) => setBankTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                        multiline={expandRow}
                    />
                </C.TdCont></C.Td>
                <C.Td className='Hide' ><C.TdCont expandRow={expandRow}>
                    <TextField
                        value={idnumberTemp}
                        placeholder={`${lang.placeholder} ${lang.idnumber}`}
                        onChange={(e) => setIdnumberTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                        multiline={expandRow}
                    />
                </C.TdCont></C.Td>
                </>}
                <C.Td className='Hide' ><C.TdCont expandRow={expandRow}>
                    <TextField
                        value={providerTemp}
                        placeholder={`${lang.placeholder} ${lang.provider}`}
                        onChange={(e) => setProviderTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                        multiline={expandRow}
                    />
                </C.TdCont></C.Td>
                <C.Td><C.TdCont expandRow={expandRow}>
                    <TextField
                        value={descTemp}
                        placeholder={`${lang.placeholder} ${lang.description}`}
                        onChange={(e) => setDescTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                        multiline={expandRow}
                    />
                </C.TdCont></C.Td>
                <C.Td><C.TdCont>
                    <C.Currency
                        value={amountTemp}
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
                <C.Td alignCenter className='nohover'>
                    <C.TdCont>
                        <ToggleButton onClick={() => setExpandRow(!expandRow)} value={expandRow} selected={expandRow} size='small' children={expandRow? <UnfoldLessIcon /> : <UnfoldMoreIcon />} />
                    </C.TdCont>
                </C.Td>
            </C.Tr>
    )}
    else {
        return (
            <C.Tr>
                <C.Td className='nohover' alignCenter><Checkbox checked={checked?.filter((it) => it._id === item._id)[0]?._id === tempId} onChange={handleSelect} /></C.Td>
                <C.Td onDoubleClick={toggleEdit} alignCenter><C.TdCont style={{ letterSpacing: '.6px' }}>{dateTemp.slice(-2)}/{dateTemp.slice(5,-3)}/{dateTemp.slice(0,-6)}</C.TdCont></C.Td>
                {sheetType === 'financialControl' && <>
                <C.Td onDoubleClick={toggleEdit} alignCenter><C.TdCont >{expenseTemp ? (<FaRegArrowAltCircleDown style={{transform: 'scale(1)'}} color='red' />) : (<FaRegArrowAltCircleUp style={{transform: 'scale(1)'}} color='green' />)}</C.TdCont></C.Td>
                <C.Td onDoubleClick={toggleEdit} className='Hide' ><C.TdCont style={{ marginLeft: '5px'}}>{sourceTemp}</C.TdCont></C.Td>
                <C.Td onDoubleClick={toggleEdit} className='Hide' ><C.TdCont expandRow={expandRow} style={{ marginLeft: '5px'}}>{categoryTemp}</C.TdCont></C.Td>
                <C.Td onDoubleClick={toggleEdit} className='Hide' ><C.TdCont expandRow={expandRow} style={{ marginLeft: '5px'}}>{subCategoryTemp}</C.TdCont></C.Td>
                </>}
                {sheetType === 'todoPayments' && <>
                <C.Td onDoubleClick={toggleEdit} alignCenter><C.TdCont >{++index}</C.TdCont></C.Td>
                <C.Td onDoubleClick={toggleEdit} alignCenter>
                    <C.TdCont style={{height: '20px'}}>{linkTemp && <CloudDownloadIcon onClick={() => openInNewTab(linkTemp)} htmlColor='var(--navbar-color)' style={{position: 'relative', width: '50px', height: '30px', marginTop: '-5px', marginLeft: '-5px'}} />}</C.TdCont>
                </C.Td>
                <C.Td onDoubleClick={toggleEdit} className='Hide' ><C.TdCont expandRow={expandRow}><p>{bankTemp}</p></C.TdCont></C.Td>
                <C.Td onDoubleClick={toggleEdit} className='Hide' ><C.TdCont expandRow={expandRow}><p>{idnumberTemp}</p></C.TdCont></C.Td>
                </>}
                <C.Td onDoubleClick={toggleEdit} className='Hide' ><C.TdCont expandRow={expandRow}><p>{providerTemp}</p></C.TdCont></C.Td>
                <C.Td onDoubleClick={toggleEdit}><C.TdCont expandRow={expandRow}><p>{descTemp}</p></C.TdCont></C.Td>
                <C.Td onDoubleClick={toggleEdit}><C.TdCont ><p>{Number(amountTemp?.toString().replace(/,/g, '.')).toLocaleString('pt-BR', { style: 'currency', currency: process.env.REACT_APP_CURRENCY })}</p></C.TdCont></C.Td>
                {params.taskTitle !== 'TRASH' && <>
                <C.Td alignCenter className='nohover Hide' ><C.TdCont><FaRegEdit onClick={toggleEdit} style={{cursor: 'pointer'}} /></C.TdCont></C.Td>
                <C.Td alignCenter className='nohover Hide' >
                    <C.TdCont>
                        <ToggleButton onClick={() => setExpandRow(!expandRow)} value={expandRow} selected={expandRow} size='small' children={expandRow? <UnfoldLessIcon /> : <UnfoldMoreIcon />} />
                    </C.TdCont>
                </C.Td>
                </>}
                {params.taskTitle === 'TRASH' && <C.Td onDoubleClick={toggleEdit} alignCenter><C.TdCont>{Array.from(sections).filter((section) => section.title === item.costCenter)[0]?.name}</C.TdCont></C.Td>}
            </C.Tr>
        )}
};

export default GridItem;