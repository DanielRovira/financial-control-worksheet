import React, { useState } from 'react';
import Grid from '../Grid';
import * as C from './styles';

const Form = ({ handleAdd, transactionsList, setTransactionsList }) => {
    const toDay = new Date().toISOString().substring(0, 10)
    const [date, setDate]  = useState(toDay);
    const [desc, setDesc]  = useState("");
    const [amount, setAmount] = useState("");
    const [isExpense, setExpense] = useState(true);

    const generateID = () => Math.round(Math.random() * 1000);

    const handleSave = () => {
        if (!desc || !amount || !date) {
            alert("Informe todos os campos!");
            return;
        }   else if (amount.replace(/,/g, '.') < 0.01) {
            alert("O valor tem que ser positivo");
            return;  
        }
        
        const transaction = {
            id: generateID(),
            date: date,
            desc: desc,
            amount: amount.replace(/,/g, '.'),
            expense: isExpense,
        };

        handleAdd(transaction);
        
        setDesc("");
        setAmount("");
    };

    return ( 
        <>
            <C.Container>
                <C.InputContent>
                    <C.Label>Data</C.Label>
                    <C.Input
                        value={date}
                        type="date"
                        onChange={(e) => setDate(e.target.value)} />
                </C.InputContent>
                <C.InputContent>
                    <C.Label>Descrição</C.Label>
                    <C.Input
                        value={desc}
                        placeholder="Inserir descrição"
                        onChange={(e) => setDesc(e.target.value)} />
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
                        // onChange={(e) => setAmount(e.target.value)}
                        />
                </C.InputContent>
                <C.RadioGroup>
                    <C.Input
                        type="radio"
                        id="rIncome"
                        name="group1"
                        onChange={() => setExpense(!isExpense)} />
                    <C.Label htmlFor="rIncome">Entrada</C.Label>
                    <C.Input
                        type="radio"
                        id="rExpense"
                        defaultChecked
                        name="group1"
                        onChange={() => setExpense(!isExpense)} />
                    <C.Label htmlFor="rExpense">Saída</C.Label>
                </C.RadioGroup>
                <C.Button onClick={handleSave}>ADICIONAR</C.Button>
            </C.Container>
            <Grid itens={transactionsList} setItens={setTransactionsList} />
        </>
     );
}
 
export default Form;