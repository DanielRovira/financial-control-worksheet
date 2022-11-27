import React from 'react';
import GridItem from '../GridItem'
import * as C from './styles'

const Grid = ({ itens, setItens }) => {
    const onDelete = (ID) => {
        const newArray = itens.filter((transaction) => transaction.id !== ID);
        setItens(newArray);
        localStorage.setItem("transactions", JSON.stringify(newArray));
    };

    const onEdit = (ID) => {
        const newArray = itens.map(item => {
            if (item.id === ID) return { ...item, edit: !item.edit };

            return item;
        })
        setItens(newArray);
        localStorage.setItem("transactions", JSON.stringify(newArray));
    };

    const provEdit = (ID, provEdit) => {
        const newArray = itens.map(item => {
            if (item.id === ID) return { ...item, prov:provEdit };

            return item;
        })
        setItens(newArray);
        localStorage.setItem("transactions", JSON.stringify(newArray));
    };
    
    const fornEdit = (ID, fornEdit) => {
        const newArray = itens.map(item => {
            if (item.id === ID) return { ...item, forn:fornEdit };

            return item;
        })
        setItens(newArray);
        localStorage.setItem("transactions", JSON.stringify(newArray));
    };
    
    const descEdit = (ID, descEdit) => {
        const newArray = itens.map(item => {
            if (item.id === ID) return { ...item, desc:descEdit };

            return item;
        })
        setItens(newArray);
        localStorage.setItem("transactions", JSON.stringify(newArray));
    };

    const amountEdit = (ID, amountEdit) => {
        const newArray = itens.map(item => {
            if (item.id === ID) return { ...item, amount:amountEdit };

            return item;
        })
        setItens(newArray);
        localStorage.setItem("transactions", JSON.stringify(newArray));
    };




    const expenseEdit = (ID, expenseEdit) => {
        const newArray = itens.map(item => {
            if (item.id === ID) return { ...item, expense:expenseEdit };

            return item;
        })
        setItens(newArray);
        localStorage.setItem("transactions", JSON.stringify(newArray));
    };

    const dateEdit = (ID, dateEdit) => {
        const newArray = itens.map(item => {
            if (item.id === ID) return { ...item, date:dateEdit };

            return item;
        })
        setItens(newArray);
        localStorage.setItem("transactions", JSON.stringify(newArray));
    };

    return ( 
        <C.Table>
            <C.Thead>
                <C.Tr>
                    <C.Th width={9}>Data</C.Th>
                    <C.Th width={12} alignCenter>Tipo</C.Th>
                    <C.Th width={18}>Proveniência</C.Th>
                    <C.Th width={18}>Fornecedor</C.Th>
                    <C.Th width={18}>Descrição</C.Th>
                    <C.Th width={15}>Valor</C.Th>
                    <C.Th width={5} alignCenter>Editar</C.Th>
                    <C.Th width={1} alignCenter>Deletar</C.Th>
                </C.Tr>
            </C.Thead>
            <C.Tbody>
                {itens?.map((item, index) => (
                    <GridItem key={index} item={item} onDelete={onDelete} onEdit={onEdit} provEdit={provEdit} fornEdit={fornEdit} descEdit={descEdit} amountEdit={amountEdit} expenseEdit={expenseEdit} dateEdit={dateEdit} />
                ))}
            </C.Tbody>
        </C.Table>
     );
};
 
export default Grid;