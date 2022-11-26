import React from 'react';
import * as C from './styles'
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaTrash } from 'react-icons/fa';

const GridItem = ({ item, onDelete }) => {
    return (
        <C.Tr>
            <C.Td>{item.date.slice(-2)}-{item.date.slice(5,-3)}-{item.date.slice(0,-6)}</C.Td>
            <C.Td>{item.desc}</C.Td>
            <C.Td>R$ {item.amount}</C.Td>
            <C.Td alignCenter>
                {item.expense ? (
                    <FaRegArrowAltCircleDown color="red" />
                    ) : (
                    <FaRegArrowAltCircleUp color="green" />
                    )
                }
            </C.Td>
            <C.Td alignCenter>
                <FaTrash onClick={() => onDelete(item.id)} />
            </C.Td>
        </C.Tr>
    );
};

export default GridItem;