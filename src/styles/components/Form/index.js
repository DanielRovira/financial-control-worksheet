import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid'
import * as C from './styles';

const Form = ({ handleAdd }) => {
    const toDay = new Date().toISOString().substring(0, 10)
    const [date, setDate]  = useState(toDay);
    const [desc, setDesc]  = useState("");
    const [prov, setProv]  = useState("");
    const [forn, setForn]  = useState("");
    const [amount, setAmount] = useState("");
    const [isExpense, setExpense] = useState(true);

    // const generateID = () => Math.round(Math.random() * 1000);

    const handleSave = () => {
        if (!desc || !amount || !date) {
            alert("Informe todos os campos!");
            return;
        }   else if (amount.replace(/,/g, '.') < 0.01) {
            alert("O valor tem que ser positivo");
            return;  
        }
        
        const transaction = {
            // id: generateID(),
            id: uuidv4(),
            edit: false,
            date: date,
            desc: desc,
            amount: amount.replace(/,/g, '.'),
            expense: isExpense,
            prov: prov,
            forn: forn,
        };

        handleAdd(transaction);
        
        setProv("");
        setDesc("");
        setAmount("");
        setForn("");
    };

    return ( 
        <>
            <C.Container>
                <C.InputContent>
                    <C.Label>Data</C.Label>
                    <C.Input
                        value={date}
                        type="date"
                        width={110}
                        onChange={(e) => setDate(e.target.value)}
                        onKeyDown={event => { if (event.key === "Enter") {handleSave()}}}
                        />
                </C.InputContent>
                <C.RadioGroup>
                    <C.Label>Tipo</C.Label>
                    <C.RadioContent>
                        <C.Input
                            type="radio"
                            id="rIncome"
                            name="group1"
                            onChange={() => setExpense(!isExpense)} />
                        <C.Label htmlFor="rIncome">Entrada</C.Label>
                    </C.RadioContent>
                    <C.RadioContent>
                        <C.Input
                            type="radio"
                            id="rExpense"
                            defaultChecked
                            name="group1"
                            onChange={() => setExpense(!isExpense)} />
                        <C.Label htmlFor="rExpense">Saída</C.Label>
                    </C.RadioContent>
                </C.RadioGroup>
                <C.InputContent>
                    <C.Label>Proveniência</C.Label>
                    <C.Input
                        value={prov}
                        placeholder="Inserir proveniência"
                        onChange={(e) => setProv(e.target.value)}
                        onKeyDown={event => { if (event.key === "Enter") {handleSave()}}}
                        />
                </C.InputContent>
                <C.InputContent>
                    <C.Label>Fornecedor</C.Label>
                    <C.Input
                        value={forn}
                        placeholder="Inserir fornecedor"
                        onChange={(e) => setForn(e.target.value)}
                        onKeyDown={event => { if (event.key === "Enter") {handleSave()}}}
                        />
                </C.InputContent>
                <C.InputContent>
                    <C.Label>Descrição</C.Label>
                    <C.Input
                        value={desc}
                        placeholder="Inserir descrição"
                        onChange={(e) => setDesc(e.target.value)}
                        onKeyDown={event => { if (event.key === "Enter") {handleSave()}}}
                        />
                </C.InputContent>
                <C.InputContent>
                    <C.Label>Valor</C.Label>
                    <C.Currency
                        value={amount}
                        prefix="R$ "
                        placeholder="R$ 0,00"
                        allowDecimals
                        disableAbbreviations
                        decimalScale="2"
                        onValueChange={(e) => {setAmount(e); console.log(amount)}}
                        onKeyDown={event => { if (event.key === "Enter") {handleSave()}}}
                        // onChange={(e) => setAmount(e.target.value)}
                        />
                </C.InputContent>
                <C.Button onClick={handleSave}>ADICIONAR</C.Button>
            </C.Container>

        </>
     );
}
 
export default Form;