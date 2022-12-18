import React, { useRef, useState } from 'react';
import * as C from './styles'
import * as D from '../Form/styles'
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaTrash, FaRegEdit } from 'react-icons/fa';
import {useClickAway} from 'react-use';
const lang = require(`../../../../Languages/${process.env.REACT_APP_LANG}.json`);

const GridItem = ({ item, onDelete, updateDocument, categories }) => {
    const [isActive, setActive] = useState(false);
    const [dateTemp, setDateTemp] = useState(item.date)
    const [expenseTemp, setExpenseTemp] = useState(item.expense)
    const [provTemp, setProvTemp] = useState(item.prov)
    const [fornTemp, setFornTemp] = useState(item.forn)
    const [descTemp, setDescTemp] = useState(item.desc)
    const [amountTemp, setAmountTemp] = useState(item.amount)
    const [amountValue, setAmountValue] = useState(item.amount)
    const ref = useRef(null);
    let provenience = Array.from(categories || []).filter(item => item.type === "provenience")

    const handleAmountType = (value) => {
        setAmountValue(value)
        if (value != null) 
        {setAmountTemp(value.replace(/,/g, '.'))}
        else {setAmountTemp("0.00")}
    };

    const toggleEdit = () => {
        if (descTemp === "" || amountTemp === "" || dateTemp === "") {
            alert(lang.alert01);
            return;
        }   else if (amountTemp.toString().replace(/,/g, '.') < 0.01) {
            alert(lang.alert02);
            return;  
        }

        // if (
        //     dateTemp !== item.date||
        //     expenseTemp !== item.expense ||
        //     provTemp !== item.prov ||
        //     fornTemp !== item.forn ||
        //     descTemp !== item.desc ||
        //     amountTemp !== item.amount
        //     ) {
            updateDocument({ ...item, date: dateTemp, expense: expenseTemp, prov: provTemp, forn: fornTemp, desc:descTemp, amount: amountTemp });
            // }
        setActive(!isActive);
    };

    useClickAway(ref, toggleEdit)

    if (isActive === true) {
        return (
            <C.Tr ref={ref}>
                <C.Td alignCenter width={9}>
                    <D.Input
                            value={dateTemp}
                            type="date"
                            width={110}
                            onChange={(e) => setDateTemp(e.target.value)}
                            />
                </C.Td>
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
                    >
                        {provenience.map(element => <option key={element.name} value={element.name}>{element.name}</option>)}
                    </D.Select>
                </C.Td>
                <C.Td>
                    <D.Input
                        value={fornTemp}
                        placeholder={`${lang.placeholder} ${lang.supplier}`}
                        onChange={(e) => setFornTemp(e.target.value)}
                    />
                </C.Td>
                <C.Td>
                    <D.Input
                        value={descTemp}
                        placeholder={`${lang.placeholder} ${lang.description}`}
                        onChange={(e) => setDescTemp(e.target.value)}
                    />
                </C.Td>
                <C.Td>
                    <D.Currency
                        value={amountValue}
                        prefix={lang.valuePrefix}
                        placeholder={lang.valuePlaceholder}
                        allowDecimals
                        disableAbbreviations
                        decimalScale="2"
                        onValueChange={(e) => handleAmountType(e)}
                    />
                </C.Td>
                <C.Td alignCenter><FaRegEdit onClick={toggleEdit} style={{cursor: 'pointer'}}/></C.Td>
                <C.Td alignCenter><FaTrash onClick={() => {onDelete(item); setActive(!isActive)}} style={{cursor: 'pointer'}}/></C.Td>
            </C.Tr>
    )}
    else {
        return (
            <C.Tr>
                <C.Td alignCenter width={10}>{item.date.slice(-2)}-{item.date.slice(5,-3)}-{item.date.slice(0,-6)}</C.Td>
                <C.Td alignCenter>{item.expense ? (<FaRegArrowAltCircleDown color="red" />) : (<FaRegArrowAltCircleUp color="green" />)}</C.Td>
                <C.Td padding={8}>{item.prov}</C.Td>
                <C.Td padding={8}>{item.forn}</C.Td>
                <C.Td padding={8}>{item.desc}</C.Td>
                <C.Td padding={8}>{Number(item.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</C.Td>
                <C.Td alignCenter><FaRegEdit onClick={toggleEdit} style={{cursor: 'pointer'}} /></C.Td>
                <C.Td alignCenter><FaTrash color="grey" style={{cursor: 'not-allowed'}} /></C.Td>
            </C.Tr>
        )}
};

export default GridItem;