import React from 'react';
import GridItem from '../GridItem';
import * as C from './styles';
const lang = require(`../../../../Languages/${process.env.REACT_APP_LANG}.json`);

const Grid = ({ rawData, deleteDocument, updateDocument, sheetType }) => {
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
                    <C.Th alignCenter>{lang.date}</C.Th>
                    {sheetType === 'financialControl' && 
                    <>
                    <C.Th alignCenter>{lang.type}</C.Th>
                    <C.Th alignCenter>{lang.source}</C.Th>
                    <C.Th alignCenter>{lang.category}</C.Th>
                    <C.Th alignCenter>{lang.subCategory}</C.Th>
                    </>}
                    {sheetType === 'todoPayments' && 
                    <>
                    <C.Th width={5} alignCenter>{lang.number}</C.Th>
                    <C.Th width={10} alignCenter>{lang.link}</C.Th>
                    <C.Th width={10} >{lang.bank}</C.Th>
                    <C.Th width={10}>{lang.idnumber}</C.Th>
                    </>}
                    <C.Th alignCenter>{lang.supplier}</C.Th>
                    <C.Th width={150}>{lang.description}</C.Th>
                    <C.Th width={50}>{lang.value}</C.Th>
                    <C.Th alignCenter>{lang.edit}</C.Th>
                    <C.Th alignCenter>{lang.delete}</C.Th>
                </C.Tr>
            </C.Thead>
            <C.Tbody>
                {Array.from(itens)?.map((item, index) => (
                    <GridItem key={item._id} item={item} index={index} onDelete={deleteDocument} updateDocument={updateDocument} sheetType={sheetType} />
                ))}
            </C.Tbody>
        </C.Table>
     );
};
 
export default Grid;