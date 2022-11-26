import React, { useState } from 'react';
import Grid from '../Grid';
import * as C from './styles';

const Form = ({ handleAdd, transactionsList, setTransactionsList }) => {
    const toDay = new Date().toISOString().substring(0, 10)
    const [date, setDate]  = useState(toDay);
    const [desc, setDesc]  = useState("");
    const [amount, setAmount] = useState("");
    const [isExpense, setExpense] = useState(false);

    const generateID = () => Math.round(Math.random() * 1000);

    const handleSave = () => {
        // if (!desc || !amount) {
        //     alert("Informe a descrição e o valor!");
        //     return;
        // }   else if (amount < 1) {
        //     alert("O valor tem que ser positivo");
        //     return;  
        // }
        
        const transaction = {
            id: generateID(),
            date: date,
            desc: desc,
            amount: amount,
            expense: isExpense,
        };

        handleAdd(transaction);
        
        // setDesc("");
        // setAmount("");
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
                        onChange={(e) => setDesc(e.target.value)} />
                </C.InputContent>
                <C.InputContent>
                    <C.Label>Valor</C.Label>
                    <C.Currency
                        prefix="R$ "
                        placeholder="R$ 0,00"
                        allowDecimals
                        disableAbbreviations
                        decimalScale="2"
                        onValueChange={(e) => setAmount(e)}
                        // onChange={(e) => setAmount(e.target.value.slice(3))}
                        />
                </C.InputContent>
                <C.RadioGroup>
                    <C.Input
                        type="radio"
                        id="rIncome"
                        defaultChecked
                        name="group1"
                        onChange={() => setExpense(!isExpense)} />
                    <C.Label htmlFor="rIncome">Entrada</C.Label>
                    <C.Input
                        type="radio"
                        id="rExpense"
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