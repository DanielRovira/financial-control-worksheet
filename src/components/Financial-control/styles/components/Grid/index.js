import React from 'react';
import GridItem from '../GridItem'
import * as C from './styles'


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
                {Array.from(itens)?.map((item, index) => (
                    <GridItem key={item._id} item={item} onDelete={deleteDocument} updateDocument={updateDocument} />
                ))}
            </C.Tbody>
        </C.Table>
     );
};
 
export default Grid;