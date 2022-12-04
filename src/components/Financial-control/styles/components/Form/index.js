import React, { useState } from 'react';
import * as C from './styles';
import data from '../../../../../config.json'

const Form = ({ insertDocument }) => {
    const toDay = new Date().toISOString().substring(0, 10)
    const [date, setDate]  = useState(toDay);
    const [desc, setDesc]  = useState("");
    const [prov, setProv]  = useState("3R");
    const [forn, setForn]  = useState("");
    const [amount, setAmount] = useState("");
    const [isExpense, setExpense] = useState(true);

    const handleSave = () => {
        if (!desc || !amount || !date) {
            alert("Informe todos os campos!");
            return;
        }   else if (amount.replace(/,/g, '.') < 0.01) {
            alert("O valor tem que ser positivo");
            return;  
        }
        
        const transaction = {
            date: date,
            desc: desc,
            amount: amount.replace(/,/g, '.'),
            expense: isExpense,
            prov: prov,
            forn: forn,
        };

        insertDocument(transaction);
        
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
                <C.InputContent>
                    <C.Label>Tipo</C.Label>
                    <C.Select
                        onChange={() => setExpense(!isExpense)}
                    >
                        <option value="Saída">Saída</option>
                        <option value="Entrada">Entrada</option>
                    </C.Select>
                </C.InputContent>
                <C.InputContent>
                    <C.Label>Proveniência</C.Label>
                    <C.Select
                        value={prov}
                        onChange={(e) => setProv(e.target.value)}
                        onKeyDown={event => { if (event.key === "Enter") {handleSave()}}}
                    >
                        {Object.keys(data.provenience).map(element => <option key={element} value={element}>{element}</option>)}
                    </C.Select>
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
                        onValueChange={(e) => {setAmount(e)}}
                        onKeyDown={event => { if (event.key === "Enter") {handleSave()}}}
                        />
                </C.InputContent>
                <C.Button onClick={handleSave}>ADICIONAR</C.Button>
            </C.Container>

        </>
     );
}
 
export default Form;