import React from 'react';
import GridItem from '../GridItem'
import * as C from './styles'


const Grid = ({ rawData, setItens }) => {

    const itens = Array.from(rawData)
    itens.sort(function(a, b) {
        var c = new Date(a.date);
        var d = new Date(b.date);
        return c-d;
    });

    const onDelete = (ID) => {
        const newArray = rawData.filter((transaction) => transaction.id !== ID);
        setItens(newArray);
        localStorage.setItem("transactions", JSON.stringify(newArray));
    };

    const propEdit = (ID, value, propr) => {
        const newArray = rawData.map(item => {
            if (item.id === ID && propr=="date") return { ...item, date: value };
            if (item.id === ID && propr=="prov") return { ...item, prov: value };
            if (item.id === ID && propr=="forn") return { ...item, forn: value };
            if (item.id === ID && propr=="amount" && value == null) return { ...item, amount: "" };
            if (item.id === ID && propr=="expense") return { ...item, expense: value };
            if (item.id === ID && propr=="edit") return { ...item, desc: value.descTemp, amount: value.amountTemp, date: value.dateTemp[1] };
            // if (item.id === ID && propr=="desc") return { ...item, desc: value };
            // if (item.id === ID && propr=="amount" && value != null) return { ...item, amount: value?.replace(/,/g, '.') };
            
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
                    <C.Th width={15} alignCenter>Tipo</C.Th>
                    <C.Th width={15}>Proveniência</C.Th>
                    <C.Th width={15}>Fornecedor</C.Th>
                    <C.Th width={15}>Descrição</C.Th>
                    <C.Th width={15}>Valor</C.Th>
                    <C.Th width={5} alignCenter>Editar</C.Th>
                    <C.Th width={1} alignCenter>Deletar</C.Th>
                </C.Tr>
            </C.Thead>
            <C.Tbody>
                {itens?.map((item, index) => (
                    <GridItem key={item.id} item={item} onDelete={onDelete} propEdit={propEdit} />
                ))}
            </C.Tbody>
        </C.Table>
     );
};
 
export default Grid;