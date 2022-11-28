import React from 'react';
import * as C from './styles'
import * as D from '../Form/styles'
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaTrash, FaRegEdit } from 'react-icons/fa';

const GridItem = ({ item, onDelete, onEdit, propEdit }) => {
    
    if (item.edit == true) {
        return (
            <C.Tr>
                <C.Td alignCenter width={9}>{item.date.slice(-2)}-{item.date.slice(5,-3)}-{item.date.slice(0,-6)}</C.Td>
                <C.Td alignCenter>
                    <D.Select
                        value={item.expense ? "Saída" : "Entrada"}
                        onChange={() => propEdit(item.id, !item.expense, "expense")}
                    >
                        <option value="Entrada">Entrada</option>
                        <option value="Saída">Saída</option>
                    </D.Select>
                </C.Td>
                <C.Td>
                    <D.Select
                        value={item.prov}
                        onChange={(e) => propEdit(item.id, e.target.value, "prov")}
                    >
                        <option value="3R">3R</option>
                        <option value="CONSTEM">CONSTEM</option>
                    </D.Select>
                </C.Td>
                <C.Td>
                    <D.Input
                        value={item.forn}
                        placeholder="Inserir fornecedor"
                        onChange={(e) => propEdit(item.id, e.target.value, "forn")}
                    />
                </C.Td>
                <C.Td>
                    <D.Input
                        value={item.desc}
                        placeholder="Inserir descrição"
                        onChange={(e) => propEdit(item.id, e.target.value, "desc")}
                    />
                </C.Td>
                <C.Td>
                    <D.Currency
                        value={item.amount}
                        prefix="R$ "
                        placeholder="R$ 0,00"
                        allowDecimals
                        disableAbbreviations
                        decimalScale="2"
                        onValueChange={(e) => {propEdit(item.id, e, "amount")}}
                    />
                </C.Td>
                <C.Td alignCenter>
                    <FaRegEdit onClick={() => onEdit(item.id)} />
                </C.Td>
                <C.Td alignCenter>
                    <FaTrash onClick={() => onDelete(item.id)} />
                </C.Td>
            </C.Tr>
        )
    } 
    
    else {

        return (
            <C.Tr>
                <C.Td alignCenter width={10}>{item.date.slice(-2)}-{item.date.slice(5,-3)}-{item.date.slice(0,-6)}</C.Td>
                <C.Td alignCenter>
                    {item.expense ? (
                        <FaRegArrowAltCircleDown color="red" />
                        ) : (
                            <FaRegArrowAltCircleUp color="green" />
                            )
                        }
                </C.Td>
                <C.Td padding={8}>{item.prov}</C.Td>
                <C.Td padding={8}>{item.forn}</C.Td>
                <C.Td padding={8}>{item.desc}</C.Td>
                <C.Td padding={8}>{Number(item.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</C.Td>
                <C.Td alignCenter>
                    <FaRegEdit onClick={() => onEdit(item.id)} />
                </C.Td>
                <C.Td alignCenter>
                    <FaTrash onClick={() => onDelete(item.id)} />
                </C.Td>
            </C.Tr>
        )}

};

export default GridItem;