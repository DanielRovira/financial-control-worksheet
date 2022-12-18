import React from 'react';
import GridItem from '../GridItem';
import * as C from './styles';
const lang = require(`../../../../Languages/${process.env.REACT_APP_LANG}.json`);

const Grid = ({ rawData, deleteDocument, updateDocument, categories }) => {
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
                    <C.Th width={9}>{lang.date}</C.Th>
                    <C.Th width={15} alignCenter>{lang.type}</C.Th>
                    <C.Th width={15}>{lang.source}</C.Th>
                    <C.Th width={15}>{lang.supplier}</C.Th>
                    <C.Th width={15}>{lang.description}</C.Th>
                    <C.Th width={15}>{lang.value}</C.Th>
                    <C.Th width={5} alignCenter>{lang.edit}</C.Th>
                    <C.Th width={1} alignCenter>{lang.delete}</C.Th>
                </C.Tr>
            </C.Thead>
            <C.Tbody>
                {Array.from(itens)?.map((item, index) => (
                    <GridItem key={item._id} item={item} onDelete={deleteDocument} updateDocument={updateDocument} categories={categories}  />
                ))}
            </C.Tbody>
        </C.Table>
     );
};
 
export default Grid;