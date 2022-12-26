import React, { useRef, useState } from 'react';
import * as C from './styles'
import * as D from '../Form/styles'
import { FaTrash, FaRegEdit } from 'react-icons/fa';
import {useClickAway} from 'react-use';
const lang = require(`../../../../Languages/${process.env.REACT_APP_LANG}.json`);

const GridItem = ({ item, onDelete, updateDocument }) => {
    const [isActive, setActive] = useState(false);
    const [dateTemp, setDateTemp] = useState(item.date)
    const [numberTemp, setNumberTemp] = useState(item.number)
    const [linkTemp, setLinkTemp] = useState(item.link)
    const [bankTemp, setBankTemp] = useState(item.bank)
    const [idnumberTemp, setIdnumberTemp] = useState(item.idnumber)
    const [receiverTemp, setReceiverTemp] = useState(item.receiver)
    const [descTemp, setDescTemp] = useState(item.desc)
    const [amountTemp, setAmountTemp] = useState(item.amount)
    const [amountValue, setAmountValue] = useState(item.amount)
    const ref = useRef(null);

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

        updateDocument({ ...item, 
            date: dateTemp,
            number: numberTemp,
            link: linkTemp,
            bank: bankTemp,
            idnumber: idnumberTemp,
            receiver: receiverTemp,
            desc: descTemp,
            amount: amountTemp });

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
                <C.Td padding={8}>{item.number}</C.Td>
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
                        placeholder={`${lang.placeholder} ${lang.supplier}`}
                        onChange={(e) => setBankTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                    />
                </C.Td>
                <C.Td>
                    <D.Input
                        value={idnumberTemp}
                        placeholder={`${lang.placeholder} ${lang.supplier}`}
                        onChange={(e) => setIdnumberTemp(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') {toggleEdit()}}}
                    />
                </C.Td>
                <C.Td>
                    <D.Input
                        value={receiverTemp}
                        placeholder={`${lang.placeholder} ${lang.supplier}`}
                        onChange={(e) => setReceiverTemp(e.target.value)}
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
                    />
                </C.Td>
                <C.Td alignCenter><FaRegEdit onClick={toggleEdit} style={{cursor: 'pointer'}}/></C.Td>
                <C.Td alignCenter><FaTrash onClick={() => {onDelete(item); setActive(!isActive)}} style={{cursor: 'pointer'}}/></C.Td>
            </C.Tr>
    )}
    else {
        return (
            <C.Tr>
                <C.Td width={10} alignCenter>{item.date.slice(-2)}-{item.date.slice(5,-3)}-{item.date.slice(0,-6)}</C.Td>
                <C.Td padding={8}>{item.number}</C.Td>
                <C.Td padding={8} alignCenter>{item.link}</C.Td>
                <C.Td padding={8}>{item.bank}</C.Td>
                <C.Td padding={8}>{item.idnumber}</C.Td>
                <C.Td padding={8}>{item.receiver}</C.Td>
                <C.Td padding={8}>{item.desc}</C.Td>
                <C.Td padding={8}>{Number(item.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</C.Td>
                <C.Td alignCenter><FaRegEdit onClick={toggleEdit} style={{cursor: 'pointer'}} /></C.Td>
                <C.Td alignCenter><FaTrash color='grey' style={{cursor: 'not-allowed'}} /></C.Td>
            </C.Tr>
        )}
};

export default GridItem;