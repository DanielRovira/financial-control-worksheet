import React from 'react';
import * as C from './styles'
import * as D from '../Form/styles'
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaTrash, FaRegEdit } from 'react-icons/fa';

const GridItem = ({ item, onDelete, onEdit }) => {
    
    if (item.edit == true) {
        return (
            <C.Tr>
                <C.Td width={9}>{item.date.slice(-2)}-{item.date.slice(5,-3)}-{item.date.slice(0,-6)}</C.Td>
                <C.Td alignCenter>
                    {item.expense ? (
                        <FaRegArrowAltCircleDown color="red" />
                        ) : (
                            <FaRegArrowAltCircleUp color="green" />
                            )
                        }
                </C.Td>
                <C.Td>
                    <D.Input
                        value={item.prov}
                        placeholder="Inserir proveniência"
                    />
                </C.Td>
                <C.Td><D.Input value={item.forn} /></C.Td>
                <C.Td><D.Input value={item.desc} /></C.Td>
                <C.Td><D.Input value={Number(item.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} /></C.Td>
                <C.Td alignCenter>
                    <FaRegEdit onClick={() => onEdit(item.id)} />
                </C.Td>
                <C.Td alignCenter>
                    <FaTrash onClick={() => onDelete(item.id)} />
                </C.Td>
            </C.Tr>
        )
    } else {
        return (
            <C.Tr>
                <C.Td width={9}>{item.date.slice(-2)}-{item.date.slice(5,-3)}-{item.date.slice(0,-6)}</C.Td>
                <C.Td alignCenter>
                    {item.expense ? (
                        <FaRegArrowAltCircleDown color="red" />
                        ) : (
                            <FaRegArrowAltCircleUp color="green" />
                            )
                        }
                </C.Td>
                <C.Td>{item.prov}</C.Td>
                <C.Td>{item.forn}</C.Td>
                <C.Td>{item.desc}</C.Td>
                <C.Td>{Number(item.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</C.Td>
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