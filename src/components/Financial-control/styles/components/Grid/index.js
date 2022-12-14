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
        <C.TableContent>
        <C.Table>
            <C.Thead>
                <C.Tr>
                    <C.Th alignCenter width={120}><div style={{width: '100px'}}>{lang.date}</div></C.Th>
                    {sheetType === 'financialControl' && 
                    <>
                    <C.Th width={90} alignCenter>{lang.type}</C.Th>
                    <C.Th alignCenter><div style={{overflow: 'hidden'}}>{lang.source}</div></C.Th>
                    <C.Th width={120} alignCenter>{lang.category}</C.Th>
                    <C.Th >{lang.subCategory}</C.Th>
                    </>}
                    {sheetType === 'todoPayments' && 
                    <>
                    <C.Th width={100} alignCenter>{lang.number}</C.Th>
                    <C.Th width={100} alignCenter>{lang.link}</C.Th>
                    <C.Th width={140} >{lang.bank}</C.Th>
                    <C.Th width={140}>{lang.idnumber}</C.Th>
                    </>}
                    <C.Th width={200}>{lang.provider}</C.Th>
                    <C.Th width={250}>{lang.description}</C.Th>
                    <C.Th width={130}>{lang.value}</C.Th>
                    <C.Th width={50} alignCenter>{lang.edit}</C.Th>
                    <C.Th width={60} alignCenter>{lang.delete}</C.Th>
                </C.Tr>
            </C.Thead>
            <C.Tbody>
                {Array.from(itens)?.map((item, index) => (
                    <GridItem key={item._id} item={item} index={index} onDelete={deleteDocument} updateDocument={updateDocument} sheetType={sheetType} />
                ))}
            </C.Tbody>
        </C.Table>
        </C.TableContent>
     );
};
 
export default Grid;