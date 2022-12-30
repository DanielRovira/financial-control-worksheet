import React from 'react';
import GridItem from '../GridItem';
import * as C from './styles';
const lang = require(`../../../../Languages/${process.env.REACT_APP_LANG}.json`);

const Grid = ({ rawData, deleteDocument, updateDocument }) => {
    const itens = Array.from(rawData)
    itens.sort(function(a, b) {
        var c = new Date(a.date);
        var d = new Date(b.date);
        return c-d;
    });

    return ( 
        <C.Table>
            <C.Thead>
                <C.Tr>
                    <C.Th width={9} alignCenter>{lang.date}</C.Th>
                    {localStorage.getItem('sheetType') === 'financialControl' && 
                    <>
                    <C.Th width={5} alignCenter>{lang.type}</C.Th>
                    <C.Th width={10} alignCenter>{lang.source}</C.Th>
                    <C.Th width={10}>{lang.category}</C.Th>
                    <C.Th width={10}>{lang.subCategory}</C.Th>
                    </>}
                    {localStorage.getItem('sheetType') === 'todoPayments' && 
                    <>
                    <C.Th width={5} alignCenter>{lang.number}</C.Th>
                    <C.Th width={10} alignCenter>{lang.link}</C.Th>
                    <C.Th width={10} >{lang.bank}</C.Th>
                    <C.Th width={10}>{lang.idnumber}</C.Th>
                    </>}
                    <C.Th width={15}>{lang.supplier}</C.Th>
                    <C.Th width={10}>{lang.description}</C.Th>
                    <C.Th width={10}>{lang.value}</C.Th>
                    <C.Th width={5} alignCenter>{lang.edit}</C.Th>
                    <C.Th width={1} alignCenter>{lang.delete}</C.Th>
                </C.Tr>
            </C.Thead>
            <C.Tbody>
                {Array.from(itens)?.map((item, index) => (
                    <GridItem key={item._id} item={item} index={index} onDelete={deleteDocument} updateDocument={updateDocument} />
                ))}
            </C.Tbody>
        </C.Table>
     );
};
 
export default Grid;